'use client';
import React from 'react';
import { Box, Button, OutlinedInput } from '@mui/material';
import ZeroButton from '@/components/Button';
import ZeroOutlinedInput from '@/components/OutlinedInput';
import { teal } from '@mui/material/colors';
import { DataGridPremium as DataGrid } from '@mui/x-data-grid-premium';
import { useDemoData } from '@mui/x-data-grid-generator';
import { SxProps, Theme } from '@mui/material';

class Cell extends React.Component<any, any> {
  render() {
    const Element = this.props.element;
    let props = {};
    if (Element === ZeroButton) {
      props = { color: 'secondary' };
    }
    if (Element === ZeroOutlinedInput) {
      props = { error: true };
    }
    if (
      Element === 'input' ||
      Element === OutlinedInput ||
      Element === ZeroOutlinedInput
    )
      return (
        <Element {...props} defaultValue={String(this.props.initialValue)} />
      );
    return <Element {...props} children={String(this.props.initialValue)} />;
  }
}

const sx: SxProps<Theme> = {
  height: 400,
  width: '100%',
  '&&& .updating': (theme) => ({
    background: teal[theme.palette.mode === 'dark' ? 900 : 100],
    transition: theme.transitions.create('background', {
      duration: theme.transitions.duration.standard,
    }),
  }),
};

export default function GridWithReactMemo() {
  const [element, setElement] = React.useState('button' as any);
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100_000,
  });

  const columns = React.useMemo(() => {
    return data.columns.map((c) => ({
      ...c,
      renderCell: (params: any) => {
        return (
          <Cell
            element={element}
            initialValue={String(params.value)}
            attribute={c.field}
          />
        );
      },
    }));
  }, [element, data.columns]);

  return (
    <Box>
      <Box>
        <Button color="inherit" onClick={() => setElement('button')}>
          button (native)
        </Button>
        <Button onClick={() => setElement(Button)}>Button (MUI)</Button>
        <ZeroButton color="secondary" onClick={() => setElement(ZeroButton)}>
          Button (Zero)
        </ZeroButton>
        <Button color="inherit" onClick={() => setElement('input')}>
          input (native)
        </Button>
        <Button onClick={() => setElement(OutlinedInput)}>
          OutlinedInput (MUI)
        </Button>
        <ZeroButton color="error" onClick={() => setElement(ZeroOutlinedInput)}>
          OutlinedInput (Zero)
        </ZeroButton>
      </Box>
      <Box sx={sx}>
        <DataGrid
          {...data}
          columns={columns}
          hideFooter={true}
          checkboxSelection
          density="compact"
        />
      </Box>
    </Box>
  );
}
