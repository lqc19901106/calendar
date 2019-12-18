import React from 'react'
import PropTypes from 'prop-types'

import cs from 'classnames'
import dayjs from 'dayjs';

import Cell from './cell'
import ViewHeader from './view-header'

export default class DayView extends React.Component {
  static propTypes = {
    date: PropTypes.object.isRequired,
    minDate: PropTypes.any,
    maxDate: PropTypes.any,
    setInternalDate: PropTypes.func,
    setInputDate: PropTypes.func,
    nextView: PropTypes.func,
    displayYrWithMonth: PropTypes.bool
  }

  getDays() {
    const { minDate, maxDate, date } = this.props
    const now = date ? date : dayjs()
    const start = now
      .clone()
      .startOf('month')
      .day(0)
    const end = now
      .clone()
      .endOf('month')
      .day(6)
    const month = now.month()
    const today = dayjs();
    const currDay = now.date();
    const year = now.year();
    let days = []

    const diff = new Array(Math.ceil(end.diff(start, 'day', true)));
    for (let index = 0; index < diff.length; index++) {
      const day= start.add(index, 'day');
      days.push({
        label: day.format('D'),
        prev: (day.month() < month && !(day.year() > year)) || day.year() < year,
        next: day.month() > month || day.year() > year,
        disabled: day.isBefore(minDate, 'day') || day.isAfter(maxDate, 'day'),
        curr: day.date() === currDay && day.month() === month,
        today:
          day.date() === today.date() &&
          day.month() === today.month() &&
          day.year() === today.year()
      })
    }
    return days
  }

  getDaysTitles() {
    return [0, 1, 2, 3, 4, 5, 6].map(i => ({
      label: dayjs()
        .day(i)
        .format('dd')
    }))
  }

  cellClick = e => {
    const cell = e.target
    const date = parseInt(cell.innerHTML, 10)
    const newDate = this.props.date ? this.props.date.clone() : dayjs()

    if (isNaN(date)) return

    if (cell.className.indexOf('prev') > -1) {
      newDate.subtract(1, 'month')
    } else if (cell.className.indexOf('next') > -1) {
      newDate.add(1, 'month')
    }

    this.props.setInputDate(newDate.date(date), true)
  }

  next = () => {
    let nextDate = this.props.date.clone().add(1, 'month')
    if (this.props.maxDate && nextDate.isAfter(this.props.maxDate, 'day')) {
      nextDate = this.props.maxDate
    }
    this.props.setInternalDate(nextDate)
  }

  prev = () => {
    let prevDate = this.props.date.clone().subtract(1, 'month')
    if (this.props.minDate && prevDate.isBefore(this.props.minDate, 'day')) {
      prevDate = this.props.minDate
    }
    this.props.setInternalDate(prevDate)
  }

  render() {
    const titles = this.getDaysTitles().map((item, i) => (
      <Cell cls="day title" key={i} value={item.label} />
    ))
    const days = this.getDays().map((item, i) => (
      <Cell
        cls={cs({
          day: true,
          next: item.next,
          prev: item.prev,
          disabled: item.disabled,
          current: item.curr,
          today: item.today
        })}
        key={i}
        value={item.label}
      />
    ))
    const format = this.props.displayYrWithMonth ? 'MMM YYYY' : 'MMMM';
    const currentDate = this.props.date ? this.props.date.format(format) : dayjs().format(format);

    return (
      <div className="view days-view" onKeyDown={this.keyDown}>
        <ViewHeader
          data={currentDate}
          next={this.next}
          prev={this.prev}
          titleAction={this.props.nextView}
        />
        <div className="days-title">{titles}</div>
        <div className="days" onClick={this.cellClick}>
          {days}
        </div>
      </div>
    )
  }
}
