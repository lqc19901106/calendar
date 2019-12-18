"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _dayjs = _interopRequireDefault(require("dayjs"));

var _cell = _interopRequireDefault(require("./cell"));

var _viewHeader = _interopRequireDefault(require("./view-header"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var months = {
  'en': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  'zh-cn': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
};

var MonthView =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MonthView, _React$Component);

  function MonthView() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MonthView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MonthView)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "cellClick", function (e) {
      var month = e.target.innerHTML;
      if (_this.checkIfMonthDisabled(month)) return;
      month = months[(0, _dayjs.default)().locale()].findIndex(function (item) {
        return item.indexOf(month) > -1;
      });

      var date = _this.props.date.clone().month(month);

      _this.props.prevView(date);
    });

    _defineProperty(_assertThisInitialized(_this), "next", function () {
      var nextDate = _this.props.date.clone().add(1, 'years');

      if (_this.props.maxDate && nextDate.isAfter(_this.props.maxDate, 'day')) {
        nextDate = _this.props.maxDate;
      }

      _this.props.setInternalDate(nextDate);
    });

    _defineProperty(_assertThisInitialized(_this), "prev", function () {
      var prevDate = _this.props.date.clone().subtract(1, 'years');

      if (_this.props.minDate && prevDate.isBefore(_this.props.minDate, 'day')) {
        prevDate = _this.props.minDate;
      }

      _this.props.setInternalDate(prevDate);
    });

    return _this;
  }

  _createClass(MonthView, [{
    key: "getMonth",
    value: function getMonth() {
      var _this2 = this;

      var month = this.props.date.month();
      return months[(0, _dayjs.default)().locale()].map(function (item, i) {
        return {
          label: item.slice(0, 3),
          disabled: _this2.checkIfMonthDisabled(i),
          curr: i === month
        };
      });
    }
  }, {
    key: "checkIfMonthDisabled",
    value: function checkIfMonthDisabled(month) {
      var now = this.props.date;
      return now.clone().month(month).endOf('month').isBefore(this.props.minDate, 'day') || now.clone().month(month).startOf('month').isAfter(this.props.maxDate, 'day');
    }
  }, {
    key: "render",
    value: function render() {
      var currentDate = this.props.date.format('YYYY');
      var months = this.getMonth().map(function (item, i) {
        return _react.default.createElement(_cell.default, {
          cls: (0, _classnames.default)({
            month: true,
            disabled: item.disabled,
            current: item.curr
          }),
          key: i,
          value: item.label
        });
      });
      return _react.default.createElement("div", {
        className: "months-view"
      }, _react.default.createElement(_viewHeader.default, {
        data: currentDate,
        next: this.next,
        prev: this.prev,
        titleAction: this.props.nextView
      }), _react.default.createElement("div", {
        className: "months",
        onClick: this.cellClick
      }, months));
    }
  }]);

  return MonthView;
}(_react.default.Component);

exports.default = MonthView;

_defineProperty(MonthView, "propTypes", {
  date: _propTypes.default.object.isRequired,
  minDate: _propTypes.default.any,
  maxDate: _propTypes.default.any,
  setInternalDate: _propTypes.default.func
});