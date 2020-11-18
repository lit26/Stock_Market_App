import React, {useEffect} from 'react'
import {useSelector } from 'react-redux'
import CandlestickChart from '../chart/CandlestickChart'

function ChartDisplay() {
    const ticker = useSelector(state => state.ticker);
    const interval = useSelector(state => state.interval);
    

    useEffect(() =>{
        if(ticker != ""){
            console.log(ticker)
        }
    },[ticker, interval])

    return (
        <div className="ChartDisplay">
            <CandlestickChart/>
        </div>
    )
}

export default ChartDisplay
