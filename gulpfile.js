const gulp = require('gulp'),
    less = require('gulp-less'),
    browserSync = require('browser-sync').create();

function styles() {
    return gulp.src('src/less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.stream());
}

function serve() {
    browserSync.init({
        server: {
            baseDir: 'build'
        }
    });

    gulp.watch('src/less/**/*.less', styles);
    gulp.watch('build/*.html', browserSync.reload);
}

gulp.task('serve', serve);