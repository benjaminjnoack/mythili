var url			= require('url'),
	path		= require('path'),
	querystring = require('querystring'),
	config 		= require('../config.json');

var Options = function (url, queries) {
	this.url = url || null;
	this.queries = this.getQueries();
};

Options.prototype.getQueries = function(passed) {
	if (!passed) return config.queries;
	return {
		page: passed.page || config.queries.page,
		labels: passed.lables || config.queries.lables,
		state: passed.state || config.queries.state,
		direction: passed.state || config.queries.direction,
		sort: passed.sort || config.queries.sort
	}
};

Options.prototype.buildQueryString = function() {
	var queryString = '?' + querystring.stringify(this.queries);
	return (queryString.length > 1) ? queryString : null;
};

Options.prototype.buildPath = function() {
	var route = path.join(config.repoApi, config.repoOwner, config.repoName, config.endpoint).replace(/\\/g, '\/');
	var queryString = this.buildQueryString();
	return queryString ? (route + queryString) : route;
};

Options.prototype.getDefaultOptions = function() {
	return {
		hostname: config.hostName,
		method: 'GET',
		path: this.buildPath()
	};
};

Options.prototype.getOptions = function() {
	var options = this.url ? url.parse(this.url) : this.getDefaultOptions();

	options.auth = config.username + ':' + config.password;
	options.headers = {
		'User-Agent': 'mythili',
		'Accept': 'application/vnd.github.v3+json'
	};
	
	return options;
};

module.exports = Options;