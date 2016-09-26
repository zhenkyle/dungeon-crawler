const conf = require('./gulp.conf');
const wiredep = require('wiredep');

module.exports = function listFiles() {
  const wiredepOptions = Object.assign({}, conf.wiredep, {
    overrides: {
      react: {main: ['react-with-addons.js', 'react-dom.js']}
    },
    dependencies: true,
    devDependencies: true
  });

  const patterns = wiredep(wiredepOptions).js.concat([
    'node_modules/es6-shim/es6-shim.js',
    `!${conf.path.tmp('**/*.spec.js')}`,
    conf.path.tmp('app/constants/*.js'),
    conf.path.tmp('app/reducers/!(index).js'),
    conf.path.tmp('app/reducers/index.js'),
    conf.path.tmp('app/actions/index.js'),
    conf.path.tmp('app/components/*.js'),
    `${conf.path.tmp('**/*.spec.js')}`
  ]);

  const files = patterns.map(pattern => ({pattern}));
  files.push({
    pattern: conf.path.src('assets/**/*'),
    included: false,
    served: true,
    watched: false
  });
  return files;
};
