import React, { useState, useEffect } from 'react'
import SettingsIcon from '@material-ui/icons/Settings';
import { Modal, Button } from 'react-bootstrap'
import CloseIcon from '@material-ui/icons/Close';
import './Modal.css'

function TickerSetting() {
    const [show, setShow] = useState(false);
    const [tickers, setTickers] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        setTickers(JSON.parse(localStorage.getItem("tickers")))
    },[])

    const delHandler = (selectTicker) =>{
        console.log(tickers.filter(ticker => ticker != selectTicker))
        localStorage.setItem("tickers", JSON.stringify(tickers.filter(ticker => ticker != selectTicker)));
        location.reload();
    }

    return (
        <>
            <SettingsIcon onClick={handleShow} />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Ticker</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {tickers.map((ticker, index)=>{
                    return (
                        <div className="delRow">
                            <div>{ticker}</div>
                            <CloseIcon onClick={()=>delHandler(ticker)}/>
                        </div>
                    )
                })}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default TickerSetting
