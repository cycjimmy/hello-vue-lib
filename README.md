# hello-vue-lib

[![NPM latest version][npm-latest-image]][npm-url]
[![NPM next version][npm-next-image]][npm-url]
[![NPM alpha version][npm-alpha-image]][npm-url]
[![NPM beta version][npm-beta-image]][npm-url]
[![NPM bundle size][npm-bundle-size-image]][npm-url]
[![npm download][download-image]][download-url]
[![jsdelivr][jsdelivr-image]][jsdelivr-url]
![Test CI status][workflows-badge-image]
[![Coverage status][coveralls-image]][coveralls-url]
[![libraries dependency status][libraries-status-image]][libraries-status-url]
[![libraries sourcerank][libraries-sourcerank-image]][libraries-sourcerank-url]
[![Release date][release-date-image]][release-url]
[![semantic-release][semantic-image]][semantic-url]
[![npm license][license-image]][download-url]

An ESM-only Vue 3 component library template with automatic test, release and
maintenance workflows. [Demo][github-pages-url]

## Requirements

- Node.js `^22.22.2 || ^24.15.0 || >=26.0.0` for development (the build scripts
  run through Node's native TypeScript stripping, and the lint/test toolchain
  needs the same range).
- An ESM environment. The package ships a single `import` entry: there is no
  CommonJS and no UMD bundle.
- Vue `^3.5.0` as a peer dependency. The generated declarations rely on the
  `DefineComponent` type shape introduced in Vue 3.5.

## Install

```bash
npm install @cycjimmy/hello-vue-lib
```

## Usage

The style sheet is a separate file, so it has to be imported explicitly:

```ts
import HelloWorld from '@cycjimmy/hello-vue-lib'
import '@cycjimmy/hello-vue-lib/style.css'
```

A named export is available as well:

```ts
import { HelloWorld } from '@cycjimmy/hello-vue-lib'
```

The component accepts one required prop, `msg: string`.

## Breaking changes in v2

- CommonJS and UMD bundles were removed. `exports` only exposes an `import`
  entry, and `main` / `module` point at the same ESM file.
- Styles are emitted to `dist/index.css` and must be imported through
  `@cycjimmy/hello-vue-lib/style.css`.
- Type declarations are generated into `dist/`; the hand-written
  `types/index.d.ts` placeholder was removed.
- `vue` is a peer dependency (`^3.5.0`) instead of a regular dependency, so the
  published manifest constrains the Vue version the declarations target.
- Node.js `^22.22.2 || ^24.15.0 || >=26.0.0` is required to build, test and lint.
- The toolchain moved to Vite 8, Vitest 5, TypeScript 6, ESLint 10 with
  `@antfu/eslint-config` (Prettier was removed) and stylelint for SCSS.

## Packages

- `dist/index.js`: ESM entry (`vue` stays external).
- `dist/index.css`: the component styles.
- `dist/index.d.ts`: the generated declarations.

## Development

```bash
npm install
npm run dev
```

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server for the demo. |
| `npm run build` | Build the ESM entry, the style sheet and the declarations. |
| `npm run build:deployment` | Build the demo into `.publish/` for GitHub Pages. |
| `npm test` | Run the unit tests once. |
| `npm run test:watch` | Run the unit tests in watch mode. |
| `npm run test:coverage` | Run the unit tests with coverage (lcov for Coveralls). |
| `npm run test:types` | Check that the packaged declarations resolve for a NodeNext ESM consumer (run it after `npm run package`). |
| `npm run type-check` | Type check the library, the demo and the build configs. |
| `npm run lint` | Lint JavaScript/TypeScript/Vue with ESLint. |
| `npm run lint:fix` | Lint and auto-fix with ESLint. |
| `npm run lint:style` | Lint the SCSS in `src/` with stylelint. |
| `npm run lint:style:fix` | Lint and auto-fix the SCSS with stylelint. |
| `npm run package` | Build and prepare the publishable `.release/` directory. |

## Release

Commits follow the [Conventional Commits](https://www.conventionalcommits.org/)
specification. Pushing to `main` makes semantic-release bump the version, update
[docs/CHANGELOG.md](docs/CHANGELOG.md), publish to npm through trusted publishing
(OIDC) and to the GitHub Package Registry, and push the `vN` branch.

Issues are triaged automatically: a report without enough information is
labelled `needs-info` and closed after 7 days without a reply, and issues without
activity are marked stale after half a year and closed two weeks later.

## License

[MIT](LICENSE)

<!-- Links: -->
[npm-latest-image]: https://img.shields.io/npm/v/@cycjimmy/hello-vue-lib/latest
[npm-next-image]: https://img.shields.io/npm/v/@cycjimmy/hello-vue-lib/next
[npm-alpha-image]: https://img.shields.io/npm/v/@cycjimmy/hello-vue-lib/alpha
[npm-beta-image]: https://img.shields.io/npm/v/@cycjimmy/hello-vue-lib/beta
[npm-url]: https://npmjs.org/package/@cycjimmy/hello-vue-lib
[npm-bundle-size-image]: https://img.shields.io/bundlephobia/min/@cycjimmy/hello-vue-lib

[download-image]: https://img.shields.io/npm/dt/@cycjimmy/hello-vue-lib
[download-url]: https://npmjs.org/package/@cycjimmy/hello-vue-lib

[jsdelivr-image]: https://img.shields.io/jsdelivr/npm/hy/@cycjimmy/hello-vue-lib
[jsdelivr-url]: https://www.jsdelivr.com/package/npm/@cycjimmy/hello-vue-lib

[workflows-badge-image]: https://github.com/cycjimmy/hello-vue-lib/workflows/Test%20CI/badge.svg

[coveralls-image]: https://coveralls.io/repos/github/cycjimmy/hello-vue-lib/badge.svg?branch=main
[coveralls-url]: https://coveralls.io/github/cycjimmy/hello-vue-lib?branch=main

[libraries-status-image]: https://img.shields.io/librariesio/release/npm/@cycjimmy/hello-vue-lib
[libraries-sourcerank-image]: https://img.shields.io/librariesio/sourcerank/npm/@cycjimmy/hello-vue-lib
[libraries-status-url]: https://libraries.io/github/cycjimmy/hello-vue-lib
[libraries-sourcerank-url]: https://libraries.io/npm/@cycjimmy%2Fhello-vue-lib

[release-date-image]: https://img.shields.io/github/release-date/cycjimmy/hello-vue-lib
[release-url]: https://github.com/cycjimmy/hello-vue-lib/releases

[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release

[license-image]: https://img.shields.io/npm/l/@cycjimmy/hello-vue-lib

[github-pages-url]: https://cycjimmy.github.io/hello-vue-lib/
