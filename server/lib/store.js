const db = require('./db');
const constant = require('./constants');
const _ = require('lodash');

var Store = function() {

	this.currentBasket = {total : 0, items: []};

	this._computeTotal = function() {
		let total = 0;
		let currentBasket = this.currentBasket;
		let self = this;

		currentBasket.items.forEach(function(item){
			let price = item.price;

			if(price[0] == '-'){
				total-=parseFloat(price.substring(2));
			} else {
				total+=parseFloat(price.substring(1));
			}
		});

		currentBasket.total = '$'+total.toFixed(2);

	};

	this.setSpecials = function(_specials) {
		this.specials = _specials;
	};

	this.addItem = function(code) {
		let currentBasket = this.currentBasket;
		let validCodes = Object.keys(db);
		if(!_.includes(validCodes, code)){
			return {
				errorMessage: constant.INVALID_CODE,
				status : constant.FAIL
			}
		}

		currentBasket.items.push({code: code, special: '', price: db[code]});

		return {
			errorMessage : '',
			status: constant.PASS
		}

	};

	this.basket = function() {
			let currentBasket = this.currentBasket;
			let specials = this.specials || [];

			let actions = Object.keys(specials);

			actions.forEach(function(action){
				specials[action](currentBasket);
			});

			this._computeTotal();

			return currentBasket;
	};

	this.clear = function() {
		this.currentBasket = {total: 0, items: []};
	}
};


module.exports = new Store();

