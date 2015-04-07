
# git-auto

Tiny script to automate your git workflow
  ![](http://f.cl.ly/items/1Q1E0X2z3u1G3Y1A1j1d/Screen%20Shot%202015-03-05%20at%208.40.41%20PM.png)

## Installation

    $ npm install -g git-auto

## Usage
  
  Running `$ git-auto -p` inside a folder will do the following:
  
  1. If the folder not a git repository, initialize it as one.

  - For each file in the repository, add the file to the staging area and generate a commit message.
  
  - With the `-p` option, push to origin master at the end.

## License

MIT
