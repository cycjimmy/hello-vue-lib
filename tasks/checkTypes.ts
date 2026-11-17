/* eslint no-console: 0 */
import { spawnSync } from 'node:child_process'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'

import fs from 'fs-extra'

const ROOT = process.cwd()
const RELEASE_DIR = path.resolve(ROOT, '.release')
// Kept outside the repository on purpose: inside it, Node's package
// self-reference would resolve the package name to the working tree and hide a
// broken publishable directory behind a valid local build. A per-run directory
// keeps two concurrent runs from deleting each other's workspace.
const WORK_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'hello-vue-lib-type-check-'))
const PACKAGE_NAME = '@cycjimmy/hello-vue-lib'

interface ReleasePackageJson {
  types?: string
  exports?: Record<string, string | Record<string, string>>
  peerDependencies?: Record<string, string>
}

function fail(message: string): never {
  console.error(`checkTypes failed: ${message}`)
  process.exit(1)
}

// 1. The publishable directory has to exist, and every entry the manifest
//    advertises has to point at a file that is actually shipped.
if (!fs.existsSync(path.resolve(RELEASE_DIR, 'package.json'))) {
  fail('the .release directory is missing, run `npm run package` first')
}

const pkg = fs.readJsonSync(path.resolve(RELEASE_DIR, 'package.json')) as ReleasePackageJson

// The declarations are produced against the Vue 3.5 type shape, so the shipped
// manifest has to constrain the Vue version a consumer installs.
if (!pkg.peerDependencies?.vue) {
  fail('the manifest does not declare the vue peer dependency the declarations rely on')
}

const targets = [
  pkg.types,
  ...Object.values(pkg.exports ?? {}),
]
  .flatMap(entry => (typeof entry === 'string'
    ? [entry]
    : Object.values(entry ?? {})))
  .filter(entry => typeof entry === 'string')

for (const target of targets) {
  if (!fs.existsSync(path.resolve(RELEASE_DIR, target))) {
    fail(`the manifest points at a file that is not shipped: ${target}`)
  }
}

// 2. The ESM-only promise is part of the contract checked here.
const distEntries = fs.readdirSync(path.resolve(RELEASE_DIR, 'dist'), { recursive: true }) as string[]
const legacyBundles = distEntries.filter(entry => /\.(?:cjs|umd\.js)$/.test(entry))

if (legacyBundles.length > 0) {
  fail(`CommonJS or UMD output is not expected in dist: ${legacyBundles.join(', ')}`)
}

// 3. Resolve the published declarations the way a NodeNext consumer would: the
//    bundled entry has to stand on its own, so `skipLibCheck` is off and only
//    this package is installed.
fs.ensureDirSync(path.resolve(WORK_DIR, 'node_modules', '@cycjimmy'))
fs.symlinkSync(
  RELEASE_DIR,
  path.resolve(WORK_DIR, 'node_modules', PACKAGE_NAME),
  process.platform === 'win32'
    ? 'junction'
    : 'dir',
)

// Declared as ESM on purpose: without it `index.ts` counts as a CommonJS
// module under NodeNext, and the check would exercise `require` resolution
// instead of the `import` entry that is actually shipped.
fs.outputJsonSync(path.resolve(WORK_DIR, 'package.json'), {
  private: true,
  type: 'module',
}, { spaces: 2 })

fs.outputJsonSync(path.resolve(WORK_DIR, 'tsconfig.json'), {
  compilerOptions: {
    target: 'ES2022',
    module: 'nodenext',
    moduleResolution: 'nodenext',
    strict: true,
    noEmit: true,
    skipLibCheck: false,
    types: [],
  },
  include: ['index.ts'],
}, { spaces: 2 })

fs.outputFileSync(path.resolve(WORK_DIR, 'index.ts'), `import HelloWorld, { HelloWorld as Named } from '${PACKAGE_NAME}'

type Props = InstanceType<typeof HelloWorld>['$props']

const ok: Props = { msg: 'hello' }
// @ts-expect-error \`msg\` is required by the public contract
const missing: Props = {}

export { missing, Named, ok }
`)

const tsc = path.resolve(ROOT, 'node_modules', 'typescript', 'bin', 'tsc')
const result = spawnSync(process.execPath, [
  tsc,
  '--project',
  path.resolve(WORK_DIR, 'tsconfig.json'),
], {
  cwd: WORK_DIR,
  stdio: 'inherit',
})

if (result.error) {
  fail(`could not run tsc: ${result.error.message}`)
}

if (result.status !== 0) {
  fail(`the published declarations do not resolve under a NodeNext ESM consumer (workspace kept at ${WORK_DIR})`)
}

fs.removeSync(WORK_DIR)
console.log('checkTypes success!')
