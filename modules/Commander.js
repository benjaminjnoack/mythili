var Commander = function () {
	this.argv = process.argv;
	this.flagRegEx = /\-\-/;
	this.direction = null;
	this.labels = null;
	this.sort = null;
	this.state = null;
};

Commander.prototype.processArgv = function() {
	for (var i = 0; i < this.argv.length; i++) {
		var arg = this.argv[i];
		var argVal = this.argv[i + 1];
		
		if (!argVal || this.flagRegEx.test(argVal)) continue;

		switch (arg) {
			case '--direction':
				this.processDirection(argVal);
				break;
			case '--labels':
				this.processLabels(argVal);
				break;
			case '--sort':
				this.processSort(argVal);
				break;
			case '--state':
				this.processState(argVal);
				break;
		}
	};
};

Commander.prototype.processDirection = function(argVal) {
	if (argVal === "asc" || argVal === "desc") this.direction = argVal;
};

Commander.prototype.processLabels = function(argVal) {
	this.labels = argVal;
};

Commander.prototype.processSort = function(argVal) {
	if (argVal === "created" || argVal === "updated" || argVal === "comments") this.sort = argVal;
};

Commander.prototype.processState = function(argVal) {
	if (argVal === "open" || argVal === "closed" || argVal === "all") this.state = argVal;
};

Commander.prototype.getQueries = function() {
	this.processArgv();

	this.queries = {
		direction: this.direction,
		labels: this.labels,
		sort: this.sort,
		state: this.state
	};
	
	return this.queries;
};

module.exports = Commander;