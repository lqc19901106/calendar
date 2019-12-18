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

var DayView =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DayView, _React$Component);

  function DayView() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DayView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DayView)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "cellClick", function (e) {
      var cell = e.target;
      var date = parseInt(cell.innerHTML, 10);
      var newDate = _this.props.date ? _this.props.date.clone() : (0, _dayjs.default)();
      if (isNaN(date)) return;

      if (cell.className.indexOf('prev') > -1) {
        newDate.subtract(1, 'month');
      } else if (cell.className.indexOf('next') > -1) {
        newDate.add(1, 'month');
      }

      _this.props.setInputDate(newDate.date(date), true);
    });

    _defineProperty(_assertThisInitialized(_this), "next", function () {
      var nextDate = _this.props.date.clone().add(1, 'month');

      if (_this.props.maxDate && nextDate.isAfter(_this.props.maxDate, 'day')) {
        nextDate = _this.props.maxDate;
      }

      _this.props.setInternalDate(nextDate);
    });

    _defineProperty(_assertThisInitialized(_this), "prev", function () {
      var prevDate = _this.props.date.clone().subtract(1, 'month');

      if (_this.props.minDate && prevDate.isBefore(_this.props.minDate, 'day')) {
        prevDate = _this.props.minDate;
      }

      _this.props.setInternalDate(prevDate);
    });

    return _this;
  }

  _createClass(DayView, [{
    key: "getDays",
    value: function getDays() {
      var _this$props = this.props,
          minDate = _this$props.minDate,
          maxDate = _this$props.maxDate,
          date = _this$props.date;
      var now = date ? date : (0, _dayjs.default)();
      var start = now.clone().startOf('month').day(0);
      var end = now.clone().endOf('month').day(6);
      var month = now.month();
      var today = (0, _dayjs.default)();
      var currDay = now.date();
      var year = now.year();
      var days = [];
      var diff = new Array(Math.ceil(end.diff(start, 'day', true)));

      for (var index = 0; index < diff.length; index++) {
        var day = start.add(index, 'day');
        days.push({
          label: day.format('D'),
          prev: day.month() < month && !(day.year() > year) || day.year() < year,
          next: day.month() > month || day.year() > year,
          disabled: day.isBefore(minDate, 'day') || day.isAfter(maxDate, 'day'),
          curr: day.date() === currDay && day.month() === month,
          today: day.date() === today.date() && day.month() === today.month() && day.year() === today.year()
        });
      }

      return days;
    }
  }, {
    key: "getDaysTitles",
    value: function getDaysTitles() {
      return [0, 1, 2, 3, 4, 5, 6].map(function (i) {
        return {
          label: (0, _dayjs.default)().day(i).format('dd')
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var titles = this.getDaysTitles().map(function (item, i) {
        return _react.default.createElement(_cell.default, {
          cls: "day title",
          key: i,
          value: item.label
        });
      });
      var days = this.getDays().map(function (item, i) {
        return _react.default.createElement(_cell.default, {
          cls: (0, _classnames.default)({
            day: true,
            next: item.next,
            prev: item.prev,
            disabled: item.disabled,
            current: item.curr,
            today: item.today
          }),
          key: i,
          value: item.label
        });
      });
      var format = this.props.displayYrWithMonth ? 'MMM YYYY' : 'MMMM';
      var currentDate = this.props.date ? this.props.date.format(format) : (0, _dayjs.default)().format(format);
      return _react.default.createElement("div", {
        className: "view days-view",
        onKeyDown: this.keyDown
      }, _react.default.createElement(_viewHeader.default, {
        data: currentDate,
        next: this.next,
        prev: this.prev,
        titleAction: this.props.nextView
      }), _react.default.createElement("div", {
        className: "days-title"
      }, titles), _react.default.createElement("div", {
        className: "days",
        onClick: this.cellClick
      }, days));
    }
  }]);

  return DayView;
}(_react.default.Component);

exports.default = DayView;

_defineProperty(DayView, "propTypes", {
  date: _propTypes.default.object.isRequired,
  minDate: _propTypes.default.any,
  maxDate: _propTypes.default.any,
  setInternalDate: _propTypes.default.func,
  setInputDate: _propTypes.default.func,
  nextView: _propTypes.default.func,
  displayYrWithMonth: _propTypes.default.bool
});