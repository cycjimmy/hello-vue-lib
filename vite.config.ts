import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig(({ mode }) => {
  // The Pages demo is a normal HTML build: it bundles Vue and emits index.html
  // at the artifact root, so `base: './'` keeps it working under a repository
  // subpath.
  const isDeployment = mode === 'deployment'

  return {
    base: isDeployment ? './' : '/',
    // Nothing is served from a public directory, and copying one into dist would
    // leak extra files into the published package.
    publicDir: false,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    plugins: [
      vue(),
      // Declarations are part of the library build only.
      ...(isDeployment
        ? []
        : [
            dts({
              tsconfigPath: fileURLToPath(new URL('./tsconfig.json', import.meta.url)),
              include: ['src'],
              // Tests are part of the type check, never of the published types.
              exclude: ['src/**/__tests__/**'],
              entryRoot: 'src',
              outDirs: 'dist',
              // Without bundling, `index.d.ts` keeps a `./components/HelloWorld.vue`
              // import that only bundler-style resolution can follow. Rolling the
              // declarations up leaves a single self-contained entry that NodeNext
              // consumers can resolve as well.
              bundleTypes: true,
            }),
          ]),
    ],
    build: isDeployment
      ? {
          outDir: '.publish',
          emptyOutDir: true,
          target: 'es2022',
        }
      : {
          target: 'es2022',
          // A single style sheet is shipped next to the entry and imported by
          // the consumer through the `./style.css` export.
          cssCodeSplit: false,
          lib: {
            entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
            formats: ['es'],
            fileName: () => 'index.js',
            cssFileName: 'index',
          },
          rollupOptions: {
            external: ['vue'],
          },
        },
  }
})
