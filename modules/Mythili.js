var url			= require('url'),
	Commander	= require('./Commander.js'),
	Request 	= require('./Request.js'),
	Options 	= require('./Options.js'),
	Writer		= require('./Writer.js');

var Mythili = function () {
	this.writer = new Writer();
	this.commander = new Commander();
	this.headerCheck = /^<([^>]+)>\; rel\=\"([\w]+)\"\,\s<([^>]+)>\; rel\=\"([\w]+)\"/;
	this.pathRegEx = /^\/(.+)\/(.+)\/(.+)\/(.+)/;//repetitive?
	this.queries = null;
	this.lastPage = null;
	this.currentPage = 1;
};

Mythili.prototype.makeRequest = function(link) {
	var options = new Options(link, this.queries).getOptions();
	if (this.currentPage === 1) this.printMythili(options);
	var request = new Request(options, this.writer).send(this.handleResponse.bind(this));	
};

Mythili.prototype.handleResponse = function(err, resHeaders) {
	if (err) {
		console.log(err);
		console.log(resHeaders);
		return;
	}
	
	var link = this.headerCheck.exec(resHeaders.link);
	if (!this.lastPage) this.findLastPage(link);
	this.printProgress();
	return (link && link[2] === "next") ? this.makeRequest(link[1]) : this.writer.closeStream();
};

Mythili.prototype.printProgress = function() {
	console.log("Processed page %d of %s", this.currentPage++,  this.lastPage);
};

Mythili.prototype.printMythili = function(options) {
	var parsedPath = url.parse(options.path, true);
	var path = this.pathRegEx.exec(parsedPath.pathname);
	var queries = parsedPath.query;
	
	console.log("Repository Owner:", path[2]);
	console.log("Repository Name:", path[3]);
	for (query in queries) {
		if (queries[query] && query !== "page") {
			console.log("%s : %s", query, queries[query]);	
		}
	};
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