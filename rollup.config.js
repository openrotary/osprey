import { terser } from 'rollup-plugin-terser'
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'

export default [
  {
    input: 'src/index.ts',
    output: {
      format: 'cjs',
      file: 'dist/osprey.js',
      sourcemap: true,
      exports: 'default'
    },
    plugins: [esbuild({ target: 'esnext' }), terser()],
    external: ['lodash/fp', 'uid']
  },
  {
    input: 'src/index.ts',
    output: {
      format: 'es',
      file: 'dist/osprey.d.ts'
    },
    plugins: [dts()],
    external: ['lodash/fp', 'uid']
  }
]
