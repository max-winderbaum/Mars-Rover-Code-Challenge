var input = require('./input');
var output = require('./output');

input.getInput().then(function(data) {
	var map = data.map;
	var roverPlans = data.roverPlans;
	var rovers = [];

	roverPlans.forEach(function(roverPlan) {

		try {
			var rover = roverPlan.rover;
			var moves = roverPlan.moves;
			rovers.push(rover);

			var roverId = map.addRover(rover);

			moves.forEach(function(move) {
				map.moveRover(roverId, move);
			});

		} catch(error) {
			rovers.pop();
			console.log(error);
		}
	});

	console.log('-----   OUTPUT   -----');
	console.log(output(rovers));
	console.log('----------------------');
});