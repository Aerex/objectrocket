import React, {Component} from 'react';

class TableRow extends Component {
	constructor(props){
		super(props);

	}
	render(){
		return (
				<tr>
					<td>{this.props.code}</td>
					<td>{this.props.special}</td>
					<td>{this.props.price}</td>
				</tr>
				
		)
	}
}

export default TableRow;