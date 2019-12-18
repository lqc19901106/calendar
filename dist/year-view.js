"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

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

var YearsView =
/*#__PURE__*/
function (_React$Component) {
  _inherits(YearsView, _React$Component);

  function YearsView() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, YearsView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(YearsView)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      years: []
    });

    _defineProperty(_assertThisInitialized(_this), "cellClick", function (e) {
      var year = parseInt(e.target.innerHTML, 10);

      var date = _this.props.date.clone().year(year);

      if (_this.checkIfYearDisabled(date)) return;

      _this.props.prevView(date);
    });

    _defineProperty(_assertThisInitialized(_this), "next", function () {
      var nextDate = _this.props.date.clone().add(10, 'years');

      if (_this.props.maxDate && nextDate.isAfter(_this.props.maxDate, 'day')) {
        nextDate = _this.props.maxDate;
      }

      _this.props.setInternalDate(nextDate);
    });

    _defineProperty(_assertThisInitialized(_this), "prev", function () {
      var prevDate = _this.props.date.clone().subtract(10, 'years');

      if (_this.props.minDate && prevDate.isBefore(_this.props.minDate, 'day')) {
        prevDate = _this.props.minDate;
      }

      _this.props.setInternalDate(prevDate);
    });

    _defineProperty(_assertThisInitialized(_this), "rangeCheck", function (currYear) {
      var years = _this.state.years;

      if (years.length === 0) {
        return false;
      }

      return years[0].label <= currYear && years[years.length - 1].label >= currYear;
    });

    return _this;
  }

  _createClass(YearsView, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.getYears();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps() {
      this.getYears();
    }
  }, {
    key: "getYears",
    value: function getYears() {
      var now = this.props.date;
      var start = now.clone().subtract(5, 'year');
      var end = now.clone().add(6, 'year');
      var currYear = now.year();
      var inRange = this.rangeCheck(currYear);
      var items = [];
      var years = this.state.years;

      if (years.length > 0 && inRange) {
        return years;
      }

      var diff = new Array(Math.ceil(end.diff(start, 'year', true)));

      for (var index = 0; index < diff.length; index++) {
        var year = start.add(index, 'year');
        items.push({
          label: year.format('YYYY'),
          disabled: this.checkIfYearDisabled(year),
          curr: currYear === year.year()
        });
      }

      this.setState({
        years: items
      });
      return items;
    }
  }, {
    key: "checkIfYearDisabled",
    value: function checkIfYearDisabled(year) {
      return year.clone().endOf('year').isBefore(this.props.minDate, 'day') || year.clone().startOf('year').isAfter(this.props.maxDate, 'day');
    }
  }, {
    key: "render",
    value: function render() {
      var years = this.state.years;
      var currYear = this.props.date.year();
      var yearsCells = years.map(function (item, i) {
        return _react.default.createElement(_cell.default, {
          value: item.label,
          cls: (0, _classnames.default)({
            year: true,
            disabled: item.disabled,
            current: item.label === currYear
          }),
          key: i
        });
      });
      var currentDate = [years[0].label, years[years.length - 1].label].join('-');
      return _react.default.createElement("div", {
        className: "years-view"
      }, _react.default.createElement(_viewHeader.default, {
        data: currentDate,
        next: this.next,
        prev: this.prev
      }), _react.default.createElement("div", {
        className: "years",
        onClick: this.cellClick
      }, yearsCells));
    }
  }]);

  return YearsView;
}(_react.default.Component);

exports.default = YearsView;

_defineProperty(YearsView, "propTypes", {
  date: _propTypes.default.object,
  minDate: _propTypes.default.any,
  maxDate: _propTypes.default.any,
  changeView: _propTypes.default.func,
  setInternalDate: _propTypes.default.func
});