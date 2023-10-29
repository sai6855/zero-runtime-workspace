import type { Plugin, PluginOption } from 'vite';
import {
  generateCss,
  preprocessor,
  type PluginCustomOptions,
} from '@mui/zero-runtime/utils';
import { transformAsync } from '@babel/core';
import baseZeroVitePlugin, { type VitePluginOptions } from './zero-vite-plugin';

export interface ZeroVitePluginOptions extends VitePluginOptions {
  /**
   * The theme object that you want to be passed to the `styled` function
   */
  theme: unknown;
  /**
   * Prefix string to use in the generated css variables.
   */
  cssVariablesPrefix?: string;
  /**
   * Whether the css variables for the default theme should target the :root selector or not.
   * @default true
   */
  injectDefaultThemeInRoot?: boolean;
}

type WrapperOptions = VitePluginOptions & PluginCustomOptions;

const wrapperPlugin = (options: WrapperOptions): Plugin => {
  return baseZeroVitePlugin({
    preprocessor,
    ...options,
  });
};

const VIRTUAL_CSS_FILE = `\0zero-runtime-styles.css`;

export function zeroVitePlugin(options: ZeroVitePluginOptions): PluginOption {
  const {
    cssVariablesPrefix = 'mui',
    injectDefaultThemeInRoot = true,
    theme,
    babelOptions = {},
    ...rest
  } = options ?? {};

  function injectMUITokensPlugin(): PluginOption {
    return {
      name: 'vite-mui-theme-injection-plugin',
      resolveId(source) {
        if (source === '@mui/zero-runtime/styles.css') {
          return VIRTUAL_CSS_FILE;
        }
        return null;
      },
      load(id) {
        if (id !== VIRTUAL_CSS_FILE) {
          return null;
        }
        return {
          code: generateCss(
            {
              cssVariablesPrefix,
              themeArgs: {
                theme,
              },
            },
            {
              defaultThemeKey: 'theme',
              injectInRoot: injectDefaultThemeInRoot,
            }
          ),
          map: null,
        };
      },
    };
  }
  const extensions = [
    '.ts',
    '.tsx',
    '.js',
    '.jsx',
    '.mts',
    '.mjs',
    '.cts',
    '.cjs',
    '.mtsx',
  ];

  function intermediateBabelPlugin(): PluginOption {
    return {
      name: 'vite-mui-zero-intermediate-plugin',
      async transform(code, id) {
        const [filename] = id.split('?');
        if (!extensions.some((ext) => filename.endsWith(ext))) {
          return null;
        }
        try {
          const result = await transformAsync(code, {
            filename,
            babelrc: false,
            configFile: false,
            plugins: [['@mui/zero-runtime/exports/sx-plugin']],
          });
          return {
            code: result?.code ?? code,
            map: result?.map,
          };
        } catch (ex) {
          console.error(ex);
        }
      },
    };
  }

  const zeroPlugin = wrapperPlugin({
    cssVariablesPrefix,
    themeArgs: {
      theme,
    },
    babelOptions: {
      ...babelOptions,
      plugins: [
        '@babel/plugin-syntax-typescript',
        ...(babelOptions.plugins ?? []),
      ],
    },
    ...rest,
  });

  return [injectMUITokensPlugin(), intermediateBabelPlugin(), zeroPlugin];
}