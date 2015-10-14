'use strict';

var Rover = require('./rover');

describe('Rover', function() {
	it('inits with the correct values', function() {
		var rover = new Rover('north', 1, 2);
		expect(rover.getDirection()).toEqual('north');
		expect(rover.getPosition()).toEqual({x: 1, y: 2});
	});

	it('turns correctly', function() {
		var rover = new Rover('north', 1, 2);
		rover.turnRight();
		expect(rover.getDirection()).toEqual('east');
		rover.turnLeft();
		expect(rover.getDirection()).toEqual('north');
	});

	it('moves forward in the correct direction', function() {
		var rover = new Rover('south', 1, 2);
		rover.move();
		expect(rover.getPosition()).toEqual({x: 1, y: 1});
	});

	it('projects a move position without actually moving the rover', function() {
		var rover = new Rover('east', 1, 2);
		expect(rover.projectMove()).toEqual({x: 2, y: 2});
		expect(rover.getPosition()).toEqual({x: 1, y: 2});
	});
});
