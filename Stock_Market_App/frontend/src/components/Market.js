import React, {useState} from 'react'

function Market() {
    const [ticker, setTicker] = useState([])

    return (
        <div className="Market">
            <table>
                <thead className="Market__header">
                    <tr>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>Chg</th>
                        <th>Pct</th>
                    </tr>
                </thead>
                <tbody className="Market__main">
                    <tr>
                        <td>SPY</td>
                        <td>$100</td>
                        <td>$4</td>
                        <td>1.00%</td>
                    </tr>
                    <tr>
                        <td>SPY</td>
                        <td>$100</td>
                        <td>$4</td>
                        <td>1.00%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Market
