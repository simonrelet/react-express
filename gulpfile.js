'use strict';

const gulp = require('gulp');
const del = require('del');
const sync = require('gulp-npm-script-sync');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');

const paths = {
  dist: 'dist/',
  pagesDist: 'dist/pages/',
  pages: 'app/*.jsx',
  components: 'components/*.jsx'
};

gulp.task('clean', () => {
  return del([paths.dist, '.tmp']);
});

gulp.task('buid:components', () => {
  return gulp.src(paths.components)
    .pipe(babel({ presets: ['es2015', 'react'] }))
    .pipe(gulp.dest('.tmp/components'));
});

gulp.task('build:pages', () => {
  return gulp.src(paths.pages)
    .pipe(babel({ presets: ['es2015', 'react'] }))
    .pipe(gulp.dest('.tmp/pages'));
});

gulp.task('build', ['buid:components', 'build:pages'], () => {
  return gulp.src('.tmp/pages/*.js')
    .pipe(browserify())
    .pipe(gulp.dest(paths.pagesDist));
});

gulp.task('watch', ['build'], done => {
  gulp.watch(paths.components, ['build']);
  gulp.watch(paths.pages, ['build']);
  done();
});

sync(gulp, {
  excluded: ['build:js', 'build:html', 'build:css', 'build:copy-pug']
});
