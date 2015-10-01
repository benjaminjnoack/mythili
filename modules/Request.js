var https = require('https');

var Request = function(options, writer) {
	this.options = options;
	this.writer = writer;
	this.callback = null;
	this.req = null;
	this.res = null;
	this.resBody = '';
}

Request.prototype.send = function(callback) {
	this.callback = callback;
	this.req = https.request(this.options, this.handleResponse.bind(this));
	this.req.on('error', this.handeError);
	this.req.end();
};

Request.prototype.handleResponse = function(res) {
	this.res = res
		.on('data', this.handleData.bind(this))
		.on('end', this.endRequest.bind(this));
};

Request.prototype.handeError = function(err) {
	console.error("there was an error with the request", err);
};

Request.prototype.handleData = function(data) {
	this.resBody += data;
};

Request.prototype.endRequest = function() {
	try {
		this.resBody = JSON.parse(this.resBody);
		this.processBody();
	} catch (e) {
		console.error("Error parsing the response", e)
	}
};

Request.prototype.buildEntry = function(issue) {
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

Request.prototype.processBody = function() {
	for (var i = 0; i < this.resBody.length; i++) {
		var issue = this.resBody[i];
		if (i === 0) {
			//console.log(issue);
		}
		
		this.writer.writeIssue(this.buildEntry(issue));
	};
	if (this.callback) return this.callback(this.res.headers);
};

module.exports = Request;