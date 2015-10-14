# Mars Rover Code Challenge
### Quickstart
Node.js is the only global dependency for this project. Please install node > 12 with npm.

    npm install
    npm start --loglevel silent
### Testing
Spec files are located alongside the modules they're testing, and follow the naming convention *_spec.js.
To run tests and rerun when files change:

    npm test
### The Problem
A squad of robotic rovers are to be landed by NASA on a plateau on Mars.
This plateau, which is curiously rectangular, must be navigated by the rovers
so that their on-board cameras can get a complete view of the surrounding
terrain to send back to Earth. 

A rover's position and location is represented by a combination of x and y
co-ordinates and a letter representing one of the four cardinal compass points.
The plateau is divided up into a grid to simplify navigation. An example position
might be 0, 0, N, which means the rover is in the bottom left corner and facing North. 

In order to control a rover, NASA sends a simple string of letters. The possible
letters are 'L', 'R' and 'M'. 'L' and 'R' makes the rover spin 90 degrees left
or right respectively, without moving from its current spot. 'M' means move
forward one grid point, and maintain the same heading. 

Assume that the square directly North from (x, y) is (x, y+1). 

The first line of input is the upper-right coordinates of the plateau, the
lower-left coordinates are assumed to be 0,0. The rest of the input is information
pertaining to the rovers that have been deployed. Each rover has two lines of
input. The first line gives the rover's position, and the second line is a series
of instructions telling the rover how to explore the plateau. 

The position is made up of two integers and a letter separated by spaces,
corresponding to the x and y coordinates and the rover's orientation. 

Each rover will be finished sequentially, which means that the second rover
won't start to move until the first one has finished moving. 

The output for each rover should be its final coordinates and heading. 

**Input:**  
5 5  
1 2 N  
LMLMLMLMM  
3 3 E  
MMRMMRMRRM

**Output:**  
1 3 N  
5 1 E

### The Solution

I created several objects and interfaces for this solution.

##### Interfaces

I created modular interfaces for the problem's input, output, move types and directions. This way, if the input or output ever needs to change, we can just change the interfaces instead of picking through the code for magic strings.

##### Objects

I used a Map object that kept track of its own borders as well as all the rovers that were currently present. The Map object can issue commands to rovers and detect collisions or out-of-bounds errors.

Rover objects know about their own current direction and coordinates. They update their properties based on moves passed down from the Map, and can project the coordinates of a potential move without actually making that move. The Map uses this projection capability to detect possible collisions and throw errors if necessary.

Right now, if the provided rover plan results in a collision or out-of-bounds error the program simply omits that rover from the results (assuming it crashed or fell off a cliff). If the given input is invalid, the program simply throws an error.
