/* eslint-disable */
/* eslint-env node */
const { withZeroPlugin } = require('@mui/zero-next-plugin');
const {
  experimental_extendTheme: extendTheme,
} = require('@mui/material/styles');

const theme = extendTheme({ cssVarPrefix: 'app' });

const attribute = 'data-mui-color-scheme';
theme.getColorSchemeSelector = (targetColorScheme) => {
  return `[${attribute}="${targetColorScheme}"] &`;
};

/**
 * @typedef {import('@mui/zero-next-plugin').ZeroPluginConfig} ZeroPluginConfig
 */

/**
 * @type {ZeroPluginConfig}
 */
const zeroPluginOptions = {
  theme,
  cssVariablesPrefix: 'app',
  transformLibraries: ['local-ui-lib'],
  sourceMap: true,
  displayName: true,
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = withZeroPlugin(nextConfig, zeroPluginOptions);
