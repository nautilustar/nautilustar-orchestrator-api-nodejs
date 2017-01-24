const gulp = require('gulp');
const replace = require('gulp-replace');
const gulpCopy = require('gulp-copy');
const gulpConcat = require('gulp-concat');
const gulpRename = require("gulp-rename");
const args = require('yargs').argv;
const through = require('through2');

const settings = [
    {
        template: 'templates/repository_template.tpt',
        dest: 'application/repository/'
    },
    {
        template: 'templates/business_template.tpt',
        dest: 'application/business/'
    },
    {
        template: 'templates/route_template.tpt',
        dest: 'application/routes/'
    }
];

gulp.task('naut-create', function () {
    settings.forEach(function (element) {
        gulp
            .src(element.template)
            .pipe(gulpRename(args.file))
            .pipe(gulp.dest(element.dest));
    }, this);
});