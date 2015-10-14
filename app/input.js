/** An interface that slurps in a text input and turns it into a format we expect */

var fs = require('fs');
var Q = require('q');

var Map = require('./map');
var Rover = require('./rover');
var DIRECTIONS = require('./constants/directions');
var MOVES = require('./constants/moves');

/**
 * Process the input text file and reject on error
 * @returns {*|promise}
 */
function getInput() {
	var deferred = Q.defer();
	fs.readFile('./input.txt', 'utf8', function(error, data) {
		if(error) {
			console.log(error);
			deferred.reject();
		} else {
			try {
				processInput(data, deferred.resolve);
			} catch (error) {
				console.log('error processing input', error);
				deferred.reject();
			}
		}
	});

	return deferred.promise;
}

/**
 * Turn a string into a more useful set of rovers and a map
 * @param data The input string
 * @param callback Call with the processed input
 */
function processInput(data, callback) {
	var lines = data.trim().split('\n');
	var map = setupMap(lines.shift());
	var roverPlans = [];
	while(lines.length > 0) {
		roverPlans.push({
			rover: setupRover(lines.shift()),
			moves: setupMoves(lines.shift())
		});
	}

	callback({
		map: map,
		roverPlans: roverPlans
	});
}

function setupMap(line) {
	var widthHeight = line.split(' ');
	var width = parseInt(widthHeight[0], 10);
	var height = parseInt(widthHeight[1], 10);
	if (isNaN(width) || isNaN(height)) {
		throw new Error('invalid map')
	}
	return new Map(width, height);
}

function setupRover(initialPosition) {
 	var position = initialPosition.split(' ');

	var x = parseInt(position[0], 10);
	var y = parseInt(position[1], 10);
	var direction = DIRECTIONS.in[position[2]];

	if (isNaN(x) || isNaN(y) || typeof direction === 'undefined') {
		throw new Error('invalid rover');
	}
	return new Rover(direction, x, y);
}

function setupMoves(moves) {
	return moves.split('').map(function(move) {
		if (MOVES.in[move]) {
			return MOVES.in[move];
		} else {
			throw new Error('invalid move');
		}
	});
}

module.exports = {
	getInput: getInput,
	_processInput: processInput
};