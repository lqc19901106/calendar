"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _dayjs = _interopRequireDefault(require("dayjs"));

require("dayjs/locale/zh-cn");

var _dayView = _interopRequireDefault(require("./day-view"));

var _monthView = _interopRequireDefault(require("./month-view"));

var _yearView = _interopRequireDefault(require("./year-view"));

var _util = _interopRequireDefault(require("./util"));

var _icon = _interopRequireDefault(require("./icon"));

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

var InputCalendar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InputCalendar, _React$Component);

  function InputCalendar(props, context) {
    var _this;

    _classCallCheck(this, InputCalendar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InputCalendar).call(this, props, context));

    _defineProperty(_assertThisInitialized(_this), "setInputDate", function (date) {
      var isDayView = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (_this.checkIfDateDisabled(date)) return;

      _this.setState({
        date: date,
        inputValue: date.format(_this.state.format),
        isVisible: _this.props.closeOnSelect && isDayView ? !_this.state.isVisible : _this.state.isVisible
      });

      if (_this.props.onChange) {
        _this.props.onChange(date.format(_this.state.computableFormat));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setInternalDate", function (date) {
      var isDayView = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (_this.checkIfDateDisabled(date)) return;

      _this.setState({
        date: date
      });
    });

    _defineProperty(_assertThisInitialized(_this), "calendarClick", function () {
      _this.setState({
        isCalendar: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "changeDate", function (e) {
      //eslint-disable-line
      var value = e.target.value;

      if (_this.props.onInputChange) {
        value = _this.props.onInputChange(e);
      }

      _this.setState({
        inputValue: value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "documentClick", function (e) {
      if (!_this.state.isCalendar) {
        _this.setVisibility(false);
      }

      _this.setState({
        isCalendar: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "keyDown", function (e) {
      _util.default.keyDownActions.call(_assertThisInitialized(_this), e.keyCode);
    });

    _defineProperty(_assertThisInitialized(_this), "nextView", function () {
      if (_this.checkIfDateDisabled(_this.state.date)) return;

      _this.setState({
        currentView: _this.state.currentView + 1
      });
    });

    _defineProperty(_assertThisInitialized(_this), "prevView", function (date) {
      var newDate = date;

      if (_this.state.minDate && date.isBefore(_this.state.minDate, 'day')) {
        newDate = _this.state.minDate.clone();
      }

      if (_this.state.maxDate && date.isAfter(_this.state.maxDate, 'day')) {
        newDate = _this.state.maxDate.clone();
      }

      if (_this.state.currentView === _this.state.minView) {
        _this.setState({
          date: newDate,
          inputValue: date.format(_this.state.format),
          isVisible: false
        });

        if (_this.props.onChange) {
          _this.props.onChange(date.format(_this.state.computableFormat));
        }
      } else {
        _this.setState({
          date: date,
          currentView: _this.state.currentView - 1
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "todayClick", function () {
      var isDayView = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var today = (0, _dayjs.default)().startOf('day');
      if (_this.checkIfDateDisabled(today)) return;

      _this.setState({
        date: today,
        inputValue: today.format(_this.state.format),
        currentView: _this.state.minView,
        isVisible: _this.props.closeOnSelect && isDayView ? !_this.state.isVisible : _this.state.isVisible
      });

      if (_this.props.onChange) {
        _this.props.onChange(today.format(_this.state.computableFormat));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "toggleClick", function () {
      _this.setState({
        isCalendar: true
      });

      _this.setVisibility();
    });

    _dayjs.default.locale(_this.props.locale || 'zh-cn');

    var format = props.format || 'MM-DD-YYYY';
    var computableFormat = props.computableFormat || 'MM-DD-YYYY';
    var strictDateParsing = props.strictDateParsing || false;
    var parsingFormat = props.parsingFormat || format;

    var _date = props.date ? (0, _dayjs.default)(props.date, parsingFormat) : null;

    var minDate = props.minDate ? (0, _dayjs.default)(props.minDate, parsingFormat) : null;
    var maxDate = props.maxDate ? (0, _dayjs.default)(props.maxDate, parsingFormat) : null;
    var minView = parseInt(props.minView, 10) || 0;
    var defaultView = parseInt(props.defaultView, 10) || 0;
    var displayYrWithMonth = props.displayYrWithMonth || false;
    var currentView = defaultView < minView ? minView : defaultView;
    var keyboardDisabled = props.keyboardDisabled;
    _this.state = {
      date: _date,
      minDate: minDate,
      maxDate: maxDate,
      format: format,
      computableFormat: computableFormat,
      inputValue: _date ? _date.format(format) : undefined,
      views: ['days', 'months', 'years'],
      minView: minView,
      currentView: currentView,
      isVisible: false,
      strictDateParsing: strictDateParsing,
      parsingFormat: parsingFormat,
      keyboardDisabled: keyboardDisabled,
      displayYrWithMonth: displayYrWithMonth
    };
    return _this;
  }

  _createClass(InputCalendar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('click', this.documentClick);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var newState = {
        date: nextProps.date ? (0, _dayjs.default)(nextProps.date, this.state.parsingFormat) : this.state.date,
        inputValue: nextProps.date ? (0, _dayjs.default)(nextProps.date, this.state.parsingFormat).format(this.state.format) : null,
        minDate: nextProps.minDate ? (0, _dayjs.default)(nextProps.minDate, this.state.parsingFormat) : null,
        maxDate: nextProps.maxDate ? (0, _dayjs.default)(nextProps.maxDate, this.state.parsingFormat) : null
      };

      if (nextProps.disabled === true) {
        newState.isVisible = false;
      }

      this.setState(newState);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.documentClick);
    }
  }, {
    key: "setVisibility",
    value: function setVisibility(val) {
      var value = val !== undefined ? val : !this.state.isVisible;
      var eventMethod = value ? 'addEventListener' : 'removeEventListener';
      !this.state.keyboardDisabled && document[eventMethod]('keydown', this.keyDown);

      if (this.state.isVisible !== value && !this.props.disabled) {
        this.setState({
          isVisible: value
        });
      }
    }
  }, {
    key: "checkIfDateDisabled",
    value: function checkIfDateDisabled(date) {
      return date && this.state.minDate && date.isBefore(this.state.minDate, 'day') || date && this.state.maxDate && date.isAfter(this.state.maxDate, 'day');
    }
  }, {
    key: "getView",
    value: function getView() {
      var calendarDate = this.state.date || (0, _dayjs.default)();
      var _this$state = this.state,
          maxDate = _this$state.maxDate,
          minDate = _this$state.minDate,
          displayYrWithMonth = _this$state.displayYrWithMonth;
      var props = {
        date: calendarDate,
        nextView: this.nextView,
        setInputDate: this.setInputDate,
        setInternalDate: this.setInternalDate,
        prevView: this.prevView,
        maxDate: maxDate,
        minDate: minDate,
        displayYrWithMonth: displayYrWithMonth
      };

      switch (this.state.currentView) {
        case 0:
          return _react.default.createElement(_dayView.default, props);

        case 1:
          return _react.default.createElement(_monthView.default, props);

        case 2:
          return _react.default.createElement(_yearView.default, props);

        default:
          return _react.default.createElement(_dayView.default, props);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // its ok for this.state.date to be null, but we should never
      // pass null for the date into the calendar pop up, as we want
      // it to just start on todays date if there is no date set
      var view = this.getView();
      var todayText = this.props.todayText || (_dayjs.default.locale() === 'en' ? 'Today' : '今天');
      var calendarClass = (0, _classnames.default)({
        'input-calendar-wrapper': true,
        'icon-hidden': this.props.hideIcon
      });
      var calendar = !this.state.isVisible || this.props.disabled ? '' : _react.default.createElement("div", {
        className: calendarClass,
        onClick: this.calendarClick
      }, view, !this.props.hideTodayButton && _react.default.createElement("span", {
        className: "today-btn".concat(this.checkIfDateDisabled((0, _dayjs.default)().startOf('day')) ? ' disabled' : ''),
        onClick: this.todayClick
      }, todayText));
      var calendarIcon = (0, _icon.default)(this.props, this.toggleClick);
      var inputClass = this.props.inputFieldClass || 'input-calendar-field';
      return _react.default.createElement("div", {
        className: "input-calendar"
      }, _react.default.createElement("input", {
        name: this.props.inputName,
        className: inputClass,
        id: this.props.inputFieldId,
        onClick: this.toggleClick,
        onChange: this.changeDate,
        placeholder: this.props.placeholder,
        readOnly: true,
        disabled: this.props.disabled,
        type: "text",
        ref: function ref(input) {
          _this2.dateInput = input;
        },
        value: this.state.inputValue || ''
      }), calendarIcon, calendar);
    }
  }]);

  return InputCalendar;
}(_react.default.Component);

InputCalendar.propTypes = {
  closeOnSelect: _propTypes.default.bool,
  computableFormat: _propTypes.default.string,
  strictDateParsing: _propTypes.default.bool,
  parsingFormat: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.string)]),
  date: _propTypes.default.any,
  minDate: _propTypes.default.any,
  maxDate: _propTypes.default.any,
  format: _propTypes.default.string,
  inputName: _propTypes.default.string,
  inputFieldId: _propTypes.default.string,
  inputFieldClass: _propTypes.default.string,
  minView: _propTypes.default.number,
  onBlur: _propTypes.default.func,
  hideOnBlur: _propTypes.default.bool,
  onChange: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  onInputKeyUp: _propTypes.default.func,
  onInputKeyDown: _propTypes.default.func,
  openOnInputFocus: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  hideTouchKeyboard: _propTypes.default.bool,
  hideIcon: _propTypes.default.bool,
  hideTodayButton: _propTypes.default.bool,
  customIcon: _propTypes.default.string,
  todayText: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  focused: _propTypes.default.bool,
  locale: _propTypes.default.string,
  keyboardDisabled: _propTypes.default.bool,
  onInputChange: _propTypes.default.func
};
var _default = InputCalendar;
exports.default = _default;