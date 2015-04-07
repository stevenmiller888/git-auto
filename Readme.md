
# git-auto

> Tiny script to automate your git workflow

![](http://f.cl.ly/items/0O4208342q0z3x1H2B2Y/Screen%20Shot%202015-04-07%20at%2010.05.05%20AM.png)

## Installation

    $ npm install -g git-auto

## Usage

```
Usage: git auto [options]

Options:

  -h, --help     output usage information
  -V, --version  output the version number
  -p, --push     Push to remote repository after generating commits
```  

  Running `$ git auto` inside a folder will do the following:
  
  - If the folder not a git repository, initialize it as one.
  - For each file in the repository, add the file to the staging area and generate a commit message.
  - Adding the `-p` option will push to origin master at the end.

## License

MIT
