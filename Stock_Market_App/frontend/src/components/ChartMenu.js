import React from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import TickerInput from './TickerInput'
import IntervalInput from './IntervalInput'

function ChartMenu() {
    return (
        <div className="ChartMenu">
            <div className="ChartMenu__menu" >
                <MenuIcon/>
            </div>
            <div>
                <TickerInput />
            </div>
            <div>
                <IntervalInput />
            </div>
        </div>
    )
}

export default ChartMenu
