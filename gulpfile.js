// /**********************************************************************************************************************
//   1. DEPENDENCIES
// **********************************************************************************************************************/

// var gulp = require('gulp'),                                           // GULP CORE
//   sass = require('gulp-sass');                                        // SASS COMPILER
//   autoprefixer = require('gulp-autoprefixer'),                        // SETS BROWSER PREFIXES
//   plumber = require('gulp-plumber'),                                  // DISABLE INTERRUPTION ON ERROR
//   notify = require('gulp-notify'),                                    // SEND NOTIFICATION TO OSX
//   minifyCSS = require('gulp-cssnano'),                                // MINIFY CSS
//   concatCSS = require('gulp-concat-css'),                             // CONCATENATE ALL CSS FILES
//   browserSync = require('browser-sync');                              // INJECT CHANGES TO BROWSER ( MULTIPLE DEVICES )

// /**********************************************************************************************************************
//   2. FILE DESTINATIONS
// **********************************************************************************************************************/

// var target = {
//   norm_src : 'node_modules/normalize.css/normalize.css',
//   scss_src : 'scss/**/*.scss',                                        // SOURCE OF ALL SCSS FILES
//   css : 'css',                                                        // WHERE TO PUT MINIFIED CSS
//   css_build : 'css/build/'
// };

// /**********************************************************************************************************************
//   2. PUT NORMALIZE IN CSS FOLDER
// **********************************************************************************************************************/

// gulp.task('normaj', function() {
//   return gulp.src(target.norm_src)
//     .pipe(gulp.dest(target.css))
// });

// /**********************************************************************************************************************
//   2. PUT NORMALIZE IN CSS FOLDER
// **********************************************************************************************************************/

// gulp.task('sass', function() {
//   return gulp.src('/scss/*.scss')
//     .pipe(sass)
// });

// /**********************************************************************************************************************
//   3. CONCAT NORMALIZE AND CSS
// **********************************************************************************************************************/

// gulp.task('concat', function() {
//   return gulp.src([target.norm_src, target.scss_src])
//     pipe('style.css')
//     pipe(gulp.dest('/css/build'));
// });

// /**********************************************************************************************************************
//   4. BROWSER SYNC
// **********************************************************************************************************************/

// gulp.task('browser-sync', function() {
//   browserSync.init(['css/*.css'], {                                   // FILES TO INJECT
//     server: {
//       baseDir: './'                                                   // DEVELOPMENT SERVER (LOCAL)
//     }
//   });
// });

// /**********************************************************************************************************************
//   5. GULP TASK
// **********************************************************************************************************************/

// gulp.task('default', function() {
//   gulp.run('normaj', 'sass', 'concat', 'browser-sync');               // RUN TASKS
//   gulp.watch('scss/**/*.scss', function() {                           // RUN SASS TASK WHEN SOMETHING CHANGE
//     gulp.run('sass');
//   });
// });

var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concatCSS = require('gulp-concat-css');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var concatJS = require('gulp-concat');
var plumber = require('gulp-plumber');                                  // DISABLE INTERRUPTION ON ERROR
var browserSync = require('browser-sync');

var target = {
  norm_src : 'node_modules/normalize.css/normalize.css',
  scss_src : 'src/scss/*.scss',                                        // SOURCE OF ALL SCSS FILES
  css : 'build/css'                                                    // WHERE TO PUT MINIFIED CSS
};

/*
  -- TOP LEVEL FUNCTIONS --
  gulp.task - Define tasks
  gulp.src - Point to files to use
  gulp.dest - Points to folder to output
  gulp.watch - Watch files and folders for changes
*/

// npm install gulp gulp-concat

// gulp.task('default', function() {
//   return gulp.src(['foo/*', 'bar/*'])
//     .pipe(concat('result.txt'))
//     .pipe(gulp.dest('build'));
// });

// Logs Message
gulp.task('message', function(){
  return console.log('Gulp is running...');
});

// prebaci jQuery i gridster u dist/vendor/libs
gulp.task('prebaciJS', function() {
  return gulp.src(['bower_components/jquery/dist/jquery.min.js', 'bower_components/gridster-js/dist/jquery.gridster.min.js'])
    .pipe(gulp.dest('dist/js/libs/'));
});

// concatenate libse i napisane skripte i nazovi je main
gulp.task('spojiJS', ['prebaciJS'], function() {
  return gulp.src(['dist/js/libs/*.js', 'src/js/*.js'])
    .pipe(concatJS('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
});

// Add base css
gulp.task('prebaciCSS', function() {
  return gulp.src(['node_modules/normalize.css/normalize.css', 'bower_components/gridster-js/dist/jquery.gridster.min.css'])
    .pipe(gulp.dest('dist/css/libs/'));
});

// Compile Sass
gulp.task('sass', ['prebaciCSS'], function(){
  return gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css/build/'));
});

// Concatenate CSS
gulp.task('concateMin', ['sass'], function() {
  return gulp.src(['dist/css/libs/normalize.css', 'dist/css/libs/jquery.gridster.min.css', 'dist/css/build/style.css'])
    .pipe(concatCSS('main.css'))
    // .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css/'));
});

// Concate All HTML files
gulp.task('copyHtml', function(){
  return gulp.src('src/html/*.html')
    .pipe(gulp.dest('dist/'));
});

// Optimize Images
// gulp.task('imageMin', function() {
//   gulp.src('src/media/*')
//     .pipe(imagemin())
//     .pipe(gulp.dest('dist/media'));
// });

// kojim redoslijedom da se taskovi izvršavaju
gulp.task('default', ['message', 'spojiJS', 'concateMin', 'copyHtml', 'watch']);

gulp.task('watch', function(){
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch(['src/media/*.png', 'src/media/*.jpg'], ['imageMin']);
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('src/*.html', ['copyHtml']);
});
