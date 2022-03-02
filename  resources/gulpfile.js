/*--------------------------------------------------------
  modules
--------------------------------------------------------*/

let gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  cached = require('gulp-cached'),
  notify = require('gulp-notify'),
  plumber = require('gulp-plumber'),
  sass = require('gulp-sass'),
  watch = require('gulp-watch'),
  encode = require('gulp-convert-encoding'),
  uglify = require('gulp-uglify'),
  pleeease = require('gulp-pleeease'),
  replace = require('gulp-replace'),
  ejs = require('gulp-ejs'),
  rename = require('gulp-rename'),
  fs = require('fs'),
  ejsEncoding;

//------------------------------------------------------------------------------
// SP:sass / scss / css
//------------------------------------------------------------------------------

gulp.task('sp:sass', () => gulp
  .src(`${__dirname}/scss/**/*.scss`)
  .pipe(
    plumber({
      errorHandler: notify.onError('<%= error.message %>'),
    }),
  )
// .pipe(cached('sass'))
  .pipe(
    sass({
      outputStyle: 'expanded',
    }).on('error', sass.logError),
  )
// .pipe(pleeease({
//     minifier: true
// }))
  .pipe(
    autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9', 'ChromeAndroid >= 6', 'Android >= 6', 'iOS >= 9'],
    }),
  )
  .pipe(replace('UTF-8', 'Shift_JIS'))
  .pipe(replace('utf-8', 'Shift_JIS'))
  .pipe(encode({ to: 'Shift_JIS' }))
  .pipe(
    gulp.dest(
      `${__dirname}/../assets/css`,
    ),
  ));


//------------------------------------------------------------------------------
// SP:watch
//------------------------------------------------------------------------------
gulp.task('sp:watch', () => {
  watch(`${__dirname}/scss/**/*.scss`, () => gulp.start('sp:sass'));
});

// sp��watch
gulp.task('sp', ['sp:watch']);

gulp.task('default', ['sp']);
