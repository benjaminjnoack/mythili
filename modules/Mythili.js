var Request = require('./Request.js'),
	Options = require('./Options.js'),
	Writer	= require('./Writer.js');

var Mythili = function () {
	this.writer = new Writer();
	this.headerCheck = /^<([^>]+)>\; rel\=\"([\w]+)\"/;
};

Mythili.prototype.makeRequest = function(queries) {
	var options = new Options(queries).getOptions();
	var request = new Request(options, this.writer).send(this.handleResponse.bind(this));	
};

Mythili.prototype.handleResponse = function(resHeaders) {
	var link = this.headerCheck.exec(resHeaders.link);
	if (link) return (link[2] === "next") ? this.makeRequest(link[1]) : this.writer.closeStream();
};

Mythili.prototype.start = function() {
	this.makeRequest();
};

module.exports = Mythili;