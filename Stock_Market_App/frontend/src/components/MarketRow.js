import React, {useEffect, useState} from 'react'

function MarketRow({ticker, price, chg, pct}) {
    const [color, setColor] = useState('rgb(209, 212, 220)');

    useEffect(() => {
        if (chg > 0) {
            setColor('green')
        } else if (chg < 0) {
            setColor('red')
        }
    }, [ticker])

    return (
        <tr>
            <td>{ticker}</td>
            <td>${price.toFixed(2)}</td>
            <td style={{ color: color }}>{chg.toFixed(2)}</td>
            <td style={{ color: color }}>{pct.toFixed(2)}%</td>
        </tr>
    )
}

export default MarketRow
