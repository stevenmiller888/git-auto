
/**
 * Module dependencies.
 */

var exists = require('fs').exists;
var Git = require('gity');

/**
 * Commit helper function
 */

function commit (git, msg) {
  git.commit('-m "' + msg + '"');
}

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
  var git = new Git(opts);

  if (!exists('.git')) git.init();

  git
    .status()
    .run(function(err, res){
      var mapping = { created: 'added', untracked: 'added', deleted: 'deleted', modified: 'updated' };
      var msg = '';

      for (var status in res) {
        res[status].forEach(function(file){
          if (status === 'deleted') return;
          git.add(file);
          if (msg.length) msg += '\n';
          msg += mapping[status] + ' ' + file.toLowerCase();
          if (!opts.group) {
            commit(git, msg);
            msg = '';
          }
        })
      }

      var deleted = res.deleted;

      if (deleted.length) {
        deleted.forEach(function(file){
          git.add(file);
          if (msg.length) msg += '\n';
          msg += 'removed ' + file;
          if (!opts.group) {
            commit(git, msg);
            msg = '';
          }
        })
      }

      if (opts.group) commit(git, msg);
      if (opts.push) git.push('origin master');

      git.run();
    });
}
