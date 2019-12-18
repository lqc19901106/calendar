"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var prev = _ref.prev,
      next = _ref.next,
      titleAction = _ref.titleAction,
      data = _ref.data;
  return _react.default.createElement("div", {
    className: "navigation-wrapper"
  }, _react.default.createElement("span", {
    className: "icon",
    onClick: prev
  }, "<"), _react.default.createElement("span", {
    className: "navigation-title",
    onClick: titleAction
  }, data), _react.default.createElement("span", {
    className: "icon",
    onClick: next
  }, ">"));
};

exports.default = _default;