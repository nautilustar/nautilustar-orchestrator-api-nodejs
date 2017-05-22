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
            },
            {
                template: 'templates/model_template.tpt',
                dest: 'application/model/'
            },
            {
                template: 'templates/filter_template.tpt',
                dest: 'application/filters/'
            }
        ],
        templateImport: function (file) {
            var objectName = file.capitalizeFirstLetter();
            return '{0}const {1} = require(\'../application/routes/{2}\');'.format('\n\t', objectName, file);
        },
        templateFilterImport: function (file) {
            var objectName = file.capitalizeFirstLetter() + 'Filter';
            return '{0}const {1} = require(\'../application/filters/{2}\');{3}'.format('\n\t', objectName, file, '\n');
        },
        templateInstance: function (file) {
            var objectName = file.capitalizeFirstLetter();
            return '{0}var {1} = new {2}();'.format('\n\t', file, objectName);
        },
        templateFilterInstance: function (file) {
            var objectName = file.capitalizeFirstLetter() + 'Filter';
            return '{0}var {1} = new {2}({3});'.format('\n\n\t', file + 'Filter', objectName, false);
        },
        templateRoutes: function (routeName, object) {
            //comment
            var divisor = '{0}//{1}'.format('\n\n\t\t', routeName);

            //result
            var result = divisor;

            //routes
            var tabSpace = '\n\t\t';

            //filter
            var filter = object + 'Filter';

            var routes = [
                //save
                '{0}router.post(\'/{1}\', {3}.validateInsert.bind({3}), {2}.save.bind({2}));'.format(tabSpace, routeName, object, filter),
                //update
                '{0}router.put(\'/{1}/:id\', {3}.validateUpdate.bind({3}), {2}.update.bind({2}));'.format(tabSpace, routeName, object, filter),
                //remove
                '{0}router.delete(\'/{1}/:id\', {2}.removeById.bind({2}));'.format(tabSpace, routeName, object),
                //findAll
                '{0}router.get(\'/{1}\', {2}.findAll.bind({2}));'.format(tabSpace, routeName, object),
                //findById
                '{0}router.get(\'/{1}/:id\', {2}.findById.bind({2}));'.format(tabSpace, routeName, object),
                //removeAll
                '{0}router.delete(\'/{1}\', {2}.removeAll.bind({2}));'.format(tabSpace, routeName, object),
            ];

            routes.forEach(function (element) {
                result += element;
            }, this);

            return result;
        }
    }

gulp.task('naut-create', function () {
    settings.files.forEach(function (element) {
        gulp
            .src(element.template)
            .pipe(gulpReplace('NameFileReplace', args.file))
            .pipe(gulpReplace('NameReplace', args.file.capitalizeFirstLetter()))
            .pipe(gulpRename(args.file + settings.preffix))
            .pipe(gulp.dest(element.dest));
    }, this);

    gulp
        .src('configurations/routes.js')
        .pipe(gulpInject.after('/**naut-file-import**/', settings.templateImport(args.file)))
        .pipe(gulpInject.after('/**naut-file-import**/', settings.templateFilterImport(args.file)))
        .pipe(gulpInject.after('/**naut-instance-object**/', settings.templateInstance(args.file)))
        .pipe(gulpInject.after('/**naut-instance-object**/', settings.templateFilterInstance(args.file)))
        .pipe(gulpInject.after('/**naut-routes**/', settings.templateRoutes(args.route, args.file)))
        .pipe(gulp.dest('configurations/'));
});

String.prototype.capitalizeFirstLetter = function () {
    var formatted = this;
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

String.prototype.format = function () {
    var formatted = this;

    for (var i = 0; i < arguments.length; i++) {
        var regex = new RegExp('\\{' + i + '}', 'gi');
        formatted = formatted.replace(regex, arguments[i]);
    }

    return formatted;
}