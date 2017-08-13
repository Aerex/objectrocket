import React from 'react';
import ReactDOM from 'react-dom';
import Basket from './components/Basket'


ReactDOM.render(
	<div>
		<Basket
			context='/shop/api'
		/>
	</div>,
	document.getElementById('root')
);
