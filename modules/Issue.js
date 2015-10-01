var Issue = function (issue) {
	this.issue = issue;
}

Issue.prototype.buildEntry = function() {
	var entry = new String();

	entry += this.buildField(this.issue.number);
	entry += this.buildField(this.issue.title);
	entry += this.buildField(this.getPriority() || "no");
	entry += this.buildField(this.getUI() || "no");
	entry += this.buildField(this.issue.user.login);
	entry += this.buildField((this.issue.assignee) ? this.issue.assignee.login : "Not Assigned");
	entry += this.buildField(this.issue.created_at);
	entry += this.buildField(this.issue.state);
	entry += this.buildField((this.issue.closed_at) ? this.issue.closed_at : "N/A");
	entry += this.buildField(this.getScreenshot() || "no");
	entry += this.buildField("Local");
	entry += this.buildField(this.getComments() || "no");

	return entry + "\n";
};

Issue.prototype.getPriority = function() {
	//look for a label high, medium low
};

Issue.prototype.getUI = function() {
	//look for a label Precinct, Autotech, Admin
};

Issue.prototype.getScreenshot = function() {
	//?
};

Issue.prototype.getComments = function() {
	//There is a comments field?
};

Issue.prototype.buildField = function(field) {
	return "\"" + field + "\","
};

module.exports = Issue;