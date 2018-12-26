const gulp = require('gulp'),
    less = require('gulp-less'),
    browserSync = require('browser-sync').create(),
    path = require('path'),
    LessAutoprefix = require('less-plugin-autoprefix'),
    autoprefix = new LessAutoprefix({browsers: ['last 2 versions']}),
    sourcemaps = require('gulp-sourcemaps');

function styles() {
    return gulp.src(['src/less/**/*.less', '!src/less/**/_*.less'])
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')],
            plugins: [autoprefix]
        }))
        .pipe(sourcemaps.write())
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
    gulp.watch('build/*.html').on('change', browserSync.reload);
}

gulp.task('serve', serve);