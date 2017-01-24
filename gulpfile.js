const gulp = require('gulp');
const gulpReplace = require('gulp-replace');
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
const preffix = '.js';

gulp.task('naut-create', function () {
    settings.forEach(function (element) {
        gulp
            .src(element.template)
            .pipe(gulpReplace('NameFileReplace',args.file))
            .pipe(gulpReplace('NameReplace',capitalizeFirstLetter(args.file)))
            .pipe(gulpRename(args.file + preffix))
            .pipe(gulp.dest(element.dest));
    }, this);
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}