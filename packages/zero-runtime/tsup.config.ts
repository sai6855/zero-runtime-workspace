import { Options, defineConfig } from 'tsup';
import config from '../../tsup.config';

const processors = ['styled', 'sx', 'keyframes'];

const baseConfig = {
  ...(config as Options),
  tsconfig: './tsconfig.build.json',
};

export default defineConfig([
  {
    ...baseConfig,
    entry: ['./src/index.ts', './src/theme.ts'],
  },
  {
    ...baseConfig,
    entry: processors.map((fn) => `./src/processors/${fn}.ts`),
    outDir: 'processors',
  },
  {
    ...baseConfig,
    entry: ['./src/utils/index.ts', './src/utils/pre-linaria-plugin.ts'],
    outDir: 'utils',
  },
]);
