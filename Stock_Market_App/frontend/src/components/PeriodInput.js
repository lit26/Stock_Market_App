import React, { useState, useEffect } from 'react';
import { Dropdown } from "react-bootstrap"
import {setPeriod} from '../redux/action';
import {useSelector, useDispatch} from 'react-redux'

const available_list = {
    "1m": ['1d','5d'],
    "2m": ['1d','5d', '1mo'],
    "5m": ['1d','5d', '1mo'],
    "15m": ['1d','5d', '1mo'],
    "30m": ['1d','5d', '1mo'],
    "1h": ['1d','5d', '1mo', '3mo', '6mo', '1y', '2y'],
    "90m": ['1d','5d', '1mo'],
    "1d": ['5d', '1mo', '3mo', '6mo', '1y', '2y', '5y', '10y', 'ytd', 'max'],
    "5d": ['1mo', '3mo', '6mo', '1y', '2y', '5y', '10y', 'ytd', 'max'],
    "1wk": ['1mo', '3mo', '6mo', '1y', '2y', '5y', '10y', 'ytd', 'max'],
    "1mo": ['3mo', '6mo', '1y', '2y', '5y', '10y', 'ytd', 'max'],
    "3mo": ['3mo', '6mo', '1y', '2y', '5y', '10y', 'ytd', 'max']
}

const dropdown_list = {
    "1d": "1 day",
    "5d": "5 days",
    "1mo": "1 month",
    "3mo": "3 month",
    "6mo": "6 month",
    "1y": "1 year",
    "2y": "2 year",
    "5y": "5 year",
    "10y": "10 year",
    "ytd": "Year to Date",
    "max": "Max"
}

function PeriodInput() {
    const [periodInput, setPeriodInput] = useState('1y');
    const dispatch = useDispatch();
    const interval = useSelector(state => state.interval);
    const period = useSelector(state => state.period);
    const [periodlist, setPeriodList] = useState([]);

    const handleSelect=(e)=>{
        setPeriodInput(e)
        dispatch(setPeriod(e))
    }

    useEffect(()=>{
        let available_period = available_list[interval];
        setPeriodList(available_period)
        setPeriodInput(period)
    },[interval])

    return (
        <Dropdown className="Menu__dropdown" onSelect={handleSelect}>
            <Dropdown.Toggle variant="success" className="Menu__dropdownButton">
                {periodInput}
            </Dropdown.Toggle>

            <Dropdown.Menu className="Menu__dropdownItems">
                <div className="Menu__dropdownHeader">Period</div>
                {periodlist.map((period, index)=>{
                    return <Dropdown.Item key={index}eventKey={period}>{dropdown_list[period]}</Dropdown.Item>
                })}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default PeriodInput
