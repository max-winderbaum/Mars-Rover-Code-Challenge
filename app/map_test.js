define(function(require) {
	'use strict';

	var Map = require('./map');

	describe('Map', function() {
		it('inits correctly', function() {
			var map = new Map(1, 2);
			expect(map._x).toEqual(1);
			expect(map._y).toEqual(2);
		});

		it('validates a valid posistion', function() {
			var map = new Map(2, 2);
			expect(map.isValidPosition(2, 2)).toEqual(true);
		});

		it('invalidates a position that is off the map', function() {
			var map = new Map(2, 2);
			expect(map.isValidPosition(3, 2)).toEqual(false);
		});

		it('adds a rover', function() {
			var map = new Map(4, 4);
			map.addRover('hal', 2, 2);
			expect(map._rovers.hal).toEqual({x: 2, y: 2});
		});

		it('invalidates a position that is colliding with another rover', function() {
			var map = new Map(2, 2);
			map.addRover('fred', 1, 1);
			expect(map.isValidPosition(1, 1)).toEqual(false);
		});

		it('moves a rover', function() {
			var map = new Map(3, 3);
			map.addRover('fred', 1, 1);
			map.moveRover('fred', 3, 1);
			expect(map._rovers.fred.x).toEqual(3);
		});

		it('rejects a misplaced rover', function() {
			var map = new Map(3, 3);
			expect(map.addRover('fred', 5, -2)).toEqual(false);
			expect(map._rovers.fred).toEqual(undefined);
		});

		it('rejects a colliding rover move', function() {
			var map = new Map(3, 3);
			map.addRover('jimmy', 2, 2);
			map.addRover('johnny', 1, 2);
			expect(map.moveRover('johnny', 2, 2)).toEqual(false);
			expect(map._rovers.johnny.x).toEqual(1);
		});
	});
});