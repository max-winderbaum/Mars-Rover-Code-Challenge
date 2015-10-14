var DIRECTIONS = require('./constants/directions').out;

module.exports = function(rovers) {
	var output = '';

	rovers.forEach(function(rover) {
		var direction = rover.getDirection();
		var position = rover.getPosition();
		output += position.x + ' ' + position.y + ' ' + DIRECTIONS[direction] + '\n';
	});

	return output;
};