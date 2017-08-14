import React, {Component} from 'react';
import TableRow from './TableRow'

class Table extends Component {
	constructor(props){
		super(props);

	}
	render(){
		let rows = [];
		this.props.data.items.forEach(function(item, index){
			rows.push(<TableRow key={index} code={item.code} special={item.special} price={item.price}/>);
		});
		return (
			<table>
				<thead>
					<tr>
						<th>Item</th>
						<th>Special</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
				{rows}
				</tbody>
			</table>
		)
	}
}

export default Table;