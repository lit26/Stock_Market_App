import { tsvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";
import axios from 'axios'

function parseData(parse) {
	return function(d) {
		d.date = parse(d.date);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;

		return d;
	};
}

export function getData() {
	// let request = {"ticker": "TSLA"}
    // axios.post('/api/', request)
	const tickerData = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv")
		.then(response => response.text())
		.then(data => tsvParse(data, parseData(timeParse("%Y-%m-%d"))))
	return tickerData;
}
