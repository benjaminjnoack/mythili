var Request = require('./modules/Request.js'),
	Options = require('./modules/Options.js'),
	Writer	= require('./modules/Writer.js');

var writer 	= new Writer();

var makeRequest = function (queries) {
	var options = new Options(queries).getOptions();
	var request = new Request(options, writer).send(handleResponse);
};

var handleResponse = function (headers) {
	var regEx = /^<([^>]+)>\; rel\=\"([\w]+)\"/;

	var link = regEx.exec(headers.link);
	if (link) {
		var url = link[1];
		var rel = link[2];
		//console.log("next URL", url, rel);
		if (rel === "next") {
			makeRequest(url);
		} else {
			writer.closeStream();
		}
	}
}

makeRequest();