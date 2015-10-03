#Mythili

##Setup

1. Open the file `configTemp.json` in a plain text editor (vim, nano, Sublime Text, or Notepad will do fine)
2. fill in the empty fields and save the file as `config.json`

For Example: to get the issues for this repository the config.json would look like:

```
{
	"username"	: "yourGitHubUsername",
	"password"	: "yourGitHubPassword",
	"hostName"	: "api.github.com",
	"repoApi"	: "repos",
	"repoOwner"	: "benjaminjnoack",
	"repoName" 	: "mythili",
	"endpoint"	: "issues",
	"queries"	: {
		"page"	: 1,
		"labels": [],
		"state" : "all",
		"direction" : "asc",
		"sort": "creation"
	}
}
```

The `username` and `password` fields are only required if the repository you are trying to access is private.


The `direction` field determines the direction of the sort and may have one of the following values:

```
asc, desc
```

The `labels` field is an array of zero or more labels

```
["bug", "Precinct UI"]
```

The `state` field may have one of the following values:

```
all, open, closed
```

The `sort` fieild may have one of the following values:
```
created, updated, comments
```

You may edit these settings at any time to alter the default behavior of the program


##Command Line Usage

The `config.json` file can be overriden at runtime via command line arguments. For Example:

```
node mythili.js --sort desc
```

The currently supported command line arguments are: 

```
--direction
--labels
--sort
--state
```

The acceptable arguments are the same as those for `config.json`. The only difference is `--labels` which accepts a comma seperated list. If the label includes a space, wrap the labels argument in quotations as shown below.
For Example, to search for issues with the "bug" and "help wanted labels"

```
node mythili.js --labels "bug,help wanted"
```