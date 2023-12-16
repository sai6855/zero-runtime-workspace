import * as React from 'react';
import { styled } from '@mui/zero-runtime';

const TestRoot = styled('div')(({ theme }) => ({
  color: theme.vars.palette.secondary.main,
}));

export default function Test(props) {
  return <TestRoot {...props}>Test</TestRoot>;
}
