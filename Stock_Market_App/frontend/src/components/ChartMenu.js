import React from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import TickerInput from './TickerInput'

function ChartMenu() {

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e)
    }
    return (
        <div className="ChartMenu" onSumbit={onSubmit}>
            <MenuIcon className="ChartMenu__menu" />
            <TickerInput />
        </div>
    )
}

export default ChartMenu
