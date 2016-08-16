var gulp = require('gulp'),
    inject = require('gulp-inject'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    runSequence = require('run-sequence'),
    clean = require('gulp-clean');

var jsSources = ['app/js/**/*.js'],
    cssSources = ['app/css/**/*.scss'],
    htmlSources = ['**/*.html'];

gulp.task('clean', function(){
    return gulp.src('./app/build/*.*', {read: false})
    .pipe(clean());
});

/**JS gulp tasks*****************************************************************/
gulp.task('concatJs', function(){
    return gulp.src(['node_modules/angular/angular.min.js', 'node_modules/angular-toastr/dist/angular-toastr.tpls.js', './app/js/**/*.js', './app/secrets/keys.value.js'])
    .pipe(concat('build.js'))
    .pipe(gulp.dest('./app/build/'))
});

/**CSS gulp tasks*****************************************************************/
gulp.task('compileSass', function(){
    return gulp.src(['node_modules/materialize-css/sass/materialize.scss', 'node_modules/angular-toastr/dist/angular-toastr.css',,'./app/css/*.scss'])
    .pipe(sass())
    //and concatenates them
    .pipe(concat('build.css'))
    .pipe(gulp.dest('./app/build/'))
});

gulp.task('inject', function(){
    var sources = gulp.src(['./app/build/*.css', './app/build/*.js'], {read: false})
    return gulp.src('./app/index.html')
        .pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('./app'));
});

gulp.task('connect', function(){
    return connect.server({
        root: './app',
        livereload: true,
        port: 8887
    })
});

//checks js/html/css on change...
gulp.task('watch', function() {
    gulp.watch(jsSources, ['js', 'concatJs']);
    gulp.watch(cssSources, ['css', 'compileSass']);
    gulp.watch(htmlSources, ['html']);
});

//...and reloads
gulp.task('js', function() {
    gulp.src(jsSources)
        .pipe(connect.reload())
});

gulp.task('html', function() {
    gulp.src(htmlSources)
        .pipe(connect.reload())
});

gulp.task('css', function() {
    gulp.src(cssSources)
        .pipe(connect.reload())
});

gulp.task('serve', function(done) {
    runSequence('clean', 'concatJs', 'compileSass', 'inject', 'connect', 'watch', function() {
        done();
    });
});