import React from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import TickerInput from './TickerInput'

function ChartMenu() {
    return (
        <div className="ChartMenu">
            <MenuIcon className="ChartMenu__menu" />
            <TickerInput />
        </div>
    )
}

export default ChartMenu
