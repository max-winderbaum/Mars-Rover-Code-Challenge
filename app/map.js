define(function(require) {
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
	}

	Map.prototype.addRover = function(name, x, y) {
		if (this.isValidPosition(x, y)) {
			this._rovers[name] = {x: x, y: y};
			return true;
		} else {
			return false;
		}
	};

	Map.prototype.isValidPosition = function(x, y) {
		return isOnMap(x, y, this._x, this._y) &&
			!isColliding(x, y, this._rovers);
	};

	function isOnMap(x, y, width, height) {
		return x > 0 && y > 0 && x <= width && y <= height;
	}

	function isColliding(x, y, rovers) {
		for( var key in rovers ) {
			if (rovers.hasOwnProperty(key)) {
				if(x === rovers[key].x && y === rovers[key].y) {
					return true;
				}
			}
		}

		return false;
	}

	Map.prototype.moveRover = function(name, x, y) {
		if (this.isValidPosition(x, y)) {
			this._rovers[name] = {x: x, y: y};
			return true;
		} else {
			return false;
		}
	};

	return Map;
});