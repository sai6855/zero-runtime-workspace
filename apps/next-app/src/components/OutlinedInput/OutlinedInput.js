'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { refType } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import { styled } from '@mui/zero-runtime';
import useThemeProps from '@mui/material/styles/useThemeProps';
import NotchedOutline from './NotchedOutline';
import useFormControl from '../FormControl/useFormControl';
import formControlState from '../FormControl/formControlState';
import outlinedInputClasses, {
  getOutlinedInputUtilityClass,
} from './outlinedInputClasses';
import InputBase, {
  rootOverridesResolver as inputBaseRootOverridesResolver,
  inputOverridesResolver as inputBaseInputOverridesResolver,
  InputBaseRoot,
  InputBaseComponent,
} from '../InputBase/InputBase';
import inputBaseClasses from '../InputBase/inputBaseClasses';

function shouldForwardProp(prop) {
  return (
    prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as'
  );
}
const rootShouldForwardProp = (prop) =>
  shouldForwardProp(prop) && prop !== 'classes';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    notchedOutline: ['notchedOutline'],
    input: ['input'],
  };

  const composedClasses = composeClasses(
    slots,
    getOutlinedInputUtilityClass,
    classes,
  );

  return {
    ...classes, // forward classes to the InputBase
    ...composedClasses,
  };
};

const OutlinedInputRoot = styled(InputBaseRoot, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop),
  name: 'MuiOutlinedInput',
  slot: 'Root',
  overridesResolver: inputBaseRootOverridesResolver,
})(({ theme }) => {
  // const borderColor =
  //   theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
  return {
    [`&.${outlinedInputClasses.root}`]: {
      position: 'relative',
      borderRadius: (theme.vars || theme).shape.borderRadius,
      padding: ({ ownerState }) => {
        let paddingLeft = 0;
        if (ownerState.startAdornment) {
          paddingLeft = 14;
        }
        let paddingRight = 0;
        if (ownerState.endAdornment) {
          paddingRight = 14;
        }
        let paddingY = 0;
        if (ownerState.size === 'small') {
          paddingY = 8.5;
        }
        if (ownerState.multiline) {
          paddingY = 0;
        }
        return `${paddingY}px ${paddingRight}px ${paddingY}px ${paddingLeft}px`;
      },
    },
    [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: (theme.vars || theme).palette.text.primary,
    },
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: theme.vars
          ? `rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)`
          : theme.palette.mode === 'light'
          ? 'rgba(0, 0, 0, 0.23)'
          : 'rgba(255, 255, 255, 0.23)',
      },
    },
    [`&.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
      {
        borderWidth: 2,
      },
    variants: [
      ...['primary', 'secondary', 'error', 'info', 'success', 'warning'].map(
        (item) => ({
          props: { color: item },
          style: {
            [`&.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
              {
                borderColor: (theme.vars || theme).palette[item].main,
                borderWidth: 2,
              },
          },
        }),
      ),
    ],
    [`&.${outlinedInputClasses.error} .${outlinedInputClasses.notchedOutline}`]:
      {
        borderColor: (theme.vars || theme).palette.error.main,
      },
    [`&.${outlinedInputClasses.disabled} .${outlinedInputClasses.notchedOutline}`]:
      {
        borderColor: (theme.vars || theme).palette.action.disabled,
      },
  };
});

const NotchedOutlineRoot = styled(NotchedOutline, {
  name: 'MuiOutlinedInput',
  slot: 'NotchedOutline',
  overridesResolver: (props, styles) => styles.notchedOutline,
})(({ theme }) => {
  const borderColor =
    theme.palette?.mode === 'light'
      ? 'rgba(0, 0, 0, 0.23)'
      : 'rgba(255, 255, 255, 0.23)';
  return {
    borderColor: theme.vars
      ? `rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)`
      : borderColor,
  };
});

const OutlinedInputInput = styled(InputBaseComponent, {
  name: 'MuiOutlinedInput',
  slot: 'Input',
  overridesResolver: inputBaseInputOverridesResolver,
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
    ...(!theme.vars && {
      '&:-webkit-autofill': {
        WebkitBoxShadow:
          theme.palette.mode === 'light' ? null : '0 0 0 100px #266798 inset',
        WebkitTextFillColor: theme.palette.mode === 'light' ? null : '#fff',
        caretColor: theme.palette.mode === 'light' ? null : '#fff',
        borderRadius: 'inherit',
      },
    }),
    ...(theme.vars && {
      '&:-webkit-autofill': {
        borderRadius: 'inherit',
      },
      [theme.getColorSchemeSelector('dark')]: {
        '&:-webkit-autofill': {
          WebkitBoxShadow: '0 0 0 100px #266798 inset',
          WebkitTextFillColor: '#fff',
          caretColor: '#fff',
        },
      },
    }),
    font: 'inherit',
    letterSpacing: 'inherit',
    color: 'currentColor',
    padding: '4px 0 5px',
    border: 0,
    boxSizing: 'content-box',
    background: 'none',
    height: '1.4375em',
    margin: 0,
    WebkitTapHighlightColor: 'transparent',
    display: 'block',
    // Make the flex item shrink with Firefox
    minWidth: 0,
    width: '100%',
    animationName: 'mui-auto-fill-cancel',
    animationDuration: '10ms',
    '&::-webkit-input-placeholder': placeholder,
    '&::-moz-placeholder': placeholder,
    '&:-ms-input-placeholder': placeholder,
    '&::-ms-input-placeholder': placeholder,
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
      '&::-moz-placeholder': placeholderHidden,
      '&:-ms-input-placeholder': placeholderHidden,
      '&::-ms-input-placeholder': placeholderHidden,
      '&:focus::-webkit-input-placeholder': placeholderVisible,
      '&:focus::-moz-placeholder': placeholderVisible,
      '&:focus:-ms-input-placeholder': placeholderVisible,
      '&:focus::-ms-input-placeholder': placeholderVisible, // Edge
    },
    [`&.${inputBaseClasses.disabled}`]: {
      opacity: 1,
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
    // TODO: The result is weird, need to investigate
    //        --o3vuzx2-0: var(--app-16-16-5px) 14px var(--app-16-16-5px) 14px;
    //        Found it! the value contain `.`, e.g. `16.5px`
    padding: ({ ownerState }) => {
      let paddingY = 16.5;
      let paddingLeft = 14;
      let paddingRight = 14;
      if (ownerState.size === 'small') {
        paddingY = 8.5;
      }
      if (ownerState.multiline) {
        paddingLeft = 0;
        paddingRight = 0;
        paddingY = 0;
      }
      if (ownerState.startAdornment) {
        paddingLeft = 0;
      }
      if (ownerState.endAdornment) {
        paddingRight = 0;
      }
      return `${paddingY}px ${paddingRight}px ${paddingY}px ${paddingLeft}px`;
    },
  };
});

const OutlinedInput = React.forwardRef(function OutlinedInput(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiOutlinedInput' });
  const {
    components = {},
    fullWidth = false,
    inputComponent = 'input',
    label,
    multiline = false,
    notched,
    slots = {},
    type = 'text',
    ...other
  } = props;

  const classes = useUtilityClasses(props);

  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: [
      'color',
      'disabled',
      'error',
      'focused',
      'hiddenLabel',
      'size',
      'required',
    ],
  });

  const ownerState = {
    ...props,
    color: fcs.color || 'primary',
    disabled: fcs.disabled,
    error: fcs.error,
    focused: fcs.focused,
    formControl: muiFormControl,
    fullWidth,
    hiddenLabel: fcs.hiddenLabel,
    multiline,
    size: fcs.size,
    type,
  };

  const RootSlot = slots.root ?? components.Root ?? OutlinedInputRoot;
  const InputSlot = slots.input ?? components.Input ?? OutlinedInputInput;

  return (
    <InputBase
      slots={{ root: RootSlot, input: InputSlot }}
      renderSuffix={(state) => (
        <NotchedOutlineRoot
          ownerState={ownerState}
          className={classes.notchedOutline}
          label={
            label != null && label !== '' && fcs.required ? (
              <React.Fragment>
                {label}
                &thinsp;{'*'}
              </React.Fragment>
            ) : (
              label
            )
          }
          notched={
            typeof notched !== 'undefined'
              ? notched
              : Boolean(state.startAdornment || state.filled || state.focused)
          }
        />
      )}
      fullWidth={fullWidth}
      inputComponent={inputComponent}
      multiline={multiline}
      ref={ref}
      type={type}
      {...other}
      classes={{
        ...classes,
        notchedOutline: null,
      }}
    />
  );
});

// OutlinedInput.propTypes /* remove-proptypes */ = {
//   // ----------------------------- Warning --------------------------------
//   // | These PropTypes are generated from the TypeScript type definitions |
//   // |     To update them edit the d.ts file and run "yarn proptypes"     |
//   // ----------------------------------------------------------------------
//   /**
//    * This prop helps users to fill forms faster, especially on mobile devices.
//    * The name can be confusing, as it's more like an autofill.
//    * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
//    */
//   autoComplete: PropTypes.string,
//   /**
//    * If `true`, the `input` element is focused during the first mount.
//    */
//   autoFocus: PropTypes.bool,
//   /**
//    * Override or extend the styles applied to the component.
//    */
//   classes: PropTypes.object,
//   /**
//    * The color of the component.
//    * It supports both default and custom theme colors, which can be added as shown in the
//    * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
//    * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
//    */
//   color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
//     PropTypes.oneOf(['primary', 'secondary']),
//     PropTypes.string,
//   ]),
//   /**
//    * The components used for each slot inside.
//    *
//    * This prop is an alias for the `slots` prop.
//    * It's recommended to use the `slots` prop instead.
//    *
//    * @default {}
//    */
//   components: PropTypes.shape({
//     Input: PropTypes.elementType,
//     Root: PropTypes.elementType,
//   }),
//   /**
//    * The default value. Use when the component is not controlled.
//    */
//   defaultValue: PropTypes.any,
//   /**
//    * If `true`, the component is disabled.
//    * The prop defaults to the value (`false`) inherited from the parent FormControl component.
//    */
//   disabled: PropTypes.bool,
//   /**
//    * End `InputAdornment` for this component.
//    */
//   endAdornment: PropTypes.node,
//   /**
//    * If `true`, the `input` will indicate an error.
//    * The prop defaults to the value (`false`) inherited from the parent FormControl component.
//    */
//   error: PropTypes.bool,
//   /**
//    * If `true`, the `input` will take up the full width of its container.
//    * @default false
//    */
//   fullWidth: PropTypes.bool,
//   /**
//    * The id of the `input` element.
//    */
//   id: PropTypes.string,
//   /**
//    * The component used for the `input` element.
//    * Either a string to use a HTML element or a component.
//    * @default 'input'
//    */
//   inputComponent: PropTypes.elementType,
//   /**
//    * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
//    * @default {}
//    */
//   inputProps: PropTypes.object,
//   /**
//    * Pass a ref to the `input` element.
//    */
//   inputRef: refType,
//   /**
//    * The label of the `input`. It is only used for layout. The actual labelling
//    * is handled by `InputLabel`.
//    */
//   label: PropTypes.node,
//   /**
//    * If `dense`, will adjust vertical spacing. This is normally obtained via context from
//    * FormControl.
//    * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
//    */
//   margin: PropTypes.oneOf(['dense', 'none']),
//   /**
//    * Maximum number of rows to display when multiline option is set to true.
//    */
//   maxRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//   /**
//    * Minimum number of rows to display when multiline option is set to true.
//    */
//   minRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//   /**
//    * If `true`, a [TextareaAutosize](/material-ui/react-textarea-autosize/) element is rendered.
//    * @default false
//    */
//   multiline: PropTypes.bool,
//   /**
//    * Name attribute of the `input` element.
//    */
//   name: PropTypes.string,
//   /**
//    * If `true`, the outline is notched to accommodate the label.
//    */
//   notched: PropTypes.bool,
//   /**
//    * Callback fired when the value is changed.
//    *
//    * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
//    * You can pull out the new value by accessing `event.target.value` (string).
//    */
//   onChange: PropTypes.func,
//   /**
//    * The short hint displayed in the `input` before the user enters a value.
//    */
//   placeholder: PropTypes.string,
//   /**
//    * It prevents the user from changing the value of the field
//    * (not from interacting with the field).
//    */
//   readOnly: PropTypes.bool,
//   /**
//    * If `true`, the `input` element is required.
//    * The prop defaults to the value (`false`) inherited from the parent FormControl component.
//    */
//   required: PropTypes.bool,
//   /**
//    * Number of rows to display when multiline option is set to true.
//    */
//   rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//   /**
//    * The components used for each slot inside.
//    *
//    * This prop is an alias for the `components` prop, which will be deprecated in the future.
//    *
//    * @default {}
//    */
//   slots: PropTypes.shape({
//     input: PropTypes.elementType,
//     root: PropTypes.elementType,
//   }),
//   /**
//    * Start `InputAdornment` for this component.
//    */
//   startAdornment: PropTypes.node,
//   /**
//    * The system prop that allows defining system overrides as well as additional CSS styles.
//    */
//   sx: PropTypes.oneOfType([
//     PropTypes.arrayOf(
//       PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
//     ),
//     PropTypes.func,
//     PropTypes.object,
//   ]),
//   /**
//    * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
//    * @default 'text'
//    */
//   type: PropTypes.string,
//   /**
//    * The value of the `input` element, required for a controlled component.
//    */
//   value: PropTypes.any,
// };

// OutlinedInput.muiName = 'Input';

export default OutlinedInput;
