var gulp           = require('../node_modules/gulp'),
    gutil          = require('../node_modules/gulp-util' ),
    sass           = require('../node_modules/gulp-sass'),
    browserSync    = require('../node_modules/browser-sync'),
    concat         = require('../node_modules/gulp-concat'),
    uglify         = require('../node_modules/gulp-uglify'),
    cleanCSS       = require('../node_modules/gulp-clean-css'),
    rename         = require('../node_modules/gulp-rename'),
    del            = require('../node_modules/del'),
    imagemin       = require('../node_modules/gulp-imagemin'),
    cache          = require('../node_modules/gulp-cache'),
    autoprefixer   = require('../node_modules/gulp-autoprefixer'),
    ftp            = require('../node_modules/vinyl-ftp'),
    notify         = require("../node_modules/gulp-notify");

var validator       = require('../node_modules/gulp-html'),
    ngrok           = require('../node_modules/ngrok'), //сервер для показа заказщику;
    responsive      = require('../node_modules/gulp-responsive'); //нарезка картинок


gulp.task('valid-html', function() { //bem-validate app/index.html
    return gulp.src('dev/*.html')
        .pipe(validator())
        .on('error', function () {
            status = false;
        })
        .on('end', function () {
            console.log('************************* PAGE IS VALID (∪ ◡ ∪) **************************');
        });
});

gulp.task('webserver', function () { //временный сервер для показа заказщику (https://toster.ru/q/323907)
    browserSync.init({
        server: {
            baseDir: "./app"
        },
    }, function (err, bs) {
        ngrok.connect({
            proto: 'http', // http|tcp|tls
            addr: bs.options.get('port'), // port or network address
        }, function (err, url) {
            console.log("Admin: 127.0.0.1:4040");
            console.log(url, err); //выдаст адрес сайта или ошибки в консоли
        });
    });
});



gulp.task('common-js', function() {
    return gulp.src([
        'app/js/common.js',
    ])
        .pipe(concat('common.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

gulp.task('js', ['common-js'], function() {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/jQuery.mmenu/dist/jquery.mmenu.all.js', //mobile-menu
        'app/libs/owl.carousel/dist/owl.carousel.js', //carousel
        'app/libs/Parallax-jarallax/jarallax/jarallax.js', //parallax
        'app/libs/Scrollto/scrollto.js', //scroll-to-section
        'app/libs/google-maps-settings/settings-map.js', //google-map
        'app/js/common.min.js' // olways button
    ])
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('app/js'))
        .pipe(uglify()) // Минимизировать весь js (на выбор)
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false,
        // tunnel: true,
        // tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
    });
});

gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(gulp.dest('app/css'))
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(cleanCSS()) // Опционально, закомментировать при отладке
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
    gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('imagemin', function() {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['removedist', 'imagemin', 'sass', 'js'], function() {
    
    var buildFiles = gulp.src([
        'app/*.html',
        'app/.htaccess',
    ]).pipe(gulp.dest('dist'));
    
    var buildCss = gulp.src([
        'app/css/main.min.css',
    ]).pipe(gulp.dest('dist/css'));
    
    var buildJs = gulp.src([
        'app/js/scripts.min.js',
    ]).pipe(gulp.dest('dist/js'));
    
    var buildFonts = gulp.src([
        'app/fonts/**/*',
    ]).pipe(gulp.dest('dist/fonts'));
    
});

gulp.task('deploy', function() {
    
    var conn = ftp.create({
        host:      'hostname.com',
        user:      'username',
        password:  'userpassword',
        parallel:  10,
        log: gutil.log
    });
    
    var globs = [
        'dist/**',
        'dist/.htaccess',
    ];
    return gulp.src(globs, {buffer: false})
        .pipe(conn.dest('/path/to/folder/on/server'));
    
});

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
