import React, {useState, useEffect} from 'react'
import axios from 'axios'
import MarketRow from './MarketRow'

function Market() {
    const [row, setRow] = useState([])

    useEffect(()=>{
        let request = {"tickers":["TSLA","NIO"]}
        axios.post('/api/multi/', request)
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
