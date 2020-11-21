import React from 'react'
import Market from '../components/Market'
import ChartMenu from '../components/ChartMenu'

function Chartpage() {
    return (
        <div className="Layout">
            <div className="Layout__left">
                <ChartMenu timeframe={false}/>
            </div>
            <div className="Layout__right">
                <Market />
            </div>
        </div>
    )
}

export default Chartpage
