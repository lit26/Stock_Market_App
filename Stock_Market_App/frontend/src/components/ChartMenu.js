import React from 'react'
import TickerInput from './TickerInput'
import IntervalInput from './IntervalInput'
import PeriodInput from './PeriodInput'
import MenuInput from './MenuInput'

function ChartMenu() {
    return (
        <div className="ChartMenu">
            <div><MenuInput /></div>
            <div><TickerInput /></div>
            <div><IntervalInput /></div>
            <div><PeriodInput /></div>
        </div>
    )
}

export default ChartMenu
