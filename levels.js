var level = new Array();
level[0] = {
	drinks: [null, null, "beer", null, null],
	pipes: [
		[["curve", 2], ["rect", 0], ["curve", 2], ["rect", 1], ["curve", 0], ["rect", 0], ["curve", 0], ["rect", 0], ["curve", 3], ["curve", 0], ["curve", 2]],
		[["rect", 0], ["curve", 1], ["cross", 0], ["curve", 2], ["rect", 0], ["cross", 0], ["rect", 0], ["rect", 1], ["bridge", 0], ["curve", 3], ["bridge", 0]],
		[["rect", 1], ["curve", 1], ["bridge", 0], ["curve", 3], ["rect", 0], ["curve", 0], ["curve", 2], ["rect", 1], ["rect", 0], ["segundo", 0], ["rect", 0]],
		[["rect", 0], ["curve", 3], ["curve", 2], ["segundo", 0], ["curve", 1], ["segundo", 0], ["rect", 0], ["bridge", 0], ["rect", 0], ["rect", 0], ["curve", 1]],
		[["rect", 0], ["rect", 0], ["rect", 1], ["rect", 0], ["curve", 3], ["curve", 1], ["rect", 0], ["curve", 1], ["rect", 0], ["curve", 1], ["curve", 1]]
	], 
	receiver: [null, null, null, "beer", null, null, null, null, null, null, null]
};

level[1] = {
	drinks: [null, "beer", null, "wine", null],
	pipes: [
		[["rect", 0], ["rect", 0], ["segundo", 1], ["rect", 0], ["curve", 1], ["rect", 0], ["curve", 0], ["rect", 0], ["bridge", 0], ["rect", 0], ["rect", 1]],
		[["rect", 0], ["curve", 1], ["rect", 0], ["rect", 0], ["curve", 3], ["rect", 0], ["rect", 0], ["rect", 1], ["segundo", 1], ["rect", 0], ["bridge", 0]],
		[["bridge", 0], ["rect", 0], ["curve", 2], ["curve", 1], ["rect", 0], ["curve", 1], ["rect", 1], ["curve", 0], ["rect", 0], ["rect", 1], ["rect", 0]],
		[["rect", 1], ["rect", 0], ["curve", 1], ["rect", 0], ["curve", 1], ["rect", 0], ["rect", 0], ["segundo", 1], ["rect", 0], ["rect", 0], ["segundo", 1]],
		[["rect", 0], ["curve", 1], ["curve", 0], ["segundo", 1], ["rect", 0], ["bridge", 0], ["segundo", 1], ["curve", 2], ["curve", 1], ["rect", 0], ["rect", 0]]
	],
	receiver: [null, "wine", null, null, null, null, null, null, null, "beer", null]
};

level[2] = {
	drinks: [null, "wine", null, null, null],
	pipes: [
		[["curve", 2], ["curve", 1], ["curve", 2], ["curve", 2], ["curve", 0], ["rect", 0], ["rect", 0], ["curve", 1], ["segundo", 0], ["curve", 0], ["curve", 2]],
		[["rect", 0], ["cross", 0], ["curve", 3], ["curve", 1], ["curve", 0], ["rect", 0], ["segundo", 0], ["curve", 3], ["segundo", 1], ["curve", 2], ["bridge", 0]],
		[["bridge", 0], ["segundo", 0], ["rect", 1], ["curve", 1], ["rect", 0], ["curve", 1], ["curve", 2], ["rect", 1], ["cross", 0], ["segundo", 0], ["rect", 0]],
		[["rect", 1], ["curve", 3], ["curve", 2], ["segundo", 0], ["bridge", 0], ["curve", 2], ["rect", 1], ["curve", 1], ["rect", 0], ["rect", 0], ["curve", 1]],
		[["curve", 0], ["curve", 0], ["curve", 1], ["rect", 0], ["curve", 3], ["curve", 1], ["segundo", 1], ["curve", 1], ["curve", 0], ["curve", 3], ["curve", 1]]
	], 
	receiver: ["wine", null, null, "wine", null, null, null, "wine", null, null, null]
};

level[8] = {
	drinks: ["liquor", "wine", null, "soda", "tequila"],
	pipes: [
		[["rect", 0], ["rect", 1], ["curve", 2], ["curve", 2], ["curve", 3], ["mixer", 0], ["cross", 0], ["rect", 0], ["rect", 1], ["rect", 0], ["segundo", 1]],
		[["rect", 0], ["cross", 0], ["bridge", 0], ["curve", 1], ["mixer", 0], ["curve", 3], ["rect", 1], ["segundo", 0], ["curve", 1], ["curve", 1], ["rect", 0]],
		[["rect", 1], ["rect", 0], ["rect", 0], ["rect", 0], ["rect", 0], ["curve", 3], ["curve", 1], ["curve", 0], ["bridge", 0], ["rect", 0], ["curve", 2]],
		[["rect", 0], ["curve", 0], ["curve", 0], ["cross", 0], ["segundo", 0], ["curve", 0], ["mixer", 0], ["rect", 0], ["rect", 0], ["rect", 0], ["rect", 0]],
		[["segundo", 0], ["rect", 0], ["segundo", 0], ["rect", 0], ["segundo", 0], ["curve", 1], ["segundo", 0], ["bridge", 0], ["rect", 0], ["rect", 0], ["curve", 1]]
	],
	receiver: ["hybrid", "hybrid", "splondee", null, "hybrid", null, "splondee", null, null, "splondee", null]
};

// var level9 = {
// 	drinks: ["liquor", "wine", null, "soda", "tequila"],
// 	pipes: [
// 		[["rect", 0], ["curve", 1], ["rect", 0], ["bridge", 0], ["rect", 0], ["mixer", 0], ["rect", 0], ["cross", 0], ["rect", 0], ["rect", 1], ["rect", 0]],
// 		[["segundo", 0], ["curve", 1], ["rect", 0], ["curve", 1], ["mixer", 0], ["bridge", 0], ["rect", 0], ["segundo", 0], ["rect", 0], ["rect", 1], ["curve", 0]],
// 		[["curve", 0], ["curve", 2], ["rect", 0], ["rect", 0], ["segundo", 0], ["rect", 1], ["rect", 0], ["curve", 2], ["rect", 0], ["curve", 0], ["rect", 0]],
// 		[["curve", 1], ["rect", 1], ["segundo", 0], ["rect", 0], ["rect", 0], ["segundo", 1], ["mixer", 0], ["segundo", 0], ["segundo", 0], ["curve", 0], ["curve", 1]],
// 		[["curve", 2], ["cross", 0], ["bridge", 0], ["rect", 0], ["curve", 3], ["curve", 1], ["cross", 0], ["rect", 0], ["rect", 0], ["curve", 3], ["curve", 3]]
// 	],
// 	receiver: ["hybrid", "hybrid", "splondee", null, "hybrid", null, "splondee", null, null, "splondee", null]
// };