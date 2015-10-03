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
	this.req.on('error', this.handleError);
	this.req.end();
};

Request.prototype.handleResponse = function(res) {
	this.res = res
		.on('data', this.handleData.bind(this))
		.on('end', this.endRequest.bind(this));
};

Request.prototype.handleError = function(err) {
	this.callback(err, this.res.headers);
};

Request.prototype.handleData = function(data) {
	this.resBody += data;
};

Request.prototype.endRequest = function() {
	if (this.res.statusCode !== 200) return this.handleError(new Error("Bad Response Code"));
	this.resBody = JSON.parse(this.resBody);
	this.processBody();
	this.callback(null, this.res.headers);
};

Request.prototype.processBody = function() {
	for (var i = 0; i < this.resBody.length; i++) {
		var issue = this.resBody[i];
		//if (i === 0) console.log(issue);
		this.writer.writeIssue(issue);
	};
};

module.exports = Request;