import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import Chart from '../chart/Chart';

import { TypeChooser } from "react-stockcharts/lib/helper";
import { available_list } from "./availability"
import {setPeriod} from '../redux/action';
import './ChartDisplay.css'

function ChartDisplay() {
    const ticker = useSelector(state => state.ticker);
    const interval = useSelector(state => state.interval);
    const period = useSelector(state => state.period);
    const dispatch = useDispatch();
    const [timeformat, setTimeformat] = useState("")
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        setTimeout(function () {
            if (ticker != '') {
                let available_period = available_list[interval]
                if (!available_period.some(item => period === item)){
                    dispatch(setPeriod(available_period[available_period.length - 1]))
                }else{
                    let request = { "tickers": [ticker], 
                                    "interval": interval,
                                    "period":period,
                                    "market": "history", 
                                    "data_format": "v2" }
                    axios.post('/api/', request)
                        .then(res => {
                            let dateformat = res.data.metadata.quote[0]
                            if(dateformat == 'Date'){
                                setTimeformat("%Y-%m-%d");
                            }else{
                                setTimeformat("%Y-%m-%d %H:%M:%S");
                            }

                            let resdata = res.data.data;
                            let data = [];
                            for (let i = 0; i < resdata.length; i++) {
                                data.push({
                                    "date": new Date(resdata[i][dateformat]),
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
            }

        }, 500);
    }, [ticker, interval, period])

    return (
        <div className="ChartDisplay">
            {load ?
                <div>Loading...</div>
                :
                <TypeChooser>
                    {type => <Chart type={type} data={data} ticker={ticker} timeformat={timeformat}/>}
                </TypeChooser>
            }
        </div>
    )
}

export default ChartDisplay
