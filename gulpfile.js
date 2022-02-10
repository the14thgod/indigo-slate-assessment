var gulp = require('gulp'), // https://www.npmjs.com/package/gulp
	clean = require('gulp-clean'), // https://www.npmjs.com/package/gulp-clean
	sass = require('gulp-sass'), // https://www.npmjs.com/package/gulp-sass
	sourcemaps = require('gulp-sourcemaps'), // https://www.npmjs.com/package/gulp-sourcemaps
	//include = require('gulp-include'), // https://www.npmjs.com/package/gulp-include
	babel = require('gulp-babel'), // https://www.npmjs.com/package/gulp-babel
	imagemin = require('gulp-imagemin'); // https://www.npmjs.com/package/gulp-imagemin, refer to individual gif/png/svg/jpg plugins

// Tasks

	// Cleaners
		gulp.task('clean', function(){
			return gulp.src('dist', {read: false, allowEmpty: true})
				.pipe(clean())
		});

		gulp.task('clean-sass', function(){
			return gulp.src('dist/css', {read: false, allowEmpty: true})
				.pipe(clean())
		});

		gulp.task('clean-images', function(){
			return gulp.src('dist/media/images', {read: false, allowEmpty: true})
				.pipe(clean())
		});

		gulp.task('clean-js', function(){
			return gulp.src('dist/js', {read: false, allowEmpty: true})
				.pipe(clean())
		});

	// CSS Tasks - Sass

		// Components
		gulp.task('sass-components', function(){
			return gulp.src(['dev/css/components/*.scss', 'dev/css/astral/*.scss', 'dev/css/vendor/*.scss'], {base: 'dev/css'})
				.pipe(sourcemaps.init())
				.pipe(sass({
					outputStyle: 'compressed'
				}))
				.pipe(sourcemaps.write(''))
				.pipe(gulp.dest('dist/css'))
		});

		// Core
		gulp.task('sass', gulp.series('clean-sass', 'sass-components', function(){
			return gulp.src('dev/css/main.scss')
				.pipe(sourcemaps.init())
				.pipe(sass({
					outputStyle: 'compressed'
				}))
				.pipe(sourcemaps.write(''))
				.pipe(gulp.dest('dist/css'))
		}));

	// JS Tasks

		// Move files already minified
		// DEV Note: we do this for easy maintainability; referencing all from dist instead some files form dev and some from dist
		gulp.task('js-move', function(){
			return gulp.src(['dev/js/astral/*.js', 'dev/js/vendor/*.js'], {base: 'dev/js'})
				.pipe(gulp.dest('dist/js'))
		});

		// JS - Main
		gulp.task('js', gulp.series('clean-js', 'js-move', function(){
			return gulp.src(['dev/js/astral/Astral.js','dev/js/modules/*.js','dev/js/utilities/*.js'], {base: 'dev/js'})
				.pipe(sourcemaps.init())
				.pipe(babel({
					minified: true,
					comments: false
				}))
				.pipe(sourcemaps.write(''))
				.pipe(gulp.dest('dist/js'))
		}));

	// Images - Optimize
		gulp.task('images', gulp.series('clean-images', function(){
			return gulp.src('dev/media/images/**/*.*')
				.pipe(imagemin())
				.pipe(gulp.dest('dist/media/images'))
		}));

	// Build(Default)
		gulp.task('default', gulp.series('sass', 'js', 'images'), function(){});


// Watchers
	gulp.task('watch', function(){
		gulp.watch('dev/css/**/*.scss', gulp.series('sass'));
		gulp.watch('dev/js/**/*.js', gulp.series('js'));
		gulp.watch('dev/media/images/**/*.*', gulp.series('images'));
	});
