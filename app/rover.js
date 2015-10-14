'use strict';

var directions = {
	north: {
		left: 'west',
		right: 'east',
		move: function() {
			this._y ++;
		}
	},
	south: {
		left: 'east',
		right: 'west',
		move: function() {
			this._y --;
		}
	},
	east: {
		left: 'north',
		right: 'south',
		move: function() {
			this._x ++;
		}
	},
	west: {
		left: 'south',
		right: 'north',
		move: function() {
			this._x --;
		}
	}
};

/**
 * A single mars rover
 * @param direction The direction object the rover is facing
 * @param x The x coordinate of the rover
 * @param y The y coordinate of the rover
 * @constructor
 */
function Rover(direction, x, y) {
	this._direction = direction;
	this._x = x;
	this._y = y;
}

Rover.prototype.turnLeft = function() {
	this._direction = directions[this._direction].left;
};

Rover.prototype.turnRight = function() {
	this._direction = directions[this._direction].right;
};

Rover.prototype.move = function() {
	directions[this._direction].move.call(this);
};

/**
 * Simulate a move and return the projected position
 * @returns {{x, y}}
 */
Rover.prototype.projectMove = function() {
	var x = this._x;
	var y = this._y;
	directions[this._direction].move.call(this);
	var projectedPosition = this.getPosition();
	this._x = x;
	this._y = y;
	return projectedPosition;
};

Rover.prototype.getDirection = function() {
	return this._direction;
};

Rover.prototype.getPosition = function() {
	return {
		x: this._x,
		y: this._y
	};
};

module.exports = Rover;