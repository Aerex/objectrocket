const assert = require('chai').assert;
const Store = require('../server/lib/store');
const Specials = require('../server/lib/specials');

describe('#addItem', function() {
	it('should add an item successfully', function() {
		let code = 'CH1';
		let expectedMessage = {errorMessage : '', status : 'PASS'};
		let actualMessage = Store.addItem(code);

		assert.deepEqual(actualMessage, expectedMessage);
	});

	it('should fail with invalid item', function() {
		let invalidCode = 'XXX';
		let expectedMessage = {errorMessage: 'INVALID_CODE', status: 'FAIL'};
		let actualMessage = Store.addItem(invalidCode);

		assert.deepEqual(actualMessage, expectedMessage);
	});
});

describe('#checkout/add', function() {
	before(function() {
		Store.setSpecials(Specials);
	});
	beforeEach(function () {
		Store.clear();
	});
	describe('#BOGO - special', function () {

		it('should apply special once 2 coffee', function () {
			let code = 'CF1';

			for (let i = 0; i < 2; i++) {
				Store.addItem(code);
			}

			let items = [
				{code: 'CF1', special: '', price: '$11.23'},
				{code: 'CF1', special: 'BOGO', price: '$0'}
			];

			let expectedMessage = {total: '$11.23', items: items};
			let actualMessage = Store.basket();

			assert.deepEqual(actualMessage, expectedMessage);

		});

		it('should apply special twice if 4 coffee', function () {
			let code = 'CF1';

			for (let i = 0; i < 4; i++) {
				Store.addItem(code);
			}

			let items = [
				{code: 'CF1', special: '', price: '$11.23'},
				{code: 'CF1', special: 'BOGO', price: '$0'},
				{code: 'CF1', special: '', price: '$11.23'},
				{code: 'CF1', special: 'BOGO', price: '$0'}
			];

			let expectedMessage = {total: '$22.46', items: items};
			let actualMessage = Store.basket();

			assert.deepEqual(actualMessage, expectedMessage);
		});

		it('should not apply special if one', function () {
			let code = 'CF1';

			Store.addItem(code);

			let items = [
				{code: 'CF1', special: '', price: '$11.23'},
			];

			let actualMessage = Store.basket();
			let expectedMessage = {total: '$11.23', items: items};

			assert.deepEqual(actualMessage, expectedMessage);
		});

	});

	describe('#APPL - special', function() {
		before(function() {
			Store.setSpecials(Specials);
		});

		it('should apply special once 3+ apples', function () {
			let code = 'AP1';

			for (let i = 0; i < 3; i++) {
				Store.addItem(code);
			}

			let items = [
				{code: 'AP1', special: '', price: '$6.00'},
				{code: '', special: 'APPL', price: '-$1.50'},
				{code: 'AP1', special: '', price: '$6.00'},
				{code: '', special: 'APPL', price: '-$1.50'},
				{code: 'AP1', special: '', price: '$6.00'},
				{code: '', special: 'APPL', price: '-$1.50'}

			];


			let expectedMessage = {total: '$13.50', items: items};
			let actualMessage = Store.basket();

			assert.deepEqual(actualMessage, expectedMessage);

		});

		it('should not apply special if less than 3 apples', function () {
			let code = 'AP1';

			for(let i = 0; i < 2; i++){
				Store.addItem(code);
			}

			let items = [
				{code: 'AP1', special: '', price: '$6.00'},
				{code: 'AP1', special: '', price: '$6.00'}
			];

			let expectedMessage = Store.basket();
			let actualMessage = {total: '$12.00', items: items};

			assert.deepEqual(expectedMessage, actualMessage);
		});

	});

	describe('#CHMK - special', function() {
		before(function() {
			Store.setSpecials(Specials);
		});

		it('should apply special once', function () {
			let code = 'CH1';

			Store.addItem('CH1');
			Store.addItem('MK1');
			Store.addItem('CH1');

			let items = [
				{code: 'CH1', special: '', price: '$3.11'},
				{code: 'MK1', special: 'CHMK', price: '$0'},
				{code: 'CH1', special: '', price: '$3.11'}

			];


			let expectedMessage = {total: '$6.22', items: items};
			let actualMessage = Store.basket();

			assert.deepEqual(actualMessage, expectedMessage);

		});

		it('should not apply special', function () {
			let code = 'CH1';

			for(let i = 0; i < 3 ; i++){
				Store.addItem(code);
			}

			let items = [
				{code: 'CH1', special: '', price: '$3.11'},
				{code: 'CH1', special: '', price: '$3.11'},
				{code: 'CH1', special: '', price: '$3.11'}
			];

			let expectedMessage = Store.basket();
			let actualMessage = {total: '$9.33', items: items};

			assert.deepEqual(actualMessage, expectedMessage);
		});
	});

	describe('#APOM - special', function() {
		before(function() {
			Store.setSpecials(Specials);
		});

		it('should apply special once if 1 apple and 1 oat', function () {

			Store.addItem('OM1');
			Store.addItem('AP1');

			let items = [
				{code: 'OM1', special: '', price: '$3.69'},
				{code: 'AP1', special: '', price: '$6.00'},
				{code: '', special: 'APOM', price: '-$3.00'},

			];


			let expectedMessage = {total: '$6.69', items: items};
			let actualMessage = Store.basket();

			assert.deepEqual(actualMessage, expectedMessage);

		});

		it('should apply special once if 2 apples and 1 oat', function () {

			Store.addItem('AP1');
			Store.addItem('OM1');
			Store.addItem('AP1');

			let items = [
				{code: 'AP1', special: '', price: '$6.00'},
				{code: '', special: 'APOM', price: '-$3.00'},
				{code: 'OM1', special: '', price: '$3.69'},
				{code: 'AP1', special: '', price: '$6.00'},
			];


			let expectedMessage = Store.basket();
			let actualMessage = {total: '$12.69', items: items};

			assert.deepEqual(actualMessage, expectedMessage);
		});
	});
});

