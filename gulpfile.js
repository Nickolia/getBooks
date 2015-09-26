var gulp = require('gulp'),
    angularTemplates = require('gulp-angular-templates'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    each = require('gulp-foreach'),
    uglify = require('gulp-uglify'),
    insert = require('gulp-insert'),
    replace = require('gulp-replace'),
    path = require('path');

gulp.task('html', function () {
    return gulp.src('public/js/**/template/*.html')
        .pipe(each(function(stream, file){
            var module = file.path.replace( /.*js\/(.*?)\/.*/gi, "$1"),
                data = file.path.replace(file.path.replace( /.*template\/(.*?)/gi, "$1"), "*.html"),
                data_path = data.replace("*.html", '');
             return gulp.src(data)
                 .pipe(angularTemplates({module:module}))
                 .pipe(concat('template.js'))
                 .pipe(gulp.dest(data_path));
        }))
});
gulp.task('js', function () {
    return gulp.src('public/js/**/***/*.js')
        .pipe(each(function(stream, file){
            var module = file.path.replace( /.*js\/(.*?)\/.*/gi, "$1"),
                data = path.dirname(file.path) + '/*.js',
                data_path = file.path.replace(file.path.replace( /.*js\/(.*?)/gi, "$1"), ''),
                replaceMod = "angular.module('"+module+"', [])",
                replaceMod2 = "angular.module('"+module+"')";
             return gulp.src(data)
                 .pipe(concat('build.js'))
                 .pipe(replace(replaceMod, ''))
                 .pipe(replace(replaceMod2, ''))
                 .pipe(insert.prepend("( function( angular, undefined ) {\n    'use strict';\n\n angular.module('"+module+"', [])"))
                 .pipe(insert.append("\n\n} )( window.angular );"))
                 .pipe(gulp.dest(data_path + '/' + module + '/'));
        }))
});
gulp.task('watch', ['html','js'], function() {
    // Watch our scripts
    gulp.watch(['public/js/**/template/*.html','public/js/**/***/*.js'],[
        'html','js'
    ]);
});
gulp.task('default', function() {
    gulp.run('watch');
});
