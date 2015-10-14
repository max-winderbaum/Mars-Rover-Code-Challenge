'use strict';

var Map = require('./map');
var Rover = require('./rover');

describe('Map', function() {
	it('inits correctly', function() {
		var map = new Map(1, 2);
		expect(map._x).toEqual(1);
		expect(map._y).toEqual(2);
	});

	it('validates a valid posistion', function() {
		var map = new Map(2, 2);
		expect(map._isValidPosition(2, 2)).toEqual(true);
	});

	it('invalidates a position that is off the map', function() {
		var map = new Map(2, 2);
		expect(map._isValidPosition(3, 2)).toEqual(false);
	});

	it('adds a rover', function() {
		var map = new Map(4, 4);
		var rover = new Rover('west', 2, 2);
		var roverId = map.addRover(rover);
		expect(map._rovers[roverId]).toEqual(rover);
	});

	it('invalidates a position that is colliding with another rover', function() {
		var map = new Map(2, 2);
		var rover = new Rover('east', 1, 1);
		map.addRover(rover);
		expect(map._isValidPosition(1, 1)).toEqual(false);
	});

	it('moves a rover', function() {
		var map = new Map(3, 3);
		var rover = new Rover('north', 1, 1);
		var roverId = map.addRover(rover);
		map.moveRover(roverId, 'move');
		expect(map._rovers[roverId].getPosition().y).toEqual(2);
	});

	it('rejects a misplaced rover', function() {
		var map = new Map(3, 3);
		var rover = new Rover('north', 5, 5);


		expect(addRover).toThrow();

		function addRover() {
			map.addRover(rover);
		}
	});

	it('rejects a colliding rover move', function() {
		var map = new Map(3, 3);
		map.addRover(new Rover('north', 1, 2));
		var roverId = map.addRover(new Rover('west', 2, 2));
		expect(moveRover).toThrow();

		function moveRover() {
			map.moveRover(roverId, 'move');
		}
	});

	it('rejects a rover move that goes off the map', function() {
		var map = new Map(3, 3);
		var roverId = map.addRover(new Rover('north', 3, 3));
		expect(moveRover).toThrow();

		function moveRover() {
			map.moveRover(roverId, 'move');
		}
	});
});