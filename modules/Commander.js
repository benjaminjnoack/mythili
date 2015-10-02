var Commander = function () {
	this.argv = process.argv;
	this.lables = null;
	this.status = null;
	this.processArgv();
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
	var labels = this.argv[index];
	console.log("Found labels", labels);
};

Commander.prototype.processStatus = function(index) {
	var status = this.argv[index];
	console.log("Found status", status);
};

module.exports = Commander;