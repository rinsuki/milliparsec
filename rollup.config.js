import ts from '@rollup/plugin-typescript'

const common = {
  output: [
    {
      dir: 'dist',
      format: 'esm',
    },
  ],
  plugins: [ts({ include: ['./src/**/*.ts'] })],
}

export default [
  {
    input: 'src/index.ts',
    ...common,
    external: ['querystring', 'http'],
  },
  {
    input: 'src/koa.ts',
    ...common,
    external: ['koa', 'querystring', 'http'],
  },
].map(config => ({
  ...config,
  output: [
    ...config.output,
    {
      file: config.input.replace('src/', 'dist/').replace('.ts', '.cjs'),
      format: 'cjs',
    },
  ],
}))
