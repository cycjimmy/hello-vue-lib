# [2.0.0](https://github.com/cycjimmy/hello-vue-lib/compare/v1.3.1...v2.0.0) (2026-11-17)


* feat!: rebuild the package as an ESM-only Vue component library ([9fce566](https://github.com/cycjimmy/hello-vue-lib/commit/9fce5663fd7b7e3c267ad65773bbe24e6cfc832a))


### BREAKING CHANGES

* the package no longer ships CommonJS or UMD bundles.
`exports` only exposes an `import` entry (`dist/index.js`), and `main` /
`module` point at the same ESM file.
* styles are emitted to `dist/index.css` and must be imported
explicitly: `import '@cycjimmy/hello-vue-lib/style.css'`.
* type declarations are generated into `dist/` (`types` now
points to `dist/index.d.ts`); the hand-written `types/index.d.ts` placeholder
is removed.
* `vue` is now a peer dependency (`^3.5.0`) instead of a
regular dependency, because the generated declarations rely on the
`DefineComponent` type shape introduced in Vue 3.5.
* Node.js `^22.22.2 || ^24.15.0 || >=26.0.0` is required to
build, test and lint the project, because the task scripts run through Node's
native TypeScript stripping and the lint/test toolchain needs the same range.
* tooling moved to Vite 8, Vitest 5, TypeScript 6, ESLint 10
with @antfu/eslint-config (Prettier removed) and stylelint for SCSS.

## [1.3.1](https://github.com/cycjimmy/hello-vue-lib/compare/v1.3.0...v1.3.1) (2026-01-06)


### Bug Fixes

* **ci:** use OIDC ([09f160b](https://github.com/cycjimmy/hello-vue-lib/commit/09f160bc1f9239adf57e5c48fed9aa1900a9a659))

# [1.3.0](https://github.com/cycjimmy/hello-vue-lib/compare/v1.2.0...v1.3.0) (2024-08-09)


### Features

* add types file ([1661f83](https://github.com/cycjimmy/hello-vue-lib/commit/1661f83e720f79727ac62b868a171293ee80c6e2))

# [1.2.0](https://github.com/cycjimmy/hello-vue-lib/compare/v1.1.0...v1.2.0) (2024-08-09)


### Features

* use ts ([0457def](https://github.com/cycjimmy/hello-vue-lib/commit/0457defe8a08fa9d034e3aaa1451902105f51cc3))

# [1.1.0](https://github.com/cycjimmy/hello-vue-lib/compare/v1.0.3...v1.1.0) (2024-08-09)


### Features

* for test ([bbed059](https://github.com/cycjimmy/hello-vue-lib/commit/bbed0594613a9563cc25b96f79189b31b408f86d))

## [1.0.3](https://github.com/cycjimmy/hello-vue-lib/compare/v1.0.2...v1.0.3) (2024-08-08)


### Bug Fixes

* for test ([5b5b6fd](https://github.com/cycjimmy/hello-vue-lib/commit/5b5b6fd2989116d741c58f1e4a8f346e7467b08d))

## [1.0.2](https://github.com/cycjimmy/hello-vue-lib/compare/v1.0.1...v1.0.2) (2024-08-08)


### Bug Fixes

* for test ([2a7b6c2](https://github.com/cycjimmy/hello-vue-lib/commit/2a7b6c27c8584d65d66702478e46a12f83f84c40))

## [1.0.1](https://github.com/cycjimmy/hello-vue-lib/compare/v1.0.0...v1.0.1) (2024-08-08)


### Bug Fixes

* for test ([10352b5](https://github.com/cycjimmy/hello-vue-lib/commit/10352b5b2243641881aab966c16bac3574154d1c))

# 1.0.0 (2024-08-08)


### Features

* init a new lib ([9ab31e4](https://github.com/cycjimmy/hello-vue-lib/commit/9ab31e4763f7d9b3dead84d461acf01a4304f7dd))
