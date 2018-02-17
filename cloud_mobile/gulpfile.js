"use strict";

let gulp = require('gulp');
let rename = require('gulp-rename');
let vars = require('gulp-vars');
let importCss = require('gulp-import-css');

gulp.task('css_variables', function() {
    return gulp.src('./src/css/cloud-mobile.css')
    		   .pipe(importCss())
    		   .pipe(vars())
    		   .pipe(gulp.dest('./dist/css'));
});
gulp.task('css_variables:watch', () =>
    gulp.watch('./src/css/**.css', ['css_variables'])
);


gulp.task('default', ["css_variables", "css_variables:watch"]);
