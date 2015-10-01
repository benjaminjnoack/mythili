var fs 		= require('fs');
var path 	= require('path');
var config  = require('../config.json');

var Writer = function () {
	this.buildPath();
	this.buildStream();	
};

Writer.prototype.buildPath = function() {
	this.dir = config.dir || "./data";//should use __dirname
	this.filename = config.repoOwner + "." + config.repoName + "." + new Date().getTime() + ".csv";
	this.filePath = path.join(this.dir, this.filename);
};

Writer.prototype.buildStream = function(options) {

	this.stream = fs.createWriteStream(this.filePath);
	this.stream.setDefaultEncoding('utf8');
	this.stream.on('finish', this.finished.bind(this));
};

Writer.prototype.writeIssue = function(entry) {
	this.stream.write(entry);
};

Writer.prototype.closeStream = function(callback) {
	this.stream.end(callback);
};

Writer.prototype.finished = function() {
	console.log("File saved as:", this.filePath);
};

module.exports = Writer;