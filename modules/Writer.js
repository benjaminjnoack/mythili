var fs 		= require('fs'),
	path 	= require('path'),
	config  = require('../config.json'),
	Issue   = require('./Issue.js');

var Writer = function () {
	this.buildPath();
	this.buildStream();
};

Writer.prototype.buildPath = function() {
	this.dir = config.dir || path.resolve(__dirname, "..", "data");
	this.filename = config.repoName + "." + new Date().getTime() + ".csv";
	this.filePath = path.join(this.dir, this.filename);
};

Writer.prototype.buildStream = function(options) {
	this.stream = fs.createWriteStream(this.filePath);
	this.stream.setDefaultEncoding('utf8');
	this.stream.on('open', this.writeHeader.bind(this));
	this.stream.on('finish', this.finished.bind(this));
};

Writer.prototype.writeHeader = function() {
	var header = 'Issue#'
		+ ',Bug Description'
		+ ',Priority' 
		+ ',UI'
		+ ',Created By'
		+ ',Assigned To'
		+ ',Created Date'
		+ ',Status'
		+ ',Closed Date'
		+ ',Screen Shot'
		+ ',Test Environment'
		+ ',Comments\n';

	this.stream.write(header);
};

Writer.prototype.writeIssue = function(issue) {
	var issue = new Issue(issue);
	this.stream.write(issue.buildEntry());
};

Writer.prototype.closeStream = function(callback) {
	this.stream.end(callback);
};

Writer.prototype.finished = function() {
	console.log("File saved as:", this.filePath);
};


module.exports = Writer;