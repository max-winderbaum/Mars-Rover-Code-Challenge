'use strict';

/**
 * Keeps track of the bounds of the plateau as well as existing rovers
 *
 * @param x The height of the rectangle
 * @param y The width of the rectangle
 * @constructor
 */
function Map(x, y) {
	this._x = x;
	this._y = y;
	this._rovers = {};
	this._roverId = 0;
}

Map.prototype.addRover = function(rover) {
	var roverPosition = rover.getPosition();
	if(this._isValidPosition(roverPosition.x, roverPosition.y)) {
		var roverId = this._roverId++;
		this._rovers[roverId] = rover;
		return roverId;
	} else {
		throw new Error('placing rover in invalid space');
	}
};

/**
 * Checks a position against the boundaries of the map and other rovers
 * @param x
 * @param y
 * @param roverId The current rover id
 * @returns {*|boolean}
 * @private
 */
Map.prototype._isValidPosition = function(x, y, roverId) {
	return isOnMap(x, y, this._x, this._y) && ! isColliding(x, y, this._rovers, roverId);
};

function isOnMap(x, y, width, height) {
	return x >= 0 && y >= 0 && x <= width && y <= height;
}

function isColliding(x, y, rovers, roverId) {
	for(var key in rovers) {
		if(rovers.hasOwnProperty(key) && key !== roverId) {
			var roverPosition = rovers[key].getPosition();
			if(x === roverPosition.x && y === roverPosition.y) {
				return true;
			}
		}
	}

	return false;
}

Map.prototype.moveRover = function(roverId, action) {
	var rover = this._rovers[roverId];

	if (action === 'left') {
		rover.turnLeft();
	} else if (action === 'right') {
		rover.turnRight();
	} else if (action === 'move') {
		var projectedMove = rover.projectMove();
		if(this._isValidPosition(projectedMove.x, projectedMove.y, roverId)) {
			rover.move();
		} else {
			throw new Error('moving rover to an invalid space');
		}
	}
};

module.exports = Map;