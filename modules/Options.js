var url			= require('url'),
	path		= require('path'),
	querystring = require('querystring'),
	config 		= require('../config.json');

var Options = function (url, queries) {
	this.url = url || null;
	this.queries = queries;
};

Options.prototype.buildQueries = function() {
	this.queries = {
		page: this.queries.page || config.queries.page,
		labels: this.queries.labels || config.queries.labels,
		state: this.queries.state || config.queries.state,
		direction: this.queries.direction || config.queries.direction,
		sort: this.queries.sort || config.queries.sort
	}
};

Options.prototype.buildQueryString = function() {
	this.buildQueries();
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

	if (config.username && config.password) {
		options.auth = config.username + ':' + config.password;
	}
	
	options.headers = {
		'User-Agent': 'mythili',
		'Accept': 'application/vnd.github.v3+json'
	};
	
	return options;
};

module.exports = Options;