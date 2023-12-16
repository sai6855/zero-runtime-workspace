'use client';
import * as React from 'react';
import { getInitColorSchemeScript } from '@mui/material/styles';

export default function InitColorSchemeScript() {
  return <>{getInitColorSchemeScript({ defaultMode: 'system' })}</>;
}
