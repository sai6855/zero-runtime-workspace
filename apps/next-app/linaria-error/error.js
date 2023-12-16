'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.__linariaPreval = void 0;
var _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/esm/defineProperty'),
);
var _tagged_template_literal2 = require('@swc/helpers/_/_tagged_template_literal');
var _Ripple = _interopRequireDefault(require('./Ripple'));
var _touchRippleClasses = _interopRequireDefault(
  require('./touchRippleClasses'),
);
/* __next_internal_client_entry_do_not_use__ DELAY_RIPPLE,TouchRippleRoot,TouchRippleRipple,default auto */
function _templateObject() {
  var data = (0, _tagged_template_literal2._)([
    '\n  0% {\n    transform: scale(0);\n    opacity: 0.1;\n  }\n\n  100% {\n    transform: scale(1);\n    opacity: 0.3;\n  }\n',
  ]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _templateObject1() {
  var data = (0, _tagged_template_literal2._)([
    '\n  0% {\n    opacity: 1;\n  }\n\n  100% {\n    opacity: 0;\n  }\n',
  ]);
  _templateObject1 = function _templateObject1() {
    return data;
  };
  return data;
}
function _templateObject2() {
  var data = (0, _tagged_template_literal2._)([
    '\n  0% {\n    transform: scale(1);\n  }\n\n  50% {\n    transform: scale(0.92);\n  }\n\n  100% {\n    transform: scale(1);\n  }\n',
  ]);
  _templateObject2 = function _templateObject2() {
    return data;
  };
  return data;
}
var _exp = /*#__PURE__*/ function _exp() {
  return _templateObject();
};
var _exp2 = /*#__PURE__*/ function _exp2() {
  return _templateObject1();
};
var _exp3 = /*#__PURE__*/ function _exp3() {
  return _templateObject2();
};
var _exp4 = /*#__PURE__*/ function _exp4() {
  return {
    name: 'MuiTouchRipple',
    slot: 'Root',
  };
};
var _exp5 = /*#__PURE__*/ function _exp5() {
  return {
    overflow: 'hidden',
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 'inherit',
  };
};
// This `styled()` function invokes keyframes. `styled-components` only supports keyframes
// in string templates. Do not convert these styles in JS object as it will break.
var _exp6 = /*#__PURE__*/ function _exp6() {
  return _Ripple['default'];
};
var _exp7 = /*#__PURE__*/ function _exp7() {
  return {
    name: 'MuiTouchRipple',
    slot: 'Ripple',
  };
};
var _exp8 = /*#__PURE__*/ function _exp8() {
  return function (param) {
    var _ref;
    var theme = param.theme;
    return (
      (_ref = {
        opacity: 0,
        position: 'absolute',
      }),
      (0, _defineProperty2['default'])(
        _ref,
        '&.'.concat(_touchRippleClasses['default'].rippleVisible),
        {
          opacity: 0.3,
          transform: 'scale(1)',
          animationName: 'enterKeyframe_e196pbge',
          animationDuration: ''.concat(550, 'ms'),
          animationTimingFunction: theme.transitions.easing.easeInOut,
        },
      ),
      (0, _defineProperty2['default'])(
        _ref,
        '&.'.concat(_touchRippleClasses['default'].ripplePulsate),
        {
          animationDuration: theme.transitions.duration.shorter,
        },
      ),
      (0, _defineProperty2['default'])(
        _ref,
        '& .'.concat(_touchRippleClasses['default'].child),
        {
          opacity: 1,
          display: 'block',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          backgroundColor: 'currentColor',
        },
      ),
      (0, _defineProperty2['default'])(
        _ref,
        '& .'.concat(_touchRippleClasses['default'].childLeaving),
        {
          opacity: 0,
          animationName: 'exitKeyframe_ear7iqf',
          animationDuration: ''.concat(550, 'ms'),
          animationTimingFunction: theme.transitions.easing.easeInOut,
        },
      ),
      (0, _defineProperty2['default'])(
        _ref,
        '& .'.concat(_touchRippleClasses['default'].childPulsate),
        {
          position: 'absolute',
          left: '0px',
          top: '0',
          animationName: 'pulsateKeyframe_ppsi3dg',
          animationDuration: '2500ms',
          animationTimingFunction: theme.transitions.easing.easeInOut,
          animationIterationCount: 'infinite',
          animationDelay: '200ms',
        },
      ),
      _ref
    );
  };
};
/**
 * @ignore - internal component.
 *
 * TODO v5: Make private
 */
var __linariaPreval = (exports.__linariaPreval = {
  _exp: _exp,
  _exp2: _exp2,
  _exp3: _exp3,
  _exp4: _exp4,
  _exp5: _exp5,
  _exp6: _exp6,
  _exp7: _exp7,
  _exp8: _exp8,
});
