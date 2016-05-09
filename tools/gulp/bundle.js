const gulp = require('gulp');
const config = require('./config');
const path = require('path');
const Builder = require('systemjs-builder');

var bundleConfig = {
  defaultJSExtensions: true,
  paths: {
    '@angular/core': 'node_modules/@angular/core/index.js',
    '@angular/http': 'node_modules/@angular/http/index.js',
    'rxjs/*': 'node_modules/rxjs/*',
    'ng2-idle/core': 'node_modules/ng2-idle/core.js'
  }
};

bundleConfig.paths[config.pkg.name + '/*'] = 'dist/*';

function bundle(moduleName, moduleBundleName, minify, done) {
  const outputConfig = {
    sourceMaps: true,
    minify: minify
  };
  const builder = new Builder();
  builder.config(bundleConfig);
  const outputFile = path.join(config.PATHS.dist.bundles,
      moduleBundleName + (minify ? '.min' : '') + '.js');
  const bundlePromise = builder.bundle(moduleName +
      ' - @angular/core - @angular/http - rxjs/* - ng2-idle/core',
        outputFile, outputConfig)
      .then(function() {
        done();
      });

  return bundlePromise;
}

gulp.task('bundle:cjs', function bundleCjs(done) {
  bundle(config.pkg.name + '/core', config.pkg.name, false, done);
});

gulp.task('bundle:cjs:min', function bundleCjsMin(done) {
  bundle(config.pkg.name + '/core', config.pkg.name, true, done);
});

gulp.task('bundle', ['bundle:cjs', 'bundle:cjs:min']);
