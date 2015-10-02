var url		= require('url'),
	Request = require('./Request.js'),
	Options = require('./Options.js'),
	Writer	= require('./Writer.js');

var Mythili = function () {
	this.writer = new Writer();
	this.headerCheck = /^<([^>]+)>\; rel\=\"([\w]+)\"\,\s<([^>]+)>\; rel\=\"([\w]+)\"/;
	this.lastPage = null;
	this.currentPage = 1;
};

Mythili.prototype.makeRequest = function(queries) {
	var options = new Options(queries).getOptions();
	var request = new Request(options, this.writer).send(this.handleResponse.bind(this));	
};

Mythili.prototype.handleResponse = function(resHeaders) {
	var link = this.headerCheck.exec(resHeaders.link);
	if (!this.lastPage) this.findLastPage(link);
	console.log("Processed page %d of %s", this.currentPage++,  this.lastPage);
	if (link) return (link[2] === "next") ? this.makeRequest(link[1]) : this.writer.closeStream();
};

Mythili.prototype.findLastPage = function(link) {
	if (link[4] === "last") {
		var parsedUrl = url.parse(link[3], true);
		this.lastPage = parsedUrl.query.page;
	}
};

Mythili.prototype.start = function() {
	this.makeRequest();
};

module.exports = Mythili;