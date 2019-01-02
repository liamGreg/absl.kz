const gulp = require('gulp'),
    less = require('gulp-less'),
    browserSync = require('browser-sync').create(),
    path = require('path'),
    LessAutoprefix = require('less-plugin-autoprefix'),
    autoprefix = new LessAutoprefix({browsers: ['last 2 versions']}),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache');

function styles() {
    return gulp.src(['src/less/**/*.less', '!src/less/**/_*.less', '!src/libs/*'])
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')],
            plugins: [autoprefix]
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src([
        'src/js/jquery-3.3.1.min.js',
        'src/js/selectize.min.js',
        'src/js/slick.min.js',
        'src/js/jquery.magnific-popup.min.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
}

function images() {
    return gulp.src('src/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant]
        })))
        .pipe(gulp.dest('build/img'));
}

function serve() {
    browserSync.init({
        server: {
            baseDir: 'build'
        }
    });

    gulp.watch('src/less/**/*.less', styles);
    gulp.watch('build/*.html').on('change', browserSync.reload);
    gulp.watch('build/js/**/*.js').on('change', browserSync.reload);
    gulp.watch('src/img/**/*', images);
}

gulp.task('serve', serve);
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('images', images);
gulp.task('clear', function() {
    return cache.clearAll();
});