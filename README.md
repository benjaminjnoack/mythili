#Mythili

##Setup

1. Open the file `configTemp.json` in a plain text editor (vim, nano, Sublime Text, or notepad will do fine)
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
The labels field may be an array of zero or more labels

```
For Example: ["bug", "Precinct UI"]
```

The state field may have one of the following values:
```
all, open, closed
```


##TODO

command line for labels and status