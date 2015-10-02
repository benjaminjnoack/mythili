var Commander = function () {
	this.argv = process.argv;
	this.lables = null;
	this.status = null;
};

Commander.prototype.processArgv = function() {
	for (var i = 0; i < this.argv.length; i++) {
		var arg = this.argv[i];
		if ((arg === '-l' || arg === '--labels') && this.argv[i + 1]) {
			this.processLabels(i + 1);
			continue;
		}

		if ((arg === '-s' || arg === '--status') && this.argv[i + 1]) {
			this.processStatus(i + 1);
			continue;
		}
	};
};

Commander.prototype.processLabels = function(index) {
	this.labels = this.argv[index].split(',');
	console.log("Found labels", this.labels);
};

Commander.prototype.processStatus = function(index) {
	var status = this.argv[index];
	if (status === "open" || status === "closed" || status === "all") this.status = status;
	console.log("Found status", this.status);
};

Commander.prototype.getCommands = function() {
	this.processArgv();
	return {
		labels: this.labels,
		status: this.status
	}
};

module.exports = Commander;