var fs 		= require('fs');
var path 	= require('path');
var config  = require('../config.json');

var Writer = function () {
	this.buildPath();
	this.buildStream();
	this.writeHeader();
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

Writer.prototype.buildEntry = function(issue) {
	var entry = new String();

	entry += this.buildField(issue.number);
	entry += this.buildField(issue.title);
	entry += this.buildField(issue.priority || "no priority");
	entry += this.buildField(issue.ui || "no ui");
	entry += this.buildField(issue.user.login);
	entry += this.buildField((issue.assignee) ? issue.assignee.login : "Not Assigned");
	entry += this.buildField(issue.created_at);
	entry += this.buildField(issue.state);
	entry += this.buildField((issue.closed_at) ? issue.closed_at : "N/A");
	entry += this.buildField(issue.screenshot || "no screenshot");
	entry += this.buildField("Local");
	entry += this.buildField(issue.commentsSection || "no comments");

	return entry + "\n";
};

Writer.prototype.buildField = function(field) {
	return "\"" + field + "\","
};

Writer.prototype.closeStream = function(callback) {
	this.stream.end(callback);
};

Writer.prototype.finished = function() {
	console.log("File saved as:", this.filePath);
};

module.exports = Writer;