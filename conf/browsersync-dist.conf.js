const conf = require('./gulp.conf');

module.exports = function () {
  return {
    host: '0.0.0.0',
    server: {
      baseDir: [
        conf.paths.dist
      ]
    },
    open: false
  };
};
