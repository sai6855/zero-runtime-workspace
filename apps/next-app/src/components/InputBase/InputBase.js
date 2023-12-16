'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { refType, elementTypeAcceptingRef } from '@mui/utils';
// import MuiError from '@mui/utils/macros/MuiError.macro';
import {
  unstable_composeClasses as composeClasses,
  isHostComponent,
  TextareaAutosize,
} from '@mui/base';
import formControlState from '../FormControl/formControlState';
import FormControlContext from '../FormControl/FormControlContext';
import useFormControl from '../FormControl/useFormControl';
import { styled } from '@mui/zero-runtime';
import useThemeProps from '@mui/material/styles/useThemeProps';
import capitalize from '@mui/material/utils/capitalize';
import useForkRef from '@mui/material/utils/useForkRef';
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';
// import GlobalStyles from '../GlobalStyles';
import { isFilled } from './utils';
import inputBaseClasses, { getInputBaseUtilityClass } from './inputBaseClasses';

export const rootOverridesResolver = (props, styles) => {
  const { ownerState } = props;

  return [
    styles.root,
    ownerState.formControl && styles.formControl,
    ownerState.startAdornment && styles.adornedStart,
    ownerState.endAdornment && styles.adornedEnd,
    ownerState.error && styles.error,
    ownerState.size === 'small' && styles.sizeSmall,
    ownerState.multiline && styles.multiline,
    ownerState.color && styles[`color${capitalize(ownerState.color)}`],
    ownerState.fullWidth && styles.fullWidth,
    ownerState.hiddenLabel && styles.hiddenLabel,
  ];
};

export const inputOverridesResolver = (props, styles) => {
  const { ownerState } = props;

  return [
    styles.input,
    ownerState.size === 'small' && styles.inputSizeSmall,
    ownerState.multiline && styles.inputMultiline,
    ownerState.type === 'search' && styles.inputTypeSearch,
    ownerState.startAdornment && styles.inputAdornedStart,
    ownerState.endAdornment && styles.inputAdornedEnd,
    ownerState.hiddenLabel && styles.inputHiddenLabel,
  ];
};

const useUtilityClasses = (ownerState) => {
  const {
    classes,
    color,
    disabled,
    error,
    endAdornment,
    focused,
    formControl,
    fullWidth,
    hiddenLabel,
    multiline,
    readOnly,
    size,
    startAdornment,
    type,
  } = ownerState;
  const slots = {
    root: [
      'root',
      `color${capitalize(color)}`,
      disabled && 'disabled',
      error && 'error',
      fullWidth && 'fullWidth',
      focused && 'focused',
      formControl && 'formControl',
      size && size !== 'medium' && `size${capitalize(size)}`,
      multiline && 'multiline',
      startAdornment && 'adornedStart',
      endAdornment && 'adornedEnd',
      hiddenLabel && 'hiddenLabel',
      readOnly && 'readOnly',
    ],
    input: [
      'input',
      disabled && 'disabled',
      type === 'search' && 'inputTypeSearch',
      multiline && 'inputMultiline',
      size === 'small' && 'inputSizeSmall',
      hiddenLabel && 'inputHiddenLabel',
      startAdornment && 'inputAdornedStart',
      endAdornment && 'inputAdornedEnd',
      readOnly && 'readOnly',
    ],
  };

  return composeClasses(slots, getInputBaseUtilityClass, classes);
};

export const InputBaseRoot = styled('div', {
  name: 'MuiInputBase',
  slot: 'Root',
  overridesResolver: rootOverridesResolver,
})(({ theme }) => ({
  ...theme.typography.body1,
  color: (theme.vars || theme).palette.text.primary,
  lineHeight: '1.4375em', // 23px
  boxSizing: 'border-box', // Prevent padding issue with fullWidth.
  position: 'relative',
  cursor: 'text',
  display: 'inline-flex',
  alignItems: 'center',
  [`&.${inputBaseClasses.disabled}`]: {
    color: (theme.vars || theme).palette.text.disabled,
    cursor: 'default',
  },
  variants: [
    { props: { multiline: true }, style: { padding: '4px 0 5px' } },
    {
      props: { multiline: true, size: 'small' },
      style: { paddingTop: 1 },
    },
  ],
  width: ({ ownerState }) => (ownerState.fullWidth ? '100%' : undefined),
}));

export const InputBaseComponent = styled('input', {
  name: 'MuiInputBase',
  slot: 'Input',
  overridesResolver: inputOverridesResolver,
})(({ theme }) => {
  // TODO: fix cannot read property 'mode' of undefined
  // const light = theme.palette.mode === 'light';
  const placeholder = {
    color: 'currentColor',
    ...(theme.vars
      ? {
          opacity: theme.vars.opacity.inputPlaceholder,
        }
      : {
          // opacity: light ? 0.42 : 0.5,
          opacity: 0.42,
        }),
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter,
    }),
  };
  const placeholderHidden = {
    // TODO: `!important` causes compilation error
    // opacity: '0 !important',
    opacity: 0,
  };
  const placeholderVisible = theme.vars
    ? {
        opacity: theme.vars.opacity.inputPlaceholder,
      }
    : {
        // opacity: light ? 0.42 : 0.5,
        opacity: 0.42,
      };
  return {
    font: 'inherit',
    letterSpacing: 'inherit',
    color: 'currentColor',
    padding: '4px 0 5px',
    border: 0,
    boxSizing: 'content-box',
    background: 'none',
    height: '1.4375em', // Reset 23pxthe native input line-height
    margin: 0, // Reset for Safari
    WebkitTapHighlightColor: 'transparent',
    display: 'block',
    // Make the flex item shrink with Firefox
    minWidth: 0,
    width: '100%', // Fix IE11 width issue
    animationName: 'mui-auto-fill-cancel',
    animationDuration: '10ms',
    '&::-webkit-input-placeholder': placeholder,
    '&::-moz-placeholder': placeholder, // Firefox 19+
    '&:-ms-input-placeholder': placeholder, // IE11
    '&::-ms-input-placeholder': placeholder, // Edge
    '&:focus': {
      outline: 0,
    },
    // Reset Firefox invalid required input style
    '&:invalid': {
      boxShadow: 'none',
    },
    '&::-webkit-search-decoration': {
      // Remove the padding when type=search.
      WebkitAppearance: 'none',
    },
    // Show and hide the placeholder logic
    [`label[data-shrink=false] + .${inputBaseClasses.formControl} &`]: {
      '&::-webkit-input-placeholder': placeholderHidden,
      '&::-moz-placeholder': placeholderHidden, // Firefox 19+
      '&:-ms-input-placeholder': placeholderHidden, // IE11
      '&::-ms-input-placeholder': placeholderHidden, // Edge
      '&:focus::-webkit-input-placeholder': placeholderVisible,
      '&:focus::-moz-placeholder': placeholderVisible, // Firefox 19+
      '&:focus:-ms-input-placeholder': placeholderVisible, // IE11
      '&:focus::-ms-input-placeholder': placeholderVisible, // Edge
    },
    [`&.${inputBaseClasses.disabled}`]: {
      opacity: 1, // Reset iOS opacity
      WebkitTextFillColor: (theme.vars || theme).palette.text.disabled, // Fix opacity Safari bug
    },
    '&:-webkit-autofill': {
      animationDuration: '5000s',
      animationName: 'mui-auto-fill',
    },
    variants: [
      {
        props: { multiline: true },
        style: {
          height: 'auto',
          resize: 'none',
          padding: 0,
          paddingTop: 0,
        },
      },
      {
        props: { size: 'small' },
        style: {
          paddingTop: 1,
        },
      },
    ],
    '&[type="search"]': {
      // Improve type search style.
      MozAppearance: 'textfield',
    },
  };
});

// const inputGlobalStyles = (
//   <GlobalStyles
//     styles={{
//       '@keyframes mui-auto-fill': { from: { display: 'block' } },
//       '@keyframes mui-auto-fill-cancel': { from: { display: 'block' } },
//     }}
//   />
// );

/**
 * `InputBase` contains as few styles as possible.
 * It aims to be a simple building block for creating an input.
 * It contains a load of style reset and some state logic.
 */
const InputBase = React.forwardRef(function InputBase(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiInputBase' });
  const {
    'aria-describedby': ariaDescribedby,
    autoComplete,
    autoFocus,
    className,
    color,
    components = {},
    componentsProps = {},
    defaultValue,
    disabled,
    disableInjectingGlobalStyles,
    endAdornment,
    error,
    fullWidth = false,
    id,
    inputComponent = 'input',
    inputProps: inputPropsProp = {},
    inputRef: inputRefProp,
    margin,
    maxRows,
    minRows,
    multiline = false,
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    onKeyDown,
    onKeyUp,
    placeholder,
    readOnly,
    renderSuffix,
    rows,
    size,
    slotProps = {},
    slots = {},
    startAdornment,
    type = 'text',
    value: valueProp,
    ...other
  } = props;

  const value = inputPropsProp.value != null ? inputPropsProp.value : valueProp;
  const { current: isControlled } = React.useRef(value != null);

  const inputRef = React.useRef();
  const handleInputRefWarning = React.useCallback((instance) => {
    if (process.env.NODE_ENV !== 'production') {
      if (instance && instance.nodeName !== 'INPUT' && !instance.focus) {
        console.error(
          [
            'MUI: You have provided a `inputComponent` to the input component',
            'that does not correctly handle the `ref` prop.',
            'Make sure the `ref` prop is called with a HTMLInputElement.',
          ].join('\n'),
        );
      }
    }
  }, []);

  const handleInputRef = useForkRef(
    inputRef,
    inputRefProp,
    inputPropsProp.ref,
    handleInputRefWarning,
  );

  const [focused, setFocused] = React.useState(false);
  const muiFormControl = useFormControl();

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (muiFormControl) {
        return muiFormControl.registerEffect();
      }

      return undefined;
    }, [muiFormControl]);
  }

  const fcs = formControlState({
    props,
    muiFormControl,
    states: [
      'color',
      'disabled',
      'error',
      'hiddenLabel',
      'size',
      'required',
      'filled',
    ],
  });

  fcs.focused = muiFormControl ? muiFormControl.focused : focused;

  // The blur won't fire when the disabled state is set on a focused input.
  // We need to book keep the focused state manually.
  React.useEffect(() => {
    if (!muiFormControl && disabled && focused) {
      setFocused(false);
      if (onBlur) {
        onBlur();
      }
    }
  }, [muiFormControl, disabled, focused, onBlur]);

  const onFilled = muiFormControl && muiFormControl.onFilled;
  const onEmpty = muiFormControl && muiFormControl.onEmpty;

  const checkDirty = React.useCallback(
    (obj) => {
      if (isFilled(obj)) {
        if (onFilled) {
          onFilled();
        }
      } else if (onEmpty) {
        onEmpty();
      }
    },
    [onFilled, onEmpty],
  );

  useEnhancedEffect(() => {
    if (isControlled) {
      checkDirty({ value });
    }
  }, [value, checkDirty, isControlled]);

  const handleFocus = (event) => {
    // Fix a bug with IE11 where the focus/blur events are triggered
    // while the component is disabled.
    if (fcs.disabled) {
      event.stopPropagation();
      return;
    }

    if (onFocus) {
      onFocus(event);
    }
    if (inputPropsProp.onFocus) {
      inputPropsProp.onFocus(event);
    }

    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    } else {
      setFocused(true);
    }
  };

  const handleBlur = (event) => {
    if (onBlur) {
      onBlur(event);
    }
    if (inputPropsProp.onBlur) {
      inputPropsProp.onBlur(event);
    }

    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    } else {
      setFocused(false);
    }
  };

  const handleChange = (event, ...args) => {
    if (!isControlled) {
      const element = event.target || inputRef.current;
      if (element == null) {
        // throw new MuiError(
        //   'MUI: Expected valid input target. ' +
        //     'Did you use a custom `inputComponent` and forget to forward refs? ' +
        //     'See https://mui.com/r/input-component-ref-interface for more info.',
        // );
      }

      checkDirty({
        value: element.value,
      });
    }

    if (inputPropsProp.onChange) {
      inputPropsProp.onChange(event, ...args);
    }

    // Perform in the willUpdate
    if (onChange) {
      onChange(event, ...args);
    }
  };

  // Check the input state on mount, in case it was filled by the user
  // or auto filled by the browser before the hydration (for SSR).
  React.useEffect(() => {
    checkDirty(inputRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (event) => {
    if (inputRef.current && event.currentTarget === event.target) {
      inputRef.current.focus();
    }

    if (onClick) {
      onClick(event);
    }
  };
  let InputComponent = inputComponent;
  let inputProps = inputPropsProp;

  if (multiline && InputComponent === 'input') {
    if (rows) {
      if (process.env.NODE_ENV !== 'production') {
        if (minRows || maxRows) {
          console.warn(
            'MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.',
          );
        }
      }
      inputProps = {
        type: undefined,
        minRows: rows,
        maxRows: rows,
        ...inputProps,
      };
    } else {
      inputProps = {
        type: undefined,
        maxRows,
        minRows,
        ...inputProps,
      };
    }

    InputComponent = TextareaAutosize;
  }

  const handleAutoFill = (event) => {
    // Provide a fake value as Chrome might not let you access it for security reasons.
    checkDirty(
      event.animationName === 'mui-auto-fill-cancel'
        ? inputRef.current
        : { value: 'x' },
    );
  };

  React.useEffect(() => {
    if (muiFormControl) {
      muiFormControl.setAdornedStart(Boolean(startAdornment));
    }
  }, [muiFormControl, startAdornment]);

  const ownerState = {
    ...props,
    color: fcs.color || 'primary',
    disabled: fcs.disabled,
    endAdornment,
    error: fcs.error,
    focused: fcs.focused,
    formControl: muiFormControl,
    fullWidth,
    hiddenLabel: fcs.hiddenLabel,
    multiline,
    size: fcs.size,
    startAdornment,
    type,
  };

  const classes = useUtilityClasses(ownerState);

  const Root = slots.root || components.Root || InputBaseRoot;
  const rootProps = slotProps.root || componentsProps.root || {};

  const Input = slots.input || components.Input || InputBaseComponent;
  inputProps = { ...inputProps, ...(slotProps.input ?? componentsProps.input) };

  return (
    <React.Fragment>
      {/* {!disableInjectingGlobalStyles && inputGlobalStyles} */}
      <Root
        {...rootProps}
        {...(!isHostComponent(Root) && {
          ownerState: { ...ownerState, ...rootProps.ownerState },
        })}
        ref={ref}
        onClick={handleClick}
        {...other}
        className={clsx(
          classes.root,
          {
            // TODO v6: remove this class as it duplicates with the global state class Mui-readOnly
            'MuiInputBase-readOnly': readOnly,
          },
          rootProps.className,
          className,
        )}
      >
        {startAdornment}
        <FormControlContext.Provider value={null}>
          <Input
            ownerState={ownerState}
            aria-invalid={fcs.error}
            aria-describedby={ariaDescribedby}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            defaultValue={defaultValue}
            disabled={fcs.disabled}
            id={id}
            onAnimationStart={handleAutoFill}
            name={name}
            placeholder={placeholder}
            readOnly={readOnly}
            required={fcs.required}
            rows={rows}
            value={value}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            type={type}
            {...inputProps}
            {...(!isHostComponent(Input) && {
              as: InputComponent,
              ownerState: { ...ownerState, ...inputProps.ownerState },
            })}
            ref={handleInputRef}
            className={clsx(
              classes.input,
              {
                // TODO v6: remove this class as it duplicates with the global state class Mui-readOnly
                'MuiInputBase-readOnly': readOnly,
              },
              inputProps.className,
            )}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
          />
        </FormControlContext.Provider>
        {endAdornment}
        {renderSuffix
          ? renderSuffix({
              ...fcs,
              startAdornment,
            })
          : null}
      </Root>
    </React.Fragment>
  );
});

export default InputBase;
