var fs 		= require('fs');
var path 	= require('path');
var config  = require('../config.json');

var Writer = function () {
	this.buildPath();
	this.buildStream();	
};

Writer.prototype.buildPath = function() {
	this.dir = config.dir || "./data";//should use __dirname
	this.filename = config.repoName + "." + new Date().getTime() + ".csv";
	this.filePath = path.join(this.dir, this.filename);
};

Writer.prototype.buildStream = function(options) {

	this.stream = fs.createWriteStream(this.filePath);
	this.stream.setDefaultEncoding('utf8');
	this.stream.on('finish', this.finished.bind(this));
};

Writer.prototype.writeIssue = function(issue) {
	this.stream.write(this.buildEntry(issue));
};

Writer.prototype.buildEntry = function(issue) {
	var entry = "";
	
	entry += "Issue #" + issue.number + " " + issue.html_url + "\n";
	if (issue.labels instanceof Array) {
		var labels = "";
		for (var i = 0; i < issue.labels.length; i++) {
			labels += issue.labels[i].name + " ";
		};
		entry += "Labels: " + labels + "\n";
	}
	entry += "Title: " + issue.title + "\n";
	entry += "State: " + issue.state + "\n";
	entry += "Created By: " + issue.user.login + "\n";
	if (issue.assignee) entry += "Assigned To: " + issue.assignee.login + "\n";
	entry += "Created On: " + issue.created_at + "\n";
	if (issue.closed_at) entry += "Closed On: " + issue.closed_at + "\n";
	entry += "\n";

	return entry;
};

Writer.prototype.closeStream = function(callback) {
	this.stream.end(callback);
};

Writer.prototype.finished = function() {
	console.log("File saved as:", this.filePath);
};

module.exports = Writer;