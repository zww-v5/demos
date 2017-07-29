'use strict';

var gulp = require('gulp');
var htmlFolder = './html';
var path = require('path');
var fs = require('fs');

/* 浏览器自动刷新 start */
var browserSync = require('browser-sync');

function browserSyncInit(baseDir, startPath) {
    browserSync.instance = browserSync.init({
        startPath: startPath || '/',
        server: {
            baseDir: baseDir,
            routes: {},
            browser: 'default'
        }
    });
};
/* 浏览器自动刷新 end */

/* handlebars模板编译相关的文件 start */
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var hbsData = {};
var hbsOpt = {
        ignorePartials: true,
        batch: ['./views/partials','./views/layouts']
    };

function hbsToHtml(filePath){
    filePath = filePath || 'views/pages/*.hbs';

    gulp.src(filePath)
        .pipe(handlebars(hbsData, hbsOpt))
        .pipe(rename({
            extname: '.html'
        }))
        .pipe(gulp.dest(htmlFolder));
}

function syncDeleteFile(filePath){
    var fileName = path.basename(filePath, '.hbs'),
        htmlPath = htmlFolder + '/' + fileName + '.html';
    fs.unlinkSync(htmlPath);
}
/* handlebars模板编译相关的文件 end */

gulp.task('watchHbs', function(){
    gulp.watch('views/**/*.hbs', function(event){
        var pattern = /views\/pages\//i;
        if (pattern.test(event.path)) {
            if (event.type == 'deleted') {
                syncDeleteFile(event.path); //删除pages里的hbs文件时，同步删除对应的html文件
            } else {
                hbsToHtml(event.path);
                browserSync.reload(event.path);
            }
        } else {
            hbsToHtml(); //编译所有模板
        }
    });
});

gulp.task('default', ['watchHbs'], function(){
    browserSyncInit(htmlFolder, 'index.html');
});
