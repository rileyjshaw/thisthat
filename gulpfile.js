var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// TODO(riley): get this working for all client assets. Here's Babel!
// gulp.task('default', function () {
// 	return gulp.src('src/**/*.js')
// 		.pipe(sourcemaps.init())
// 		.pipe(babel())
// 		.pipe(concat('all.js'))
// 		.pipe(sourcemaps.write('.'))
// 		.pipe(gulp.dest('dist'));
// });

// gulp.task('lint', function() {
// 	return gulp.src(paths.src.scripts.all)
// 		.pipe($.jshint())
// 		.pipe($.jshint.reporter('default'));
// });

// gulp.task('scripts', [/*'lint'*/], function() {
// 	return browserify(paths.src.scripts.entry, {
// 			insertGlobals: false,
// 			transform: ['reactify'],
// 			debug: false,
// 			standalone: 'screener' // TODO: probably don't need
// 		})
// 		.bundle()
// 		.pipe(source('bundle.js'))
// 		.pipe(gulp.dest(paths.dist))
// 		.pipe($.rename('bundle.min.js'))
// 		.pipe($.streamify( $.uglify() ))
// 		.pipe(gulp.dest(paths.dist))
// });

gulp.task('sass', function () {
	return gulp.src('public/stylesheets/main.sass')
		.pipe($.sass({
			file: 'main.css',
			indentedSyntax: true,
			indentType: 'tab',
			outputStyle: 'compressed',
		}))
		.pipe($.autoprefixer())
		.pipe(gulp.dest('public/dist/stylesheets'))
});

gulp.task('watch', function() {
	gulp.watch(['public/stylesheets/**/*'], ['sass']);
});

gulp.task( 'default', [ 'sass', 'watch' ] );
