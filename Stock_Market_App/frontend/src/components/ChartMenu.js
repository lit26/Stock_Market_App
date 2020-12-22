import React from 'react'
import TickerInput from './TickerInput'
import IntervalInput from './IntervalInput'
import PeriodInput from './PeriodInput'
import MenuInput from './MenuInput'
import './ChartMenu.css'
import './Dropdown.css'

function ChartMenu({timeframe}) {
    return (
        <div className="ChartMenu">
            <div><MenuInput /></div>
            <div><TickerInput /></div>
            {timeframe &&
            <>
                <div><IntervalInput /></div>
                <div><PeriodInput /></div>
            </>
            }
            
        </div>
    )
}

export default ChartMenu
