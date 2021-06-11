const {watch, src, dest, series, parallel} = require('gulp');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const del = require('del');
const postcss = require('gulp-postcss');
var less = require('gulp-less');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var sourcemaps = require('gulp-sourcemaps');
var gulp = require('gulp');
var deploy = require('gulp-gh-pages');

const config = {
    app: {
        js: [
            './src/scripts/**/*.js',
        ],
        less: './src/style/**/*.less',
        fonts: './src/fonts/*',
        images: './src/images/*.*',
        html: './src/*.html'
    },
    dist: {
        base: './dist/',
        fonts: './dist/fonts',
        images: './dist/images'
    }
}

/**
 * Push build to gh-pages
 */
gulp.task('deploy', function () {
    return gulp.src("./dist/**/*")
        .pipe(deploy())
});

function jsTask(done) {
    src(config.app.js)
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(concat('main.bundle.js'))
        .pipe(uglify())
        .pipe(dest(config.dist.base))
    done();
}

function cssTask(done) {
    src(config.app.less)
        .pipe(sourcemaps.init())
        .pipe(less({ outputStyle: 'expanded' }))
        .pipe(rename({ suffix: '.bundle' }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write())
        .pipe(dest(config.dist.base))
    done();
}

function fontTask(done) {
    src(config.app.fonts)
        .pipe(dest(config.dist.fonts))
    done();
}

function imagesTask(done) {
    src(config.app.images)
        .pipe(dest(config.dist.images))
    done();
}

function templateTask(done) {
    src(config.app.html)
        .pipe(dest(config.dist.base))
    done();
}

function watchFiles() {
    watch(config.app.js, series(jsTask, reload));
    watch(config.app.less, series(cssTask, reload));
    watch(config.app.fonts, series(fontTask, reload));
    watch(config.app.images, series(imagesTask, reload));
    watch(config.app.html, series(templateTask, reload));
}

function liveReload(done) {
    browserSync.init({
        server: {
            baseDir: config.dist.base
        },
    });
    done();
}

function reload(done) {
    browserSync.reload();
    done();
}

function cleanUp() {
    return del([config.dist.base]);
}

exports.dev = parallel(jsTask, cssTask, fontTask, imagesTask, templateTask, watchFiles, liveReload);
exports.build = series(cleanUp, parallel(jsTask, cssTask, fontTask, imagesTask, templateTask));
