import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

function FundamentView() {
    const [info, setInfo] = useState()

    const ticker = useSelector(state => state.ticker);

    useEffect(() => {
        if(ticker != ''){
            axios.get(`/api/fundament/${ticker}`)
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [ticker])

return (
    <div>
        <h1>TODO</h1>
    </div>
)
}

export default FundamentView
