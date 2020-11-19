import React, {useState, useEffect} from 'react'
import axios from 'axios'
import MarketRow from './MarketRow'
import {useDispatch} from 'react-redux'
import {setTicker} from '../redux/action';

function Market() {
    const [row, setRow] = useState([]);
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
                        "market": "current"}
        axios.post('/api/', request)
            .then(res => {
                let tickers = res.data.metadata.tickers
                let tickerRows = tickers.map((ticker, index)=>
                    <MarketRow 
                        key={index}
                        ticker={ticker}
                        price={res.data.data[ticker].market}
                        chg={res.data.data[ticker].chg}
                        pct={res.data.data[ticker].pct}
                    />
                    
                )
                setRow(tickerRows)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className="Market">
            <table>
                <thead className="Market__header">
                    <tr>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>Chg</th>
                        <th>Pct</th>
                    </tr>
                </thead>
                <tbody className="Market__main">
                    {row}
                </tbody>
            </table>
        </div>
    )
}

export default Market
