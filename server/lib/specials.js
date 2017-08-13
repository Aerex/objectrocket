const _ = require('lodash');
const constants = require('./constants');

var _BOGO = function(basket) {
	if(_.isArray(basket.items)){
		let cloneItems = _.cloneDeep(basket.items);
		let boughtMK1 = false;

		for(let i = 0; i < cloneItems.length; i++){
			if(!boughtMK1 && cloneItems[i].code === constants.CF1){
				boughtMK1 = true;
			} else if(boughtMK1 && cloneItems[i].code === constants.CF1){
				boughtMK1 = false;
				basket.items[i].price = '$0';
				basket.items[i].special = constants.BOGO;

			}
		}
	}

	return basket;
};

var _APPL = function(basket){
		if(_.isArray(basket.items)){
			let cloneItems = _.cloneDeep(basket.items);
			let modCounter = 0;
			let threeOrMore = 0;
			let newItem = {};
			let atLeastThreeAPPL = false;
			let counter = 0;

			for(var i = 0; i < cloneItems.length; i++){
				if(cloneItems[i].code === constants.AP1){
					counter++;
				}

				if(counter >= 3){
					atLeastThreeAPPL = true;
					break;
				}
			}

			cloneItems = cloneItems.map(function(item, index){
				if(atLeastThreeAPPL && threeOrMore < 3 && item.code === constants.AP1 &&
						(!cloneItems[index+1] || (cloneItems[index+1] && cloneItems[index+1].special === ''))){
					threeOrMore++;
					newItem.code = '';
					newItem.special = constants.APPL;
					newItem.price = '-$1.50';
					basket.items.splice(index+1+modCounter, 0, newItem);
					modCounter++;
				}
			});
		}

		return basket;
};


var _CHMK = function(basket){
	if(_.isArray(basket.items)){
		let cloneItems = _.cloneDeep(basket.items);
		let milkInBasket = false;
		let chaiInBasket = false;
		let index = 0;

		for(let i = 0; i < cloneItems.length; i++){
			milkInBasket = cloneItems[i].code === constants.MK1 ? true : milkInBasket;
			chaiInBasket = cloneItems[i].code === constants.CH1 ?  true : chaiInBasket;

			if(cloneItems[i].code === constants.MK1){
				index = i;
			}

			if(milkInBasket && chaiInBasket){
				basket.items[index].special = constants.CHMK;
				basket.items[index].price = '$0';
				break;
			}
		}
	}

	return basket;
};

var _APOM = function(basket){
	if(_.isArray(basket.items)){
			let isThereAnOatmeal = false;
			let finishAddingSpecial = false;
			let cloneItems = _.cloneDeep(basket.items);
			for(let i = 0; i < cloneItems.length; i++){
				if(cloneItems[i].code === constants.OM1){
					isThereAnOatmeal = true;
					break;
				}
			}

			let newItem = {};

			cloneItems = cloneItems.map(function(item, index){
				if(!finishAddingSpecial  && isThereAnOatmeal && item.code === constants.AP1 &&
					(!cloneItems[index+1] || (cloneItems[index+1] && cloneItems[index+1].special === ''))){
					newItem.code = '';
					newItem.special = constants.APOM;
					newItem.price = '-$3.00';
					basket.items.splice(index+1, 0, newItem);
					finishAddingSpecial = true;
				}
			});
	}

	return basket;
};



module.exports = {
	BOGO : _BOGO,
	APPL : _APPL,
	CHMK: _CHMK,
	APOM: _APOM
};