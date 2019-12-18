import React from 'react'
import PropTypes from 'prop-types'

import cs from 'classnames'
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import DaysView from './day-view'
import MonthsView from './month-view'
import YearsView from './year-view'
import Util from './util'
import getIcon from './icon'

class InputCalendar extends React.Component {
  constructor(props, context) {
    super(props, context)
    dayjs.locale(this.props.locale || 'zh-cn')

    const format = props.format || 'MM-DD-YYYY'
    const computableFormat = props.computableFormat || 'MM-DD-YYYY'
    const strictDateParsing = props.strictDateParsing || false
    const parsingFormat = props.parsingFormat || format
    const date = props.date ? dayjs(props.date, parsingFormat) : null
    const minDate = props.minDate ? dayjs(props.minDate, parsingFormat) : null
    const maxDate = props.maxDate ? dayjs(props.maxDate, parsingFormat) : null
    const minView = parseInt(props.minView, 10) || 0
    const defaultView = parseInt(props.defaultView, 10) || 0
    const displayYrWithMonth = props.displayYrWithMonth || false
    const currentView = defaultView < minView ? minView : defaultView
    const keyboardDisabled = props.keyboardDisabled

    this.state = {
      date,
      minDate,
      maxDate,
      format,
      computableFormat,
      inputValue: date ? date.format(format) : undefined,
      views: ['days', 'months', 'years'],
      minView,
      currentView,
      isVisible: false,
      strictDateParsing,
      parsingFormat,
      keyboardDisabled,
      displayYrWithMonth
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.documentClick);
  }

  componentWillReceiveProps(nextProps) {
    let newState = {
      date: nextProps.date ? dayjs(nextProps.date, this.state.parsingFormat) : this.state.date,
      inputValue: nextProps.date
        ? dayjs(nextProps.date, this.state.parsingFormat).format(this.state.format)
        : null,
      minDate: nextProps.minDate ? dayjs(nextProps.minDate, this.state.parsingFormat) : null,
      maxDate: nextProps.maxDate ? dayjs(nextProps.maxDate, this.state.parsingFormat) : null
    }

    if (nextProps.disabled === true) {
      newState.isVisible = false
    }

    this.setState(newState)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.documentClick)
  }

  setInputDate = (date, isDayView = false) => {
    if (this.checkIfDateDisabled(date)) return

    this.setState({
      date,
      inputValue: date.format(this.state.format),
      isVisible:
        this.props.closeOnSelect && isDayView ? !this.state.isVisible : this.state.isVisible
    })

    if (this.props.onChange) {
      this.props.onChange(date.format(this.state.computableFormat))
    }
  }

  setInternalDate = (date, isDayView = false) => {
    if (this.checkIfDateDisabled(date)) return

    this.setState({
      date
    })
  }

  setVisibility(val) {
    const value = val !== undefined ? val : !this.state.isVisible
    const eventMethod = value ? 'addEventListener' : 'removeEventListener'

    !this.state.keyboardDisabled && document[eventMethod]('keydown', this.keyDown)

    if (this.state.isVisible !== value && !this.props.disabled) {
      this.setState({ isVisible: value })
    }
  }

  calendarClick = () => {
    this.setState({ isCalendar: true })
  }

  changeDate = e => {
    //eslint-disable-line
    let value = e.target.value;

    if (this.props.onInputChange) {
      value = this.props.onInputChange(e);
    }

    this.setState({ inputValue: value })
  }

  checkIfDateDisabled(date) {
    return (
      (date && this.state.minDate && date.isBefore(this.state.minDate, 'day')) ||
      (date && this.state.maxDate && date.isAfter(this.state.maxDate, 'day'))
    )
  }

  documentClick = e => {
    if (!this.state.isCalendar) {
      this.setVisibility(false)
    }
    this.setState({ isCalendar: false })
  }

  keyDown = e => {
    Util.keyDownActions.call(this, e.keyCode)
  }

  nextView = () => {
    if (this.checkIfDateDisabled(this.state.date)) return
    this.setState({ currentView: this.state.currentView + 1})
  }

  prevView = date => {
    let newDate = date
    if (this.state.minDate && date.isBefore(this.state.minDate, 'day')) {
      newDate = this.state.minDate.clone()
    }

    if (this.state.maxDate && date.isAfter(this.state.maxDate, 'day')) {
      newDate = this.state.maxDate.clone()
    }

    if (this.state.currentView === this.state.minView) {
      this.setState({
        date: newDate,
        inputValue: date.format(this.state.format),
        isVisible: false
      })
      if (this.props.onChange) {
        this.props.onChange(date.format(this.state.computableFormat))
      }
    } else {
      this.setState({
        date,
        currentView: this.state.currentView - 1
      })
    }
  }

  todayClick = (isDayView = false) => {
    const today = dayjs().startOf('day')

    if (this.checkIfDateDisabled(today)) return

    this.setState({
      date: today,
      inputValue: today.format(this.state.format),
      currentView: this.state.minView,
      isVisible:
        this.props.closeOnSelect && isDayView ? !this.state.isVisible : this.state.isVisible
    })

    if (this.props.onChange) {
      this.props.onChange(today.format(this.state.computableFormat))
    }
  }

  toggleClick = () => {
    this.setState({ isCalendar: true })
    this.setVisibility()
  }

  getView() {
    const calendarDate = this.state.date || dayjs()
    const { maxDate, minDate, displayYrWithMonth } = this.state
    const props = {
      date: calendarDate,
      nextView: this.nextView,
      setInputDate: this.setInputDate,
      setInternalDate: this.setInternalDate,
      prevView: this.prevView,
      maxDate,
      minDate,
      displayYrWithMonth
    }

    switch (this.state.currentView) {
      case 0:
        return <DaysView {...props} />
      case 1:
        return <MonthsView {...props} />
      case 2:
        return <YearsView {...props} />
      default:
        return <DaysView {...props} />
    }
  }

  render() {
    // its ok for this.state.date to be null, but we should never
    // pass null for the date into the calendar pop up, as we want
    // it to just start on todays date if there is no date set
    const view = this.getView()
    const todayText = this.props.todayText || (dayjs.locale() === 'en' ? 'Today' : '今天')
    const calendarClass = cs({
      'input-calendar-wrapper': true,
      'icon-hidden': this.props.hideIcon
    })
    const calendar =
      !this.state.isVisible || this.props.disabled ? (
        ''
      ) : (
        <div className={calendarClass} onClick={this.calendarClick}>
          {view}
          {!this.props.hideTodayButton && (
            <span
              className={`today-btn${
                this.checkIfDateDisabled(dayjs().startOf('day')) ? ' disabled' : ''
              }`}
              onClick={this.todayClick}
            >
              {todayText}
            </span>
          )}
        </div>
      )
    const calendarIcon = getIcon(this.props, this.toggleClick)
    const inputClass = this.props.inputFieldClass || 'input-calendar-field'

    return (
      <div className="input-calendar">
        <input
          name={this.props.inputName}
          className={inputClass}
          id={this.props.inputFieldId}
          onClick={this.toggleClick}
          onChange={this.changeDate}
          placeholder={this.props.placeholder}
          readOnly={true}
          disabled={this.props.disabled}
          type="text"
          ref={input => { this.dateInput = input }}
          value={this.state.inputValue || ''}
        />
        {calendarIcon}
        {calendar}
      </div>
    )
  }
}

InputCalendar.propTypes = {
  closeOnSelect: PropTypes.bool,
  computableFormat: PropTypes.string,
  strictDateParsing: PropTypes.bool,
  parsingFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  date: PropTypes.any,
  minDate: PropTypes.any,
  maxDate: PropTypes.any,
  format: PropTypes.string,
  inputName: PropTypes.string,
  inputFieldId: PropTypes.string,
  inputFieldClass: PropTypes.string,
  minView: PropTypes.number,
  onBlur: PropTypes.func,
  hideOnBlur: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onInputKeyUp: PropTypes.func,
  onInputKeyDown: PropTypes.func,
  openOnInputFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  hideTouchKeyboard: PropTypes.bool,
  hideIcon: PropTypes.bool,
  hideTodayButton: PropTypes.bool,
  customIcon: PropTypes.string,
  todayText: PropTypes.string,
  disabled: PropTypes.bool,
  focused: PropTypes.bool,
  locale: PropTypes.string,
  keyboardDisabled: PropTypes.bool,
  onInputChange: PropTypes.func,
}

export default InputCalendar
