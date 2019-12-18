"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref, toggleClick) {
  var customIcon = _ref.customIcon,
      hideIcon = _ref.hideIcon,
      disabled = _ref.disabled;

  if (customIcon == null) {
    // Do not show calendar icon if hideIcon is true
    return hideIcon || disabled ? '' : _react.default.createElement("span", {
      className: "icon-wrapper calendar-icon",
      onClick: toggleClick
    }, _react.default.createElement("svg", {
      width: "16",
      height: "16",
      viewBox: "0 0 16 16",
      fill: "rgba(255, 255, 255, 0.5)"
    }, _react.default.createElement("path", {
      d: "M5 6h2v2h-2zM8 6h2v2h-2zM11 6h2v2h-2zM2 12h2v2h-2zM5 12h2v2h-2zM8 12h2v2h-2zM5 9h2v2h-2zM8 9h2v2h-2zM11 9h2v2h-2zM2 9h2v2h-2zM13 0v1h-2v-1h-7v1h-2v-1h-2v16h15v-16h-2zM14 15h-13v-11h13v11z"
    })));
  } else {
    return _react.default.createElement("span", {
      className: (0, _classnames.default)('icon-wrapper', 'calendar-icon', customIcon),
      onClick: toggleClick
    });
  }
};

exports.default = _default;