import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {setTicker} from '../redux/action';

function MarketRow({ticker, price, chg, pct}) {
    const [color, setColor] = useState('rgb(209, 212, 220)');
    const dispatch = useDispatch();

    useEffect(() => {
        if (chg > 0) {
            setColor('green')
        } else if (chg < 0) {
            setColor('red')
        }
    }, [ticker])

    return (
        <tr onClick={() => dispatch(setTicker(ticker))} className="MarketRow">
            <td>{ticker}</td>
            <td>${price.toFixed(2)}</td>
            <td style={{ color: color }}>{chg.toFixed(2)}</td>
            <td style={{ color: color }}>{pct.toFixed(2)}%</td>
        </tr>
    )
}

export default MarketRow
