var argv         = require('yargs').argv,
    autoprefixer = require('autoprefixer'),
    babel        = require('gulp-babel'),
    bs           = require('browser-sync'),
    concat       = require('gulp-concat'),
    config       = require('./config.json'),
    del          = require('del'),
    gulp         = require('gulp'),
    cleancss     = require('gulp-clean-css'),
    gulpif       = require('gulp-if'),
    gutil        = require('gulp-util');
    imagemin     = require('gulp-imagemin'),
    jade         = require('gulp-jade'),
    plumber      = require('gulp-plumber'),
    postcss      = require('gulp-postcss'),
    rename       = require('gulp-rename'),
    sass         = require('gulp-sass'),
    sequence     = require('run-sequence'),
    sourcemaps   = require('gulp-sourcemaps'),
    uglify       = require('gulp-uglify'),
    useref       = require('gulp-useref');

// Helper Functions
function build() {
    var tasks = [
        'styles',
        'scripts',
        'images',
        'fonts',
    ];

    //Optional tasks here (if flag exists push to array)
    if(argv.jade) {
        tasks.push('jade');
    }

    // End of optional tasks

    sequence('clear', tasks);
}


// Gulp Tasks

// Delete Output directory
gulp.task('clear', function() {
    return del.sync(['./' + config.paths.output]);
});

// Compile Sass, Autoprefix and minify
gulp.task('styles', function() {
    // app.scss
    gulp.src([
        config.paths.assets + '/styles/app.scss'
    ])
    .pipe(plumber(function(error) {
        gutil.log(gutil.colors.red(error.message));
        this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({
        includePaths: [
            config.paths.bower + '/foundation-sites/scss',
            config.paths.bower + '/motion-ui/src'
        ]
    }))
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3'] }) ]))
    .pipe(gulp.dest('./' + config.paths.output + '/css/'))
    .pipe(gulpif(argv.production, rename({suffix: '.min'})))
    .pipe(gulpif(argv.production, cleancss()))
    .pipe(sourcemaps.write('.')) 
    .pipe(gulp.dest('./' + config.paths.output + '/css/'));

    // inline.scss
    gulp.src([
        config.paths.assets + '/styles/inline*.scss'
    ])
    .pipe(plumber(function(error) {
        gutil.log(gutil.colors.red(error.message));
        this.emit('end');
    }))
    .pipe(sass({
        includePaths: [
            config.paths.bower + '/foundation-sites/scss'
        ]
    }))
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3'] }) ]))
    .pipe(gulp.dest('./' + config.paths.output + '/css/'))
    .pipe(gulpif(argv.production, rename({suffix: '.min'})))
    .pipe(gulpif(argv.production, cleancss()))
    .pipe(gulp.dest('./' + config.paths.output + '/css/'));

    // woocommerce.scss
    gulp.src([
        config.paths.assets + '/styles/woocommerce.scss'
    ])
    .pipe(plumber(function(error){
        gutil.log(gutil.colors.red(error.message));
        this.emit('end');
    }))
    .pipe(sass({
        includePaths: [
            config.paths.bower + '/foundation-sites/scss'
        ]
    })) 
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3'] }) ]))
    .pipe(gulp.dest('./' + config.paths.output + '/css/'))
    .pipe(gulpif(argv.production, rename({suffix: '.min'})))
    .pipe(gulpif(argv.production, cleancss()))
    .pipe(gulp.dest('./' + config.paths.output + '/css/'));
});


gulp.task('scripts', function() {
    // Foundation Scripts
    gulp.src([   
        // Necessary
        config.paths.bower + '/foundation-sites/js/foundation.core.js',
        config.paths.bower + '/foundation-sites/js/foundation.util.*.js',

        // Optional
        config.paths.bower + '/foundation-sites/js/foundation.abide.js',
        config.paths.bower + '/foundation-sites/js/foundation.accordion.js',
        config.paths.bower + '/foundation-sites/js/foundation.accordionMenu.js',
        config.paths.bower + '/foundation-sites/js/foundation.drilldown.js',
        config.paths.bower + '/foundation-sites/js/foundation.dropdown.js',
        config.paths.bower + '/foundation-sites/js/foundation.dropdownMenu.js',
        config.paths.bower + '/foundation-sites/js/foundation.equalizer.js',
        config.paths.bower + '/foundation-sites/js/foundation.interchange.js',
        config.paths.bower + '/foundation-sites/js/foundation.magellan.js',
        config.paths.bower + '/foundation-sites/js/foundation.offcanvas.js',
        config.paths.bower + '/foundation-sites/js/foundation.orbit.js',
        config.paths.bower + '/foundation-sites/js/foundation.responsiveMenu.js',
        config.paths.bower + '/foundation-sites/js/foundation.responsiveToggle.js',
        config.paths.bower + '/foundation-sites/js/foundation.reveal.js',
        config.paths.bower + '/foundation-sites/js/foundation.slider.js',
        config.paths.bower + '/foundation-sites/js/foundation.sticky.js',
        config.paths.bower + '/foundation-sites/js/foundation.tabs.js',
        config.paths.bower + '/foundation-sites/js/foundation.toggler.js',
        config.paths.bower + '/foundation-sites/js/foundation.tooltip.js',
    ])
    .pipe(babel({
        presets: ['es2015'],
        compact: true
    }))
    .pipe(sourcemaps.init())
    .pipe(concat('foundation.js'))
    .pipe(gulp.dest('./' + config.paths.output + '/js'))
    .pipe(gulpif(argv.production, rename({suffix: '.min'})))
    .pipe(gulpif(argv.production, uglify()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./' + config.paths.output + '/js'));

    // Bower
    gulp.src([
        config.paths.bower  + '/please-wait/build/please-wait.min.js'
    ])
    .pipe(rename('preloader.min.js'))
    .pipe(gulp.dest('./' + config.paths.output + '/js'));

    // All js scripts inside scripts folder
    return gulp.src([
        config.paths.assets  + '/scripts/**/*.js'
    ])
    .pipe(babel({
        presets: ['es2015'],
        compact: true
    }))
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./' + config.paths.output + '/js'))
    .pipe(gulpif(argv.production, rename({suffix: '.min'})))
    .pipe(gulpif(argv.production, uglify()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./' + config.paths.output + '/js'));
});

// Image Optimization
gulp.task('images', function() {
    return gulp.src([
        config.paths.assets + '/images/**/*'
    ])
    .pipe(imagemin({
        progressive: true,
        interlaced: true,
        svgoPlugins: [{removeUnknownsAndDefaults: false}, {cleanupIDs: false}]
    }))
    .pipe(gulp.dest('./' + config.paths.output + '/images/'));
});

// Copy Fonts
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest(config.paths.output + '/fonts'))
});

// Optional Tasks
gulp.task('jade', function() {
    return gulp.src([
        './jade/**/*.jade'
    ])
    .pipe(jade({
      pretty: true
    }))
    .pipe(useref({searchPath: ['bower_components']}))
    .pipe(gulp.dest('./' + config.paths.output));
});

// Build Task
gulp.task('build', function() {
    build();
});

// Build and Serve with BrowserSync
gulp.task('serve', function() {
    build();

    bs.init({
        files: [
            './' + config.paths.output + '/css/**/*.css', 
            './' + config.paths.output + '/js/**/*.js',
            '**/*.php',
            './' + config.paths.output + '/images/**/*.{png,jpg,gif,svg,webp}',
        ],
        proxy: "http://vccw.dev/"
    });

    gulp.watch(config.paths.assets + '/styles/**/*.scss', ['styles']);
    gulp.watch(config.paths.assets + '/scripts/**/*.js', ['scripts']);
    gulp.watch('./useref/**/*.php', ['useref']);
    if(argv.jade)
        gulp.watch('./jade/**/*.jade', ['jade', bs.reload]);

});

// Default Task
gulp.task('default', ['serve']);