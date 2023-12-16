/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import {
  unstable_composeClasses as composeClasses,
  unstable_generateUtilityClass as generateUtilityClass,
} from '@mui/utils';
import { styled } from '@mui/material/styles';
import useTheme from '@mui/system/useTheme';
import createTheme from '@mui/system/createTheme';
import {
  generateSizeClassNames,
  generateSpacingClassNames,
  generateDirectionClasses,
} from './gridGenerator';
import gridClasses from './gridClasses';

type GridTypeMap = any;
type GridProps = any;
type GridOwnerState = any;
type Breakpoint = any;

const defaultTheme = createTheme();

const OverflowContext = React.createContext<boolean | undefined>(undefined);

const useUtilityClasses = (
  ownerState: GridOwnerState,
  theme: typeof defaultTheme,
) => {
  const { container, direction, spacing, wrap, gridSize } = ownerState;
  const slots = {
    root: [
      'root',
      container && 'container',
      wrap !== 'wrap' && `wrap-xs-${String(wrap)}`,
      ...generateDirectionClasses(direction),
      ...generateSizeClassNames(gridSize),
      ...(container
        ? generateSpacingClassNames(spacing, theme.breakpoints.keys[0])
        : []),
    ],
  };

  return composeClasses(
    slots,
    (slot) => generateUtilityClass('MuiGrid', slot),
    {},
  );
};

// @ts-ignore
const GridRoot = styled('div')(
  ({ theme }: any) => ({
    '--_flex': ({ ownerState }: any) => {
      if (ownerState.xs === true) return '1 initial 0';
      if (ownerState.xs === 'auto') return '0 0 auto';
      if (typeof ownerState.xs === 'number') return `0 initial auto`;
      return undefined;
    },
    [theme.breakpoints.up('sm')]: {
      '--_flex-sm': ({ ownerState }: any) => {
        if (ownerState.sm === true) return '1 initial 0';
        if (ownerState.sm === 'auto') return '0 0 auto';
        if (typeof ownerState.sm === 'number') return `0 initial auto`;
        return undefined;
      },
    },
    [theme.breakpoints.up('md')]: {
      '--_flex-md': ({ ownerState }: any) => {
        if (ownerState.md === true) return '1 initial 0';
        if (ownerState.md === 'auto') return '0 0 auto';
        if (typeof ownerState.md === 'number') return `0 initial auto`;
        return undefined;
      },
    },
    [theme.breakpoints.up('lg')]: {
      '--_flex-lg': ({ ownerState }: any) => {
        if (ownerState.lg === true) return '1 initial 0';
        if (ownerState.lg === 'auto') return '0 0 auto';
        if (typeof ownerState.lg === 'number') return `0 initial auto`;
        return undefined;
      },
    },
    [theme.breakpoints.up('xl')]: {
      '--_flex-xl': ({ ownerState }: any) => {
        if (ownerState.xl === true) return '1 initial 0';
        if (ownerState.xl === 'auto') return '0 0 auto';
        if (typeof ownerState.xl === 'number') return `0 initial auto`;
        return undefined;
      },
    },
    '--_maxWidth': ({ ownerState }: any) => {
      if (ownerState.xs === true) return '100%';
      if (ownerState.xs === 'auto') return 'none';
      return undefined;
    },
    [theme.breakpoints.up('sm')]: {
      '--_maxWidth-sm': ({ ownerState }: any) => {
        if (ownerState.sm === true) return '100%';
        if (ownerState.sm === 'auto') return 'none';
        return undefined;
      },
    },
    [theme.breakpoints.up('md')]: {
      '--_maxWidth-md': ({ ownerState }: any) => {
        if (ownerState.md === true) return '100%';
        if (ownerState.md === 'auto') return 'none';
        return undefined;
      },
    },
    [theme.breakpoints.up('lg')]: {
      '--_maxWidth-lg': ({ ownerState }: any) => {
        if (ownerState.lg === true) return '100%';
        if (ownerState.lg === 'auto') return 'none';
        return undefined;
      },
    },
    [theme.breakpoints.up('xl')]: {
      '--_maxWidth-xl': ({ ownerState }: any) => {
        if (ownerState.xl === true) return '100%';
        if (ownerState.xl === 'auto') return 'none';
        return undefined;
      },
    },
    '--_width': ({ ownerState }: any) => {
      if (ownerState.xs === 'auto') return 'auto';
      if (typeof ownerState.xs === 'number')
        return `calc(100% * var(--_xs) / var(--_columns))`;
      return undefined;
    },
    [theme.breakpoints.up('sm')]: {
      '--_width-sm': ({ ownerState }: any) => {
        if (ownerState.sm === 'auto') return 'auto';
        if (typeof ownerState.sm === 'number')
          return `calc(100% * var(--_sm) / var(--_columns-sm))`;
        return undefined;
      },
    },
    [theme.breakpoints.up('md')]: {
      '--_width-md': ({ ownerState }: any) => {
        if (ownerState.md === 'auto') return 'auto';
        if (typeof ownerState.md === 'number')
          return `calc(100% * var(--_md) / var(--_columns-md))`;
        return undefined;
      },
    },
    [theme.breakpoints.up('lg')]: {
      '--_width-lg': ({ ownerState }: any) => {
        if (ownerState.lg === 'auto') return 'auto';
        if (typeof ownerState.lg === 'number')
          return `calc(100% * var(--_lg) / var(--_columns-lg))`;
        return undefined;
      },
    },
    [theme.breakpoints.up('xl')]: {
      '--_width-xl': ({ ownerState }: any) => {
        if (ownerState.xl === 'auto') return 'auto';
        if (typeof ownerState.xl === 'number')
          return `calc(100% * var(--_xl) / var(--_columns-xl))`;
        return undefined;
      },
    },
    [`&.${gridClasses.container}`]: {
      '--_columns': ({ ownerState }: any) =>
        ownerState.container ? ownerState.columns.xs ?? 12 : undefined,
      '--_rowSpacing': ({ ownerState }: any) => {
        // TODO: support array
        let rowSpacing = ownerState.rowSpacing;
        if (
          ownerState.rowSpacing &&
          typeof ownerState.rowSpacing === 'object'
        ) {
          rowSpacing = ownerState.rowSpacing.xs;
        }
        return typeof rowSpacing === 'number'
          ? `calc(${rowSpacing} * var(--_spacing))`
          : rowSpacing;
      },
      '--_colSpacing': ({ ownerState }: any) => {
        // TODO: support array
        let columnSpacing = ownerState.columnSpacing;
        if (
          ownerState.columnSpacing &&
          typeof ownerState.columnSpacing === 'object'
        ) {
          columnSpacing = ownerState.columnSpacing.xs;
        }
        return typeof columnSpacing === 'number'
          ? `calc(${columnSpacing} * var(--_spacing))`
          : columnSpacing;
      },
      [theme.breakpoints.up('sm')]: {
        '--_columns-sm': ({ ownerState }: any) =>
          ownerState.container ? ownerState.columns.sm : undefined,
        '--_rowSpacing-sm': ({ ownerState }: any) => {
          // TODO: support array
          let rowSpacing = ownerState.rowSpacing;
          // `xs` already handle the spacing and to reduce the amount of inline style
          if (typeof rowSpacing === 'number' || typeof rowSpacing === 'string')
            return undefined;
          if (
            ownerState.rowSpacing &&
            typeof ownerState.rowSpacing === 'object'
          ) {
            rowSpacing = ownerState.rowSpacing.sm;
          }
          return typeof rowSpacing === 'number'
            ? `calc(${rowSpacing} * var(--_spacing))`
            : rowSpacing;
        },
        '--_colSpacing-sm': ({ ownerState }: any) => {
          // TODO: support array
          let columnSpacing = ownerState.columnSpacing;
          // `xs` already handle the spacing and to reduce the amount of inline style
          if (
            typeof columnSpacing === 'number' ||
            typeof columnSpacing === 'string'
          )
            return undefined;
          if (
            ownerState.columnSpacing &&
            typeof ownerState.columnSpacing === 'object'
          ) {
            columnSpacing = ownerState.columnSpacing.sm;
          }
          return typeof columnSpacing === 'number'
            ? `calc(${columnSpacing} * var(--_spacing))`
            : columnSpacing;
        },
      },
      [theme.breakpoints.up('md')]: {
        '--_columns-md': ({ ownerState }: any) =>
          ownerState.container ? ownerState.columns.md : undefined,
        '--_rowSpacing-md': ({ ownerState }: any) => {
          // TODO: support array
          let rowSpacing = ownerState.rowSpacing;
          // `xs` already handle the spacing and to reduce the amount of inline style
          if (typeof rowSpacing === 'number' || typeof rowSpacing === 'string')
            return undefined;
          if (
            ownerState.rowSpacing &&
            typeof ownerState.rowSpacing === 'object'
          ) {
            rowSpacing = ownerState.rowSpacing.md;
          }
          return typeof rowSpacing === 'number'
            ? `calc(${rowSpacing} * var(--_spacing))`
            : rowSpacing;
        },
        '--_colSpacing-md': ({ ownerState }: any) => {
          // TODO: support array
          let columnSpacing = ownerState.columnSpacing;
          // `xs` already handle the spacing and to reduce the amount of inline style
          if (
            typeof columnSpacing === 'number' ||
            typeof columnSpacing === 'string'
          )
            return undefined;
          if (
            ownerState.columnSpacing &&
            typeof ownerState.columnSpacing === 'object'
          ) {
            columnSpacing = ownerState.columnSpacing.md;
          }
          return typeof columnSpacing === 'number'
            ? `calc(${columnSpacing} * var(--_spacing))`
            : columnSpacing;
        },
      },
      [theme.breakpoints.up('lg')]: {
        '--_columns-lg': ({ ownerState }: any) =>
          ownerState.container ? ownerState.columns.lg : undefined,
        '--_rowSpacing-lg': ({ ownerState }: any) => {
          // TODO: support array
          let rowSpacing = ownerState.rowSpacing;
          // `xs` already handle the spacing and to reduce the amount of inline style
          if (typeof rowSpacing === 'number' || typeof rowSpacing === 'string')
            return undefined;
          if (
            ownerState.rowSpacing &&
            typeof ownerState.rowSpacing === 'object'
          ) {
            rowSpacing = ownerState.rowSpacing.lg;
          }
          return typeof rowSpacing === 'number'
            ? `calc(${rowSpacing} * var(--_spacing))`
            : rowSpacing;
        },
        '--_colSpacing-lg': ({ ownerState }: any) => {
          // TODO: support array
          let columnSpacing = ownerState.columnSpacing;
          // `xs` already handle the spacing and to reduce the amount of inline style
          if (
            typeof columnSpacing === 'number' ||
            typeof columnSpacing === 'string'
          )
            return undefined;
          if (
            ownerState.columnSpacing &&
            typeof ownerState.columnSpacing === 'object'
          ) {
            columnSpacing = ownerState.columnSpacing.lg;
          }
          return typeof columnSpacing === 'number'
            ? `calc(${columnSpacing} * var(--_spacing))`
            : columnSpacing;
        },
      },
      [theme.breakpoints.up('xl')]: {
        '--_columns-xl': ({ ownerState }: any) =>
          ownerState.container ? ownerState.columns.xl : undefined,
        '--_rowSpacing-xl': ({ ownerState }: any) => {
          // TODO: support array
          let rowSpacing = ownerState.rowSpacing;
          // `xs` already handle the spacing and to reduce the amount of inline style
          if (typeof rowSpacing === 'number' || typeof rowSpacing === 'string')
            return undefined;
          if (
            ownerState.rowSpacing &&
            typeof ownerState.rowSpacing === 'object'
          ) {
            rowSpacing = ownerState.rowSpacing.xl;
          }
          return typeof rowSpacing === 'number'
            ? `calc(${rowSpacing} * var(--_spacing))`
            : rowSpacing;
        },
        '--_colSpacing-xl': ({ ownerState }: any) => {
          // TODO: support array
          let columnSpacing = ownerState.columnSpacing;
          // `xs` already handle the spacing and to reduce the amount of inline style
          if (
            typeof columnSpacing === 'number' ||
            typeof columnSpacing === 'string'
          )
            return undefined;
          if (
            ownerState.columnSpacing &&
            typeof ownerState.columnSpacing === 'object'
          ) {
            columnSpacing = ownerState.columnSpacing.xl;
          }
          return typeof columnSpacing === 'number'
            ? `calc(${columnSpacing} * var(--_spacing))`
            : columnSpacing;
        },
      },
    },
    '&[data-grid-offset]': {
      marginInlineStart: 'var(--_offset)',
      '--_offset': ({ ownerState }: any) => {
        if (ownerState.gridOffset.xs === 'auto') return 'auto';
        if (typeof ownerState.gridOffset.xs === 'number')
          return ownerState.gridOffset.xs === 0
            ? '0px'
            : `calc(100% * ${ownerState.gridOffset.xs} / var(--_columns))`;
        return undefined;
      },
      [theme.breakpoints.up('sm')]: {
        '--_offset-sm': ({ ownerState }: any) => {
          if (ownerState.gridOffset.sm === 'auto') return 'auto';
          if (typeof ownerState.gridOffset.sm === 'number')
            return ownerState.gridOffset.sm === 0
              ? '0px'
              : `calc(100% * ${ownerState.gridOffset.sm} / var(--_columns-sm))`;
          return undefined;
        },
      },
      [theme.breakpoints.up('md')]: {
        '--_offset-md': ({ ownerState }: any) => {
          if (ownerState.gridOffset.md === 'auto') return 'auto';
          if (typeof ownerState.gridOffset.md === 'number')
            return ownerState.gridOffset.md === 0
              ? '0px'
              : `calc(100% * ${ownerState.gridOffset.md} / var(--_columns-md))`;
          return undefined;
        },
      },
      [theme.breakpoints.up('lg')]: {
        '--_offset-lg': ({ ownerState }: any) => {
          if (ownerState.gridOffset.lg === 'auto') return 'auto';
          if (typeof ownerState.gridOffset.lg === 'number')
            return ownerState.gridOffset.lg === 0
              ? '0px'
              : `calc(100% * ${ownerState.gridOffset.lg} / var(--_columns-lg))`;
          return undefined;
        },
      },
      [theme.breakpoints.up('xl')]: {
        '--_offset-xl': ({ ownerState }: any) => {
          if (ownerState.gridOffset.xl === 'auto') return 'auto';
          if (typeof ownerState.gridOffset.xl === 'number')
            return ownerState.gridOffset.xl === 0
              ? '0px'
              : `calc(100% * ${ownerState.gridOffset.xl} / var(--_columns-xl))`;
          return undefined;
        },
      },
    },
    '&[data-grid-item]': {
      '--_padding': `calc(var(--_rowSpacing-xl, var(--_rowSpacing-lg, var(--_rowSpacing-md, var(--_rowSpacing-sm, var(--_rowSpacing, 0px))))) / 2) calc(var(--_colSpacing-xl, var(--_colSpacing-lg, var(--_colSpacing-md, var(--_colSpacing-sm, var(--_colSpacing, 0px))))) / 2)`,
    },
    '--_xs': ({ ownerState }: any) => ownerState.xs,
    '--_sm': ({ ownerState }: any) => ownerState.sm,
    '--_md': ({ ownerState }: any) => ownerState.md,
    '--_lg': ({ ownerState }: any) => ownerState.lg,
    '--_xl': ({ ownerState }: any) => ownerState.xl,
    '--_spacing': theme.spacing(1),
    '--_columns-sm': 'var(--_columns)',
    '--_columns-md': 'var(--_columns-sm, var(--_columns))',
    '--_columns-lg': 'var(--_columns-md, var(--_columns-sm, var(--_columns)))',
    '--_columns-xl':
      'var(--_columns-lg, var(--_columns-md, var(--_columns-sm, var(--_columns))))',
    flex: 'var(--_flex-xl, var(--_flex-lg, var(--_flex-md, var(--_flex-sm, var(--_flex)))))',
    width:
      'var(--_width-xl, var(--_width-lg, var(--_width-md, var(--_width-sm, var(--_width)))))',
    maxWidth:
      'var(--_maxWidth-xl, var(--_maxWidth-lg, var(--_maxWidth-md, var(--_maxWidth-sm, var(--_maxWidth)))))',
    minWidth: 0,
    boxSizing: 'border-box',
    padding: 'var(--_padding)',
    variants: [
      {
        props: { container: true },
        style: {
          display: 'flex',
          flexWrap: 'wrap',
          margin: `calc(var(--_rowSpacing-xl, var(--_rowSpacing-lg, var(--_rowSpacing-md, var(--_rowSpacing-sm, var(--_rowSpacing, 0px))))) / -2) calc(var(--_colSpacing-xl, var(--_colSpacing-lg, var(--_colSpacing-md, var(--_colSpacing-sm, var(--_colSpacing, 0px))))) / -2)`,
        },
      },
    ],
  }),
  // generateGridColumnsStyles,
  // generateGridColumnSpacingStyles,
  // generateGridRowSpacingStyles,
  // generateGridSizeStyles,
  // generateGridDirectionStyles,
  // generateGridStyles,
  // generateGridOffsetStyles,
);

const Grid = React.forwardRef(function Grid(inProps: any, ref) {
  const theme = useTheme();
  const overflow = React.useContext(OverflowContext);
  const props = inProps;
  const {
    className,
    children,
    columns: columnsProp = 12,
    container = false,
    component = 'div',
    direction = 'row',
    wrap = 'wrap',
    spacing: spacingProp = 0,
    rowSpacing: rowSpacingProp = spacingProp,
    columnSpacing: columnSpacingProp = spacingProp,
    disableEqualOverflow: themeDisableEqualOverflow,
    unstable_level: level = 0,
    ...rest
  } = props;
  // Because `disableEqualOverflow` can be set from the theme's defaultProps, the **nested** grid should look at the instance props instead.
  let disableEqualOverflow = themeDisableEqualOverflow;
  if (level && themeDisableEqualOverflow !== undefined) {
    disableEqualOverflow = inProps.disableEqualOverflow;
  }
  // collect breakpoints related props because they can be customized from the theme.
  const gridSize = {} as GridOwnerState['gridSize'];
  const gridOffset = {} as GridOwnerState['gridOffset'];
  const other: Record<string, any> = {};

  Object.entries(rest).forEach(([key, val]) => {
    // @ts-ignore
    if (theme.breakpoints.values[key as Breakpoint] !== undefined) {
      // @ts-ignore
      gridSize[key as Breakpoint] = val;
    } else if (
      // @ts-ignore
      theme.breakpoints.values[key.replace('Offset', '') as Breakpoint] !==
      undefined
    ) {
      // @ts-ignore
      gridOffset[key.replace('Offset', '') as Breakpoint] = val;
    } else {
      other[key] = val;
    }
  });

  const columns = inProps.columns ?? (level ? undefined : columnsProp);
  const spacing = inProps.spacing ?? (level ? undefined : spacingProp);
  const rowSpacing =
    inProps.rowSpacing ??
    inProps.spacing ??
    (level ? undefined : rowSpacingProp);
  const columnSpacing =
    inProps.columnSpacing ??
    inProps.spacing ??
    (level ? undefined : columnSpacingProp);
  const ownerState = {
    // @ts-ignore
    ...props,
    level,
    columns,
    container,
    direction,
    wrap,
    spacing,
    rowSpacing,
    columnSpacing,
    gridSize,
    gridOffset,
    disableEqualOverflow: disableEqualOverflow ?? overflow ?? false, // use context value if exists.
    parentDisableEqualOverflow: overflow, // for nested grid
  };

  // @ts-ignore
  const classes = useUtilityClasses(ownerState, theme);

  let result = (
    <GridRoot
      // @ts-ignore
      ref={ref}
      as={component}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
      data-grid-offset={Object.keys(gridOffset).length ? '' : undefined}
      {...other}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...(container && {
              'data-grid-item': '',
            }),
            // @ts-ignore
            unstable_level: child.props.unstable_level ?? level + 1,
          } as GridProps);
        }
        return child;
      })}
    </GridRoot>
  );

  if (
    disableEqualOverflow !== undefined &&
    disableEqualOverflow !== (overflow ?? false)
  ) {
    // There are 2 possibilities that should wrap with the OverflowContext to communicate with the nested grids:
    // 1. It is the root grid with `disableEqualOverflow`.
    // 2. It is a nested grid with different `disableEqualOverflow` from the context.
    result = (
      <OverflowContext.Provider value={disableEqualOverflow}>
        {result}
      </OverflowContext.Provider>
    );
  }

  return result;
}) as OverridableComponent<GridTypeMap>;

export default Grid;
