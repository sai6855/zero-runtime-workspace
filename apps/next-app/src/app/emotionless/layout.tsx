import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import React from 'react';

export default function EmotionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouterCacheProvider>
      <CssVarsProvider>{children}</CssVarsProvider>
    </AppRouterCacheProvider>
  );
}
