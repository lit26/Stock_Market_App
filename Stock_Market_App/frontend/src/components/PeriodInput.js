import React, { useState, useEffect } from 'react';
import { Dropdown } from "react-bootstrap"
import {setPeriod} from '../redux/action';
import {useSelector, useDispatch} from 'react-redux'

import {available_list, dropdown_list} from './availability'

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
