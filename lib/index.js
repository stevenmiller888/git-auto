
/**
 * Module dependencies.
 */

var exists = require('fs').exists;
var Git = require('gity');

/**
 * Expose `auto`.
 */

module.exports = auto;

/**
 * auto.
 *
 * @param {Object} opts
 */

function auto(opts){
  opts = opts || {};
  var git = new Git();

  if (!exists('.git')) git.init();

  git
    .status()
    .run(function(err, res){
      var mapping = { created: 'added', untracked: 'added', deleted: 'deleted', modified: 'updated' };
      
      for (var status in res) {
        res[status].forEach(function(file){
          if (status === 'deleted') return;
          git.add(file);
          var msg = mapping[status] + ' ' + file.toLowerCase();
          git.commit('-m ' + '"' + msg + '"');
        })
      }

      var deleted = res.deleted;

      if (deleted.length === 1) {
        git.add(deleted[0]);
        git.commit('-m ' + 'removed ' + deleted[0]);
      }

      if (deleted.length > 1) {
        deleted.forEach(function(file){ git.add(file); });
        git.commit('-m ' + '"removed files"');
      }

      if (opts.push) git.push('origin master');

      git.run();
    });
}
