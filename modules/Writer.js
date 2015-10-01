var fs = require('fs');

var Writer = function () {
	this.buildStream();
};

Writer.prototype.buildStream = function(options) {
	var path = 'test';
	this.stream = fs.createWriteStream(path);
	this.stream.setDefaultEncoding('utf8');
	this.stream.on('finish', this.finished.bind(this));
};

Writer.prototype.writeIssue = function(entry) {
	console.log("WRITING:");
	console.log(entry)
	this.stream.write(entry);
};

Writer.prototype.closeStream = function(callback) {
	this.stream.end(callback);
};

Writer.prototype.finished = function() {
	console.log("The stream is finished");
};

module.exports = Writer;