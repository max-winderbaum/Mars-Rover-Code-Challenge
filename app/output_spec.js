'use strict';

var output = require('./output');
var Rover = require('./rover');

describe('output', function() {
	it('outputs correctly', function() {
		var rovers = [];
		rovers.push(new Rover('north', 1, 1));
		rovers.push(new Rover('east', 2, 2));
		expect(output(rovers)).toEqual('1 1 N\n2 2 E\n');
	});
});