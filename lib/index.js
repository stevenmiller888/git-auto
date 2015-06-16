
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

function auto(opts) {
  opts = opts || {};
  var git = new Git(opts);

  if (!exists('.git')) git.init();

  git
    .status()
    .run(function(err, res) {
      var mapping = { created: 'added', untracked: 'added', deleted: 'removed', modified: 'updated' };
      var msg = '';

      for (var status in res) {
        res[status].forEach(function(file) {
          git.add(file);
          if (msg.length) msg += '\n';
          msg += mapping[status] + ' ' + file.toLowerCase();
          if (!opts.group) {
            git.commit('-m "' + msg + '"');
            msg = '';
          }
        });
      }

      if (opts.group) git.commit('-m "' + msg + '"');
      if (opts.push) git.push('origin master');

      git.run();
    });
}
