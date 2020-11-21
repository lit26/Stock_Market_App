import React, { useState } from 'react';
import { Dropdown } from "react-bootstrap"
import {useDispatch} from 'react-redux'
import {setInterval} from '../redux/action';

function IntervalInput() {
    const [interval, setIntervalInput] = useState('1d');
    const dispatch = useDispatch();

    const handleSelect=(e)=>{
        setIntervalInput(e)
        dispatch(setInterval(e))
    }

    return (
        <Dropdown className="Menu__dropdown" onSelect={handleSelect}>
            <Dropdown.Toggle variant="success" className="Menu__dropdownButton">
                {interval}
            </Dropdown.Toggle>

            <Dropdown.Menu className="Menu__dropdownItems">
                <div className="Menu__dropdownHeader">Interval</div>
                <Dropdown.Item eventKey='1m'>1 minute</Dropdown.Item>
                <Dropdown.Item eventKey='2m'>2 minutes</Dropdown.Item>
                <Dropdown.Item eventKey='5m'>5 minutes</Dropdown.Item>
                <Dropdown.Item eventKey='15m'>15 minutes</Dropdown.Item>
                <Dropdown.Item eventKey='30m'>30 minutes</Dropdown.Item>
                <Dropdown.Item eventKey='60m'>1 hour</Dropdown.Item>
                <Dropdown.Item eventKey='90m'>1.5 hour</Dropdown.Item>
                <Dropdown.Item eventKey='1d'>1 day</Dropdown.Item>
                <Dropdown.Item eventKey='5d'>5 days</Dropdown.Item>
                <Dropdown.Item eventKey='1wk'>1 week</Dropdown.Item>
                <Dropdown.Item eventKey='1mo'>1 month</Dropdown.Item>
                <Dropdown.Item eventKey='3mo'>3 month</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default IntervalInput
