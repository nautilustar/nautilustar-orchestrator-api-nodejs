const gulp = require('gulp');
const gulpReplace = require('gulp-replace');
const gulpCopy = require('gulp-copy');
const gulpConcat = require('gulp-concat');
const gulpRename = require("gulp-rename");
const gulpInject = require('gulp-inject-string');

const args = require('yargs').argv;
const through = require('through2');

const settings = 
{
    preffix: '.js',
    files: [
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
    ],
    templateImport: function(file){
        var objectName = capitalizeFirstLetter(file);
        return '\n\t\t' + objectName + ' = require(\'application/routes/' + file + '\')';
    },
    templateInstance: function(file){
        var objectName = capitalizeFirstLetter(file);
        return '\n\tvar ' + file + ' = new ' + objectName + '();';
    },
    templateRoutes: function(routeName, object){
        var routeFindAll = 'router.get(\'/'+routeName+'\', '+object+'.findAll.bind('+object+'));\'';

        return routeFindAll;
    }
}

gulp.task('naut-create', function () {
    settings.files.forEach(function (element) {
        gulp
            .src(element.template)
            .pipe(gulpReplace('NameFileReplace', args.file))
            .pipe(gulpReplace('NameReplace', capitalizeFirstLetter(args.file)))
            .pipe(gulpRename(args.file + settings.preffix))
            .pipe(gulp.dest(element.dest));
    }, this);

    gulp
        .src('configurations/routes.js')
        .pipe(gulpInject.after('/**naut-file-import**/', settings.templateImport(args.file)))
        .pipe(gulpInject.after('/**naut-instance-object**/', settings.templateInstance(args.file)))
        .pipe(gulpInject.after('/**naut-routes**/',settings.templateRoutes(args.route, args.file)))
        .pipe(gulp.dest('configurations/'));
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}