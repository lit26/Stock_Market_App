import React from 'react';
import { render } from 'react-dom';
import Chart from './Chart';
import { getData } from "./utils"

import { TypeChooser } from "react-stockcharts/lib/helper";
import axios from 'axios'  


class CandlestickChart extends React.Component {
	componentDidMount() {
		// getData().then(data => {
		// 	console.log(data)
		// 	this.setState({ data })
		// })
		setTimeout(function(){}, 5000); 
		let request = {"tickers": ["TSLA"], "market": "history","data_format":"v2"}
        axios.post('/api/', request)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
		
	}
	render() {
		if (this.state == null) {
			return <div>Loading...</div>
		}
		return (
			<TypeChooser>
				{type => <Chart type={type} data={this.state.data} />}
			</TypeChooser>
		)
	}
}
export default CandlestickChart
