import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {setTicker} from '../redux/action';
import TickerSetting from './TickerSetting'
import SortableTicker from './SortableTicker'
import './Market.css'

function Market() {
    const [sortableTicker, setSortableTicker] = useState(null);
    const dispatch = useDispatch();


    useEffect(()=>{
        // load from storage
        let tickers = ["SPY","AAPL",'TSLA']
        if(localStorage.getItem("tickers") === null){
            localStorage.setItem("tickers", JSON.stringify(tickers));
            dispatch(setTicker("SPY"));
        }else{
            tickers = JSON.parse(localStorage.getItem("tickers"))
            dispatch(setTicker(tickers[0]));
        }

        // request from api
        let request = {"tickers": tickers,
                        "interval": "1d", 
                        "period": "5d",
                        "market": "current"}
        axios.post('/api/', request)
            .then(res => {
                let tickers = res.data.metadata.tickers
                setSortableTicker(<SortableTicker tickers={tickers} data={res.data.data}/>)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className="Market">
            <div className="Market__setting">
                <h2>Watchlist</h2>
                <TickerSetting />
            </div>
            <table>
                <thead className="Market__header">
                    <tr>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>Chg</th>
                        <th>Pct</th>
                        <td></td>
                    </tr>
                </thead>
                {sortableTicker} 
            </table>
        </div>
    )
}

export default Market
