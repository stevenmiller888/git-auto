
/**
 * Module dependencies.
 */

var thunkify = require('thunkify');
var git = require('simple-git')();
var exists = require('fs').exists;

/**
 * Expose `auto`.
 */

module.exports = auto;

/**
 * Thunkify `git status`.
 */

git.status = thunkify(git.status.bind(git));

/**
 * Handle git things.
 *
 * @param {Object} opts
 */

function* auto(opts){
  opts = opts || {};

  if (!exists('.git')) git.init();
  var files = yield git.status();
  var statuses = Object.keys(files);
  var deleted = [];
  var mapping = {
    'deleted': 'deleted',
    'not_added': 'added',
    'modified': 'updated'
  };
    
  // need to check for added
  console.log(statuses);
  console.log(files);
  
  statuses.forEach(function(status){
    files[status].forEach(function(file){
      if (status === 'deleted') return deleted.push(file);
      git.add(file);
      var message = fmt('%s %s', mapping[status], file.toLowerCase());
      console.log(message);
      console.log(file);
      git.commit(message, [file]);
    });
  });
  
  if (deleted.length === 1) {
    git.add(deleted[0]);
    git.commit('deleted ' + deleted[0]);
  }
  
  if (deleted.length > 1) {
    deleted.forEach(function(file){ git.add(file); });
    git.commit('deleted various files');
  }

  if (opts.push) git.push('origin', 'master');
}