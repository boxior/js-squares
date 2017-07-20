var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// or...

gulp.task('bs-reload', function () {
	browserSync.reload();
});

gulp.task('default', ['browser-sync'], function() {
	gulp.watch('./*', ['bs-reload']);
	gulp.watch('*.css', ['bs-reload']);
	gulp.watch('*.html', ['bs-reload']);
});