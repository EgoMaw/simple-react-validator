/********* to run gulp script *********
 $ npm run gulp dist
 or to watch files
 $ npm run gulp watch
 **************************************/

// include plug-ins
import gulp from 'gulp';
import umd from 'gulp-umd';
import inject from 'gulp-inject-string';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import babel from 'gulp-babel';
import path from 'node:path';
import colors from 'ansi-colors';
import log from 'fancy-log';
import {camelCase, upperFirst} from 'lodash-es';

const HEADER_COMMENT = `// Simple React Validator v${process.env.npm_package_version} | Created By Dockwa | Edited by EgoMaw | MIT License | 2017 - Present\n`;


function build() {
    return gulp
        .src('./src/simple-react-validator.js')
        .pipe(babel())
        .pipe(umd({
            exports: function () {
                return 'SimpleReactValidator';
            },
            namespace: function () {
                return 'SimpleReactValidator';
            },
            dependencies: function () {
                return [
                    {
                        name: 'react',
                        amd: 'react',
                        cjs: 'react',
                        global: 'React',
                        param: 'React',
                    }
                ]
            }
        }))
        .pipe(inject.replace('__VERSION__', process.env.npm_package_version))
        .pipe(inject.prepend(HEADER_COMMENT))
        .pipe(gulp.dest('./dist/'))

        // minify
        .pipe(uglify()
            .on('error', function (err) {
                log.error(colors.red('[Error]'), err.toString());
                this.emit('end');
            }))
        .pipe(inject.prepend(HEADER_COMMENT))
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('./dist/'));
}

function buildLocales() {
    return gulp
        .src('./src/locale/*')
        .pipe(babel())
        .pipe(umd({
            exports: function (file) {
                return 'null';
            },
            namespace: function (file) {
                return `SimpleReactValidatorLocale${capitalizeFilename(file)}`;
            },
            dependencies: function () {
                return [
                    {
                        name: 'simple-react-validator',
                        amd: 'simple-react-validator',
                        cjs: 'simple-react-validator',
                        global: 'SimpleReactValidator',
                        param: 'SimpleReactValidator'
                    }
                ]
            }
        }))
        .pipe(inject.prepend(HEADER_COMMENT))
        .pipe(gulp.dest('./dist/locale/'))

        // minify
        .pipe(uglify().on('error', function (err) {
            log.error(colors.red('[Error]'), err.toString());
            this.emit('end');
        }))
        .pipe(inject.prepend(HEADER_COMMENT))
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('./dist/locale/min/'));
}

function watch() {
    gulp.watch('src/*', build);
    gulp.watch('src/*', buildLocales);
}

const dist = gulp.series(build, buildLocales);

export {build, buildLocales, watch, dist}

function capitalizeFilename(file) {
    return upperFirst(camelCase(path.basename(file.path, '.js')));
}
