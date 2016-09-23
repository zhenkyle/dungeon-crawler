const conf = require('./gulp.conf');

module.exports = function () {
  return {
    host: '0.0.0.0',
    server: {
      baseDir: [
        conf.paths.tmp,
        conf.paths.src
      ],
      routes: {
        '/bower_components': 'bower_components'
      }
    },
    open: false
  };
};
