var url = require('url');

var Issue = function (issue) {
	this.issue = issue;
	this.priority = "None";
	this.ui = "Not Specified";
	this.processLabels();
}

Issue.prototype.buildEntry = function() {
	var entry = new String();

	entry += this.buildField(this.issue.number);
	entry += this.buildField(this.issue.title);
	entry += this.buildField(this.priority);
	entry += this.buildField(this.ui);
	entry += this.buildField(this.issue.user.login);
	entry += this.buildField((this.issue.assignee) ? this.issue.assignee.login : "Not Assigned");
	entry += this.buildField(this.buildDateField(this.issue.created_at));
	entry += this.buildField(this.issue.state);
	entry += this.buildField((this.issue.closed_at) ? this.buildDateField(this.issue.closed_at) : "N/A");
	entry += this.buildField(this.getScreenshotURL());
	entry += this.buildField("Local");
	entry += this.buildField(this.getComments());

	return entry + "\n";
};

Issue.prototype.processLabels = function() {
	if (!this.issue.labels instanceof Array) return;
	for (var i = 0; i < this.issue.labels.length; i++) {
		var label = this.issue.labels[i].name;
		
		if (label === "High" || label === "Medium" || label === "Low") {
			this.priority = label;
		} else if (label === "Precinct UI" || label === "Autotech UI" || label === "Admin UI") {
			this.ui = label;
		}
	};
};

Issue.prototype.getScreenshotURL = function() {
	if (this.issue.body) {
		var regEx = /\!\[.+\]\((.+)\)/g;
		var match = regEx.exec(this.issue.body);
		if (match) return match[1];
	}
	return "not found";
};

Issue.prototype.getComments = function() {
	return this.issue.comments;
};

Issue.prototype.buildField = function(field) {
	//need to escape double quotes and commas
	field += "";
	field = field.replace(/\"/g, '\'');
	field = field.replace(/\,/g, '');
	return ("\"" + field + "\",");
};

Issue.prototype.buildDateField = function(field) {
	var dateString = new Date(field).toLocaleDateString();
	return this.buildField(dateString);
};

module.exports = Issue;