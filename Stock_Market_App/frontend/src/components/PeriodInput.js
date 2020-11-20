import React, { useState, useEffect } from 'react';
import { Dropdown } from "react-bootstrap"
import {setPeriod} from '../redux/action';
import {useSelector, useDispatch} from 'react-redux'

function PeriodInput() {
    const [period, setPeriodInput] = useState('1y');
    const dispatch = useDispatch();

    const handleSelect=(e)=>{
        setPeriodInput(e)
        dispatch(setPeriod(e))
    }

    return (
        <Dropdown className="Menu__dropdown" onSelect={handleSelect}>
            <Dropdown.Toggle variant="success" className="Menu__dropdownButton">
                <span>{period}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu className="Menu__dropdownItems">
                <div className="Menu__dropdownHeader">Period</div>
                <Dropdown.Item eventKey='1d'>1 day</Dropdown.Item>
                <Dropdown.Item eventKey='5d'>5 days</Dropdown.Item>
                <Dropdown.Item eventKey='1mo'>1 month</Dropdown.Item>
                <Dropdown.Item eventKey='3mo'>3 month</Dropdown.Item>
                <Dropdown.Item eventKey='1y'>1 year</Dropdown.Item>
                <Dropdown.Item eventKey='2y'>2 year</Dropdown.Item>
                <Dropdown.Item eventKey='5y'>5 year</Dropdown.Item>
                <Dropdown.Item eventKey='10y'>10 year</Dropdown.Item>
                <Dropdown.Item eventKey='ytd'>Year to Date</Dropdown.Item>
                <Dropdown.Item eventKey='max'>Max</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default PeriodInput
