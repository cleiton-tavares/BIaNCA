var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    path = require('path'),
    server = require('gulp-server-livereload'),
    inject = require("gulp-inject");


gulp.task('auto_inject', function () {
  var target = gulp.src('./assets/index.html');
  var sources = gulp.src(['./assets/js/*.js', './assets/js/services/*.js', './assets/js/modules/*.js', './assets/js/directives/*.js', './assets/js/*/*.js'], {read: false});

  return target.pipe(inject(sources))
    .pipe(gulp.dest(''));
});

gulp.task('auto_inject_deploy', function () {
  var target = gulp.src('./partials/index.html');
  var sources = gulp.src(['./assets/js/dist'], {read: false});

  return target.pipe(inject(sources))
    .pipe(gulp.dest(''));
});

gulp.task('watch', function() {
    gulp.watch('./assets/js/*', function(event) { gulp.run('auto_inject'); console.log('novo inject!'); });
    gulp.watch('./assets/js/*/*', function(event) { gulp.run('auto_inject'); console.log('novo inject!'); });
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(server({
      port : 1222,
      livereload: false,
      directoryListing: false,
      open: true
    }));
});

gulp.task('dev', function() {
    gulp.run('auto_inject');
    gulp.run('webserver');
    gulp.run('watch');
});
gulp.task('deploy', function() {

});

