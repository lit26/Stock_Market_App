import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';
import Chart from '../chart/Chart';

import { TypeChooser } from "react-stockcharts/lib/helper";

function ChartDisplay() {
    const ticker = useSelector(state => state.ticker);
    const interval = useSelector(state => state.interval);
    const period = useSelector(state => state.period);
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        setTimeout(function () {
            if (ticker != '') {
                let request = { "tickers": [ticker], 
                                "interval": interval,
                                "period":period,
                                "market": "history", 
                                "data_format": "v2" }
                axios.post('/api/', request)
                    .then(res => {
                        let resdata = res.data.data;
                        let data = [];
                        for (let i = 0; i < resdata.length; i++) {
                            data.push({
                                "date": new Date(resdata[i]["Date"]),
                                "open": resdata[i]["Open"],
                                "high": resdata[i]["High"],
                                "low": resdata[i]["Low"],
                                "close": resdata[i]["Close"],
                                "volume": resdata[i]['Volume']
                            })
                        }
                        setData(data)
                        setLoad(false)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }

        }, 500);
    }, [ticker, interval, period])

    return (
        <div className="ChartDisplay">
            {load ?
                <div>Loading...</div>
                :
                <TypeChooser>
                    {type => <Chart type={type} data={data} />}
                </TypeChooser>
            }
        </div>
    )
}

export default ChartDisplay
