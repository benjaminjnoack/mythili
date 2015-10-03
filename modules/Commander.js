var Commander = function () {
	this.argv = process.argv;
	this.lables = null;
	this.sort = null;
	this.state = null;
};

Commander.prototype.processArgv = function() {
	for (var i = 0; i < this.argv.length; i++) {
		var arg = this.argv[i];
		var argVal = this.argv[i + 1]
		if ((arg === '--labels') && argVal) {
			this.processLabels(argVal);
			continue;
		}

		if ((arg === '--state') && argVal) {
			this.processState(argVal);
			continue;
		}

		if ((arg === '--sort') && argVal) {
			this.processSort(argVal);
			continue;
		}
	};
};

Commander.prototype.processLabels = function(argVal) {
	this.labels = argVal;
};

Commander.prototype.processState = function(argVal) {
	if (argVal === "open" || argVal === "closed" || argVal === "all") this.state = argVal;
};

Commander.prototype.processSort = function(argVal) {
	if (argVal === "created" || argVal === "updated" || argVal === "comments") this.sort = argVal;
};

Commander.prototype.getQueries = function() {
	this.processArgv();
	return {
		labels: this.labels,
		sort: this.sort,
		state: this.state
	}
};

module.exports = Commander;