var Commander = function () {
	this.argv = process.argv;
	this.lables = null;
	this.state = null;
};

Commander.prototype.processArgv = function() {
	for (var i = 0; i < this.argv.length; i++) {
		var arg = this.argv[i];
		if ((arg === '--labels') && this.argv[i + 1]) {
			this.processLabels(i + 1);
			continue;
		}

		if ((arg === '--state') && this.argv[i + 1]) {
			this.processState(i + 1);
			continue;
		}
	};
};

Commander.prototype.processLabels = function(index) {
	this.labels = this.argv[index];
};

Commander.prototype.processState = function(index) {
	var state = this.argv[index];
	if (state === "open" || state === "closed" || state === "all") this.state = state;
};

Commander.prototype.getQueries = function() {
	this.processArgv();
	return {
		labels: this.labels,
		state: this.state
	}
};

module.exports = Commander;