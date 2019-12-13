import React from 'react'
import PropTypes from 'prop-types'
import cs from 'classnames'
import moment from 'dayjs';

import Cell from './cell'
import ViewHeader from './view-header'

export default class YearsView extends React.Component {
  static propTypes = {
    date: PropTypes.object,
    minDate: PropTypes.any,
    maxDate: PropTypes.any,
    changeView: PropTypes.func,
    setInternalDate: PropTypes.func
  }
  state = { years: [] }

  componentWillMount() {
    this.getYears()
  }

  componentWillReceiveProps() {
    this.getYears()
  }

  getYears() {
    const now = this.props.date
    const start = now.clone().subtract(5, 'year')
    const end = now.clone().add(6, 'year')
    const currYear = now.year()
    const inRange = this.rangeCheck(currYear)
    let items = []

    const { years } = this.state

    if (years.length > 0 && inRange) {
      return years
    }

    moment()
      .range(start, end)
      .by('years', year => {
        items.push({
          label: year.format('YYYY'),
          disabled: this.checkIfYearDisabled(year),
          curr: currYear === year.year()
        })
      })

    this.setState({ years: items })

    return items
  }

  cellClick = e => {
    const year = parseInt(e.target.innerHTML, 10)
    const date = this.props.date.clone().year(year)
    if (this.checkIfYearDisabled(date)) return
    this.props.prevView(date)
  }

  checkIfYearDisabled(year) {
    return (
      year
        .clone()
        .endOf('year')
        .isBefore(this.props.minDate, 'day') ||
      year
        .clone()
        .startOf('year')
        .isAfter(this.props.maxDate, 'day')
    )
  }

  next = () => {
    let nextDate = this.props.date.clone().add(10, 'years')
    if (this.props.maxDate && nextDate.isAfter(this.props.maxDate, 'day')) {
      nextDate = this.props.maxDate
    }
    this.props.setInternalDate(nextDate)
  }

  prev = () => {
    let prevDate = this.props.date.clone().subtract(10, 'years')
    if (this.props.minDate && prevDate.isBefore(this.props.minDate, 'day')) {
      prevDate = this.props.minDate
    }
    this.props.setInternalDate(prevDate)
  }

  rangeCheck = currYear => {
    const { years } = this.state
    if (years.length == 0) {
      return false
    }
    return years[0].label <= currYear && years[years.length - 1].label >= currYear
  }

  render() {
    const years = this.state.years
    const currYear = this.props.date.year()
    const yearsCells = years.map((item, i) => (
      <Cell
        value={item.label}
        classes={cs({
          year: true,
          disabled: item.disabled,
          current: item.label == currYear
        })}
        key={i}
      />
    ))
    const currentDate = [years[0].label, years[years.length - 1].label].join('-')

    return (
      <div className="years-view">
        <ViewHeader data={currentDate} next={this.next} prev={this.prev} />
        <div className="years" onClick={this.cellClick}>
          {yearsCells}
        </div>
      </div>
    )
  }
}
