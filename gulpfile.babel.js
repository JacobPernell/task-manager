'use strict';

import gulp from 'gulp';
import cssNano from 'gulp-cssnano';
import concatCss from 'gulp-concat-css';
import webpack from 'webpack-stream';
import babel from 'gulp-babel';

const staticFiles = [
  'src/**/*.html',
  'src/**/*.ico'
];

const styleSheets = [
  'src/css/style.css'
];

gulp.task('static:dev', () => {
  gulp.src(staticFiles)
  .pipe(gulp.dest(__dirname + '/public/'));
});

gulp.task('webpack:dev', () => {
  return gulp.src('src/js/app.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(babel())
  .pipe(gulp.dest('public/js/'));
});

gulp.task('css:dev', () => {
  return gulp.src(styleSheets)
    .pipe(concatCss('main.css'))
    .pipe(cssNano())
    .pipe(gulp.dest(__dirname + '/public/css'));
});

gulp.task('watch:public', () => {
  gulp.watch(staticFiles, ['static:dev']);
  gulp.watch(styleSheets, ['sass:dev']);
  gulp.watch('src/**/*.js', ['webpack:dev']);
});

gulp.task('build', ['static:dev', 'webpack:dev', 'css:dev']);
gulp.task('default', ['build', 'watch:public']);
