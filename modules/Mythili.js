var url			= require('url'),
	Commander	= require('./Commander.js'),
	Request 	= require('./Request.js'),
	Options 	= require('./Options.js'),
	Writer		= require('./Writer.js');

var Mythili = function () {
	this.writer = new Writer();
	this.commander = new Commander();
	this.headerCheck = /^<([^>]+)>\; rel\=\"([\w]+)\"\,\s<([^>]+)>\; rel\=\"([\w]+)\"/;
	this.queries = null;
	this.lastPage = null;
	this.currentPage = 1;
};

Mythili.prototype.makeRequest = function(url) {
	var options = new Options(url, this.queries).getOptions();
	var request = new Request(options, this.writer).send(this.handleResponse.bind(this));	
};

Mythili.prototype.handleResponse = function(resHeaders) {
	var link = this.headerCheck.exec(resHeaders.link);
	if (!this.lastPage) this.findLastPage(link);
	console.log("Processed page %d of %s", this.currentPage++,  this.lastPage);
	return (link && link[2] === "next") ? this.makeRequest(link[1]) : this.writer.closeStream();
};

Mythili.prototype.findLastPage = function(link) {
	if (!link) return this.lastPage = 1;
	if (link[4] === "last") {
		var parsedUrl = url.parse(link[3], true);
		this.lastPage = parsedUrl.query.page;
	}
};

Mythili.prototype.start = function() {
	this.queries = this.commander.getQueries();
	this.makeRequest();
};

module.exports = Mythili;