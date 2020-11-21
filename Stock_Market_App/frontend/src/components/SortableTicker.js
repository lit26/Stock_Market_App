import React, { Component } from 'react';
import { sortableContainer, sortableHandle,sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import MarketRow from './MarketRow'

const SortableItem = sortableElement(({ value }) => {
    return (
        <MarketRow
            ticker={value.ticker}
            price={value.market}
            chg={value.chg}
            pct={value.pct}
        />
    )
});

const SortableContainer = sortableContainer(({ children }) => {
    return <tbody className="Market__main">{children}</tbody>;
});

class SortableTicker extends Component {
    state = {
        tickers: this.props.tickers,
        data: this.props.data
    };

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ tickers }) => ({
            tickers: arrayMove(tickers, oldIndex, newIndex),
        }));
    };

    render() {
        const { tickers, data } = this.state;
        localStorage.setItem("tickers", JSON.stringify(tickers));
        let tickersData = []
        for (let i = 0; i < tickers.length; i++) {
            let tickerData = data[tickers[i]];
            tickerData['ticker'] = tickers[i];
            tickersData.push(tickerData);
        }
        return (
            <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
                {tickersData.map((value, index) => (
                    <SortableItem key={`item-${value.ticker}`} index={index} value={value} />
                ))}
            </SortableContainer>
        );
    }
}

export default SortableTicker