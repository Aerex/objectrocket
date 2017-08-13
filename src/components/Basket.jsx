import React, {Component} from 'react';
import axios from 'axios';
import Table from './Table'

class Basket extends Component {
	constructor(props) {
		super(props);
		this.state = {
			code: '',
			data :{total : '$0', items: []}
		};

		this.handleAddItem = this.handleAddItem.bind(this);
		this.handleCodeChange = this.handleCodeChange.bind(this);
		this.handleBasketDisplay = this.handleBasketDisplay.bind(this);
		this.handleClear = this.handleClear.bind(this);
	}

	handleAddItem(e) {
		e.preventDefault();

		axios.put(`${this.props.context}/add/${this.state.code}`)
			.then(function (res) {
				console.log(JSON.stringify(res));
				if (res.data.status !== 'PASS') {
					console.error(`There was a problem ${res.errorMessage}`);
					alert(`There was a problem ${res.errorMessage}`);
				}
			})
			.catch(function (err) {
				console.error(err);
			});
	}

	handleCodeChange(e) {
		this.setState({code: e.target.value});
	}

	handleBasketDisplay(e){
		e.preventDefault();
		let self = this;

		axios.get(`${this.props.context}/basket`)
			.then(function (res) {
				self.setState({data: res.data});
			})
			.catch(function (err) {
				console.error(err);
			});
	}
	
	handleClear(e){
		e.preventDefault();
		axios.get(`${this.props.context}/basket`)
			.then(function (res) {
				console.log('clear');
			})
			.catch(function (err) {
				console.error(err);
			});
	}

	render() {
		return (
			<div>
				<h1>Checkout</h1>

				<div>
					<span className="label">Add Item</span>
					<input value={this.state.code} onChange={this.handleCodeChange} type="text" placeholder="Enter Code"/>
				  <span className="label">
					<button onClick={this.handleAddItem} type="button">Send</button>
				  </span>
					<span className="label">
						<button onClick={this.handleBasketDisplay} type="button">Basket</button>
				  	</span>
					<span className="label">
						<button onClick={this.handleClear} type="button">Clear Basket</button>
				  	</span>
				</div>

				<Table
					data={this.state.data}
				/>

				<span>Total Price: {this.state.data.total}</span>
			</div>
		)
	}
}
export default Basket;
