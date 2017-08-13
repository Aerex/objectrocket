var Store = require('./lib/store');
var Specials = require('./lib/specials');

Store.setSpecials(Specials);

var _add = function(req, res) {
	
	let code = req.params.code;
	let message = Store.addItem(code);


	res.status(200).json(message);
};

var _basket = function(req, res){
		let message = Store.basket();
		res.status(200).json(message);
};

var _clear = function(req, res){
		Store.clear();
		res.status(200).send();
};


module.exports = {
	add : _add,
	basket : _basket,
	clear : _clear
}