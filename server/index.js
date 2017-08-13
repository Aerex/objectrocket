var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.json({extended: true, limit: '5mb'}));

const PORT = process.env.PORT || 3000;

const SHOP_CONTEXT = '/shop';
var router = express.Router();

app.use('/public', express.static(path.join(__dirname, '../public')));


console.log('PORT ', PORT);
var routes = require('./routes');


router.put('/add/:code', routes.add);
router.get('/basket', routes.basket);
router.delete('/clear', routes.clear);

app.use(SHOP_CONTEXT + '/api', router);

app.listen(PORT, function() {
	console.log('Running Application');
})