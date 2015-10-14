'use strict';

var input = require('./input');
var Map = require('./map');
var Rover = require('./rover');

describe('input', function() {
	it('processes a file', function() {

		var given = '5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM\n';
		var expected = {
			map: new Map(5, 5),
			roverPlans: [
				{
					rover: new Rover('north', 1, 2),
					moves: [
						'left', 'move', 'left', 'move', 'left', 'move', 'left', 'move',
						'move'
					]
				}, {
					rover: new Rover('east', 3, 3),
					moves: [
						'move', 'move', 'right', 'move', 'move', 'right', 'move', 'right',
						'right', 'move'
					]
				}
			]
		};
		input._processInput(given, thenTest);

		function thenTest(result) {
			expect(result).toEqual(expected);
		}
	});

	it('rejects the promise with invalid input', function() {
		var given = 'hello, this sure seems like bad input';

		expect(failProcessInput).toThrow();

		function failProcessInput() {
			input._processInput('given', thenTest);
		}

		function thenTest(data) {
			expect(false).toEqual(true);
		}
	});
});