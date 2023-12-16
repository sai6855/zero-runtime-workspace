import * as React from 'react';
import { styled } from '@mui/zero-runtime';
import Test from '../Test/Test';

const Test2Root = styled(Test)(({ theme }) => ({
  color: theme.vars.palette.primary.main,
}));

export default function Test2(props) {
  return <Test2Root {...props}>Test</Test2Root>;
}
