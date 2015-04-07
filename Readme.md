
# git-auto

Tiny script to automate your git workflow
  ![](https://s3.amazonaws.com/f.cl.ly/items/2h3w1e17143q0N033b2l/Screen%20Shot%202015-04-07%20at%2012.30.12%20AM.png)

## Installation

    $ npm install -g git-auto

## Usage

```
Usage: git-auto [options]

Options:

  -h, --help     output usage information
  -V, --version  output the version number
  -p, --push     Push to remote repository after generating commits
```  

  Running `$ git-auto -p` inside a folder will do the following:
  
  - If the folder not a git repository, initialize it as one.
  - For each file in the repository, add the file to the staging area and generate a commit message.
  - With the `-p` option, push to origin master at the end.

## License

MIT
