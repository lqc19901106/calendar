"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cell = function Cell(_ref) {
  var value = _ref.value,
      cls = _ref.cls;
  return _react.default.createElement("div", {
    className: "".concat(cls, " cell")
  }, value);
};

var _default = Cell;
exports.default = _default;