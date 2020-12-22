import React from 'react'
import Market from '../components/Market'
import ChartMenu from '../components/ChartMenu'
import ChartDisplay from '../components/ChartDisplay'
import './Layout.css'

function Chartpage() {
    return (
        <div className="Layout">
            <div className="Layout__left">
                <ChartMenu timeframe={true}/>
                <ChartDisplay />
            </div>
            <div className="Layout__right">
                <Market />
            </div>
        </div>
    )
}

export default Chartpage
