import React from 'react'
import Market from '../components/Market'
import ChartMenu from '../components/ChartMenu'
import FundamentView from '../components/FundamentView'

function Chartpage() {
    return (
        <div className="Layout">
            <div className="Layout__left">
                <ChartMenu timeframe={false}/>
                <FundamentView />
            </div>
            <div className="Layout__right">
                <Market />
            </div>
        </div>
    )
}

export default Chartpage
