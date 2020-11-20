import React,{useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setTicker} from '../redux/action';
import axios from 'axios';

function TickerInput() {
    const [inputText, setInputText] = useState("");
    const dispatch = useDispatch();
    const ticker = useSelector(state => state.ticker);

    const handleChange = (e) =>{
        setInputText(e.target.value)
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        if (!localStorage.getItem("tickers").includes(inputText)){
            let localTicker = JSON.parse(localStorage.getItem("tickers"));
            localTicker = [inputText, ...localTicker];
            let request = {"tickers": localTicker, 
                            "interval": "1d",
                            "period": "5d",
                            "market": "current"}
            axios.post('/api/', request)
                .then(res => {
                    localStorage.setItem("tickers", JSON.stringify(localTicker))
                    dispatch(setTicker(inputText));
                    location.reload();
                })
                .catch(err => {
                    alert("Stock Input Error")
                    console.log(err)
                })
        }else{
            dispatch(setTicker(inputText));
        }
        setInputText('')
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    value={inputText}
                    className="Tickerinput"
                    placeholder={ticker}
                    type="text"
                    onChange={handleChange}
                />
            </div>
            <button type="submit" style={{ display: 'none' }}>Submit</button>
        </form>
    )
}

export default TickerInput
