var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var webpack = require('gulp-webpack');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var eslint = require('gulp-eslint');
var config = require('./gulpconfig');

gulp.task('lint', function() {
    return gulp.src(config.eslint.prod.src)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('sass:build', function() {
    return gulp.src(config.sass.prod.entry)
        .pipe(sass(config.sass.prod)
        .on('error', sass.logError))
        .pipe(autoprefixer(config.autoprefixer.prod))
        .pipe(gulp.dest(config.sass.prod.output));
});

gulp.task('sass:dev', function() {
    return gulp.src(config.sass.dev.entry)
        .pipe(sourcemaps.init())
        .pipe(sass(config.sass.dev)
        .on('error', sass.logError))
        .pipe(autoprefixer(config.autoprefixer.dev))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.sass.dev.output));
});

gulp.task('webpack:build', function() {
    return gulp.src(config.paths.prod.src)
        .pipe(webpack(config.webpack.prod))
        .pipe(uglify())
        .pipe(gulp.dest(config.paths.prod.output));
});

gulp.task('webpack:dev', function() {
    return gulp.src(config.paths.dev.src)
        .pipe(webpack(config.webpack.dev))
        .pipe(gulp.dest(config.paths.dev.output));
});

gulp.task('build', ['lint', 'sass:build', 'webpack:build']);

gulp.task('dev', function() {
    gulp.watch(config.sass.dev.dir, ['sass:dev']);
    gulp.watch(config.paths.dev.src, ['webpack:dev']);
});
