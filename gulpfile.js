var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    runSequence = require('run-sequence'),
    path = require('path'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    Q = require('q');



var config = {
    app: 'src',
    dist: 'dist',
    bowerDir: 'libs/components',
    capDist: '../webapp',
    indexFile: '/index.html'
};




gulp.task('clean', function() {
    return gulp.src(['.tmp', config.dist], {
        read: false
    }).pipe($.clean({
        force: true
    }));
});

gulp.task("htmlmin", function() {
    return gulp.src("src/*.html", {
        base: 'src'
    }).pipe($.htmlmin({})).pipe(gulp.dest("dist"));
});

gulp.task("imagemin", function() {
    return gulp.src("src/images/**/*", {
        base: 'src'
    }).pipe($.imagemin({})).pipe(gulp.dest("dist"));
});

gulp.task("ngmin", function() {
    return gulp.src(["dist/scripts/*.js", "dist/*.js"], {
        base: 'dist'
    }).pipe($.ngmin({

    })).pipe(gulp.dest("dist"));
})

gulp.task('compass', function() {
    return gulp.src(["./src/styles/*.scss"], {
            base: 'src'
        }) /*.pipe($.plumber())*/ .pipe($.compass({
            'require': ['susy', 'breakpoint', 'animate', 'compass-flexbox'],
            //'project': path.join(__dirname),
            'css': 'src/build/styles',
            'sass': 'src/styles',
            'scss': 'src/styles',
            'generated_images_dir': '.tmp/images/generated',
            'image': 'src/images',
            'javascript': 'src/scripts',
            'font': 'src/styles/fonts',
            'import_path': 'src/libs',
            'http_images_path': 'src/images',
            'http_generated_images_path': 'src/images/generated',
            'http_fonts_path': 'src/styles/fonts',
            // 'line_comments': true,
            'time': true,
            'comments': true,
            'force': true,
            // 'relativeAssets': false,
            'debug': true,
            // 'config_file': 'config.rb'
            // 'bundle_exec': true
            // ,debug: true
            // , project: path.join(__dirname)
            // , sass: 'source/styles'
            // , css: 'source/build/styles'
            // , font: 'source/fonts'
        })).pipe(gulp.dest(".tmp"))
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task('compassDist', function() {
    return gulp.src(["./src/styles/*.scss"], {
            base: 'src'
        }) /*.pipe($.plumber())*/ .pipe($.compass({
            'require': ['susy', 'breakpoint', 'animate', 'compass-flexbox'],
            //'project': path.join(__dirname),
            'css': 'src/build/styles',
            'sass': 'src/styles',
            'scss': 'src/styles',
            'generated_images_dir': '.tmp/images/generated',
            'image': 'src/images',
            'javascript': 'src/scripts',
            'font': 'src/styles/fonts',
            'import_path': 'src/libs',
            'http_images_path': 'src/images',
            'http_generated_images_path': 'src/images/generated',
            'http_fonts_path': 'src/styles/fonts',
            // 'line_comments': true,
            'time': true,
            'comments': true,
            'force': true,
            // 'relativeAssets': false,
            'debug': true,
            // 'config_file': 'config.rb'
            // 'bundle_exec': true
            // ,debug: true
            // , project: path.join(__dirname)
            // , sass: 'source/styles'
            // , css: 'source/build/styles'
            // , font: 'source/fonts'
        })).pipe(gulp.dest("dist"))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('copy', function() {
    return gulp.src([
        'src/*.{ico,png,txt,html}',
        'src/scripts/**/*',
        'src/libs/*',
        'src/libs/{components-fix,modules}/**/*',
        'src/libs/components/requirejs/require.min.js',
        'src/libs/components/requirejs/require.js',
        'src/libs/components/font-awesome/**/*',
        'src/fonts/**/*'
        //,
        // 'src/styles/fonts/*'
        //'src/.htaccess',
    ], {
        base: "src"
    }).pipe(gulp.dest(config.dist));
});


gulp.task('requirejs', function() {

    var options = {
        baseUrl: 'src',
        name: "main", // assumes a production build using almond
        out: 'main.js',
        optimize: 'none',
        paths: {
            'jquery': 'libs/components/jquery/dist/jquery',
            'socket-io': 'libs/components/socket.io-client/socket.io',
            'angular': 'libs/components/angular/angular',
            'angular-animate': 'libs/components/angular-animate/angular-animate',
            'angular-resource': 'libs/components/angular-resource/angular-resource',
            'angular-sanitize': 'libs/components/angular-sanitize/angular-sanitize',
            'angular-socket-io': 'libs/components/angular-socket-io/socket',
            // 'angular-mocks': 'libs/components/angular-mocks/angular-mocks',
            'angular-ui-router': 'libs/components/angular-ui-router/release/angular-ui-router',
            'angular-ui-bootstrap': 'libs/components/angular-bootstrap/ui-bootstrap',
            'angular-ui-utils': 'libs/components/angular-ui-utils/ui-utils',
            'angular-ui-utils-hiv': 'libs/components/angular-ui-utils/ui-utils-ieshiv.min',
            'angular-validation': 'libs/components/angular-validation/dist/angular-validation',
            'angular-local-storage': 'libs/components/angular-local-storage/angular-local-storage',
            'oc-lazy-load': 'libs/components/ocLazyLoad/dist/ocLazyLoad',
            'tether-utils': 'libs/components/tether/js/utils',
            'tether': 'libs/components/tether/js/tether',
            //'angular-tooltip': 'libs/components/angular-tooltip/src/angular-tooltip',
            'angular-modal': 'libs/components-fixed/angular-modal',
            //deviceAgent
            'xmlRPC': 'libs/components/jquery-xmlrpc/jquery.xmlrpc',


            'libs': 'libs/libs',
            'cabin': 'libs/cabin',
            'cabin-core': 'libs/modules/core/cabin-core',
            'cabin-directives': 'libs/modules/directives/cabin-directives',
            'cabin-modals': 'libs/modules/modals/cabin-modals',
            'cabin-services': 'libs/modules/services/cabin-services',
            'cabin-validations': 'libs/modules/validations/cabin-validations',
            'cabin-cust': 'scripts/customize-libs',
            'app': 'scripts/app',

            //customize
            'appCtrl': 'scripts/ctrl/appCtrl',

            'cabinCoreModule': 'libs/modules/core/module',
            'cbLazyInitialServ': 'libs/modules/core/cabin-lazyInitialServ',
            'cbModule': 'libs/modules/core/cabin-module',
            'cbTxnRouterLoaderServ': 'libs/modules/core/cabin-txnRouterLoaderServ',
            'cbLazyRegisterServ': 'libs/modules/core/cabin-lazyRegisterServ',


            // Directives
            'cabinDirectivesModule': 'libs/modules/directives/module',
            'cbBehavior': 'libs/modules/directives/cabin-behavior/cabin-behavior',
            'cbSplitter': 'libs/modules/directives/cabin-splitter/cabin-splitter',
            'cbNotify': 'libs/modules/directives/cabin-notify/cabin-notify',
            'cbTopMenu': 'libs/modules/directives/cabin-topMenu/cabin-topMenu',
            'cbSideMenu': 'libs/modules/directives/cabin-sideMenu/cabin-sideMenu',
            'cbPageViewer': 'libs/modules/directives/cabin-pageViewer/cabin-pageViewer',
            'cbGrid': 'libs/modules/directives/cabin-grid/cabin-grid',
            'cbComboBox': 'libs/modules/directives/cabin-comboBox/cabin-comboBox',
            'cbMaskNumber': 'libs/modules/directives/cabin-mask/cabin-mask-number',
            'cbSocketStatus': 'libs/modules/directives/cabin-socketStatus/cabin-socketStatus',
            'cabinModalsModule': 'libs/modules/modals/module',
            'cbCommonModal': 'libs/modules/modals/cabin-commonModal/cabin-commonModal',
            'cabinServicesModule': 'libs/modules/services/module',
            'cbUtils': 'libs/modules/services/cabin-utils',
            'cbWebSocketIoServ': 'libs/modules/services/cabin-websocket-io',
            'cbDeviceAgent': 'libs/modules/services/cabin-deviceAgent/cabin-deviceAgent',
            'cbValidationServ': 'libs/modules/services/cabin-validation',
            'taiwanId': 'libs/modules/validations/taiwanId',
            //append cust


            //cust
            'custModule': 'scripts/module',
            //services
            'iBranchServ': 'scripts/services/iBranchServ',
            'userServ': 'scripts/services/userServ',
            //modals
            'cbEjContextModal': 'scripts/modals/cabin-ejContextModal/cabin-ejContextModal',
            'cbOpenTxnModal': 'scripts/modals/cabin-openTxnModal/cabin-openTxnModal',
            'cbSupeviseModal': 'scripts/modals/cabin-supeviseModal/cabin-supeviseModal',
            'cbSupeviseRequireModal': 'scripts/modals/cabin-supeviseRequireModal/cabin-supeviseRequireModal',
            //validations
            'ACNOVal': 'scripts/validations/common/ACNOVal',
            'readMsr': 'scripts/validations/common/readMsr',
            'txn000045ACNOVal': 'scripts/validations/txn000045/txn000045ACNOVal',
            'txn120606ACNOVal': 'scripts/validations/txn120606/txn120606ACNOVal',
            'txn120606COPY': 'scripts/validations/txn120606/txn120606COPY',

            //mock package will add ../
            'angular-mocks': 'libs/components/angular-mocks/angular-mocks',
            'http-mock': '../test/_httpMock/define',
            'last': '../test/_httpMock/last',
            'queryMenu': '../test/_httpMock/queryMenu',
            'queryComboBox': '../test/_httpMock/queryComboBox',
            'iBranchTest': '../test/_httpMock/iBranchTest'


        }
    };


    return gulp.src('src/main.js', {
            base: 'src'
        })
        .pipe($['requirejsOptimize'](options))
        .pipe(gulp.dest('dist'));


    // var deferred = Q.defer();
    //    $.requirejs({
    //            baseUrl: 'src',
    //            name: "main", // assumes a production build using almond
    //            out: 'main.js',
    //            optimize: 'none',
    //            paths: {
    //                'jquery': 'libs/components/jquery/dist/jquery',
    //                'socket-io': 'libs/components/socket.io-client/socket.io',
    //                'angular': 'libs/components/angular/angular',
    //                'angular-animate': 'libs/components/angular-animate/angular-animate',
    //                'angular-resource': 'libs/components/angular-resource/angular-resource',
    //                'angular-sanitize': 'libs/components/angular-sanitize/angular-sanitize',
    //                'angular-socket-io': 'libs/components/angular-socket-io/socket',
    //                // 'angular-mocks': 'libs/components/angular-mocks/angular-mocks',
    //                'angular-ui-router': 'libs/components/angular-ui-router/release/angular-ui-router',
    //                'angular-ui-bootstrap': 'libs/components/angular-bootstrap/ui-bootstrap',
    //                'angular-ui-utils': 'libs/components/angular-ui-utils/ui-utils',
    //                'angular-ui-utils-hiv': 'libs/components/angular-ui-utils/ui-utils-ieshiv.min',
    //                'angular-validation': 'libs/components/angular-validation/dist/angular-validation',
    //                'angular-local-storage': 'libs/components/angular-local-storage/angular-local-storage',
    //                'oc-lazy-load': 'libs/components/ocLazyLoad/dist/ocLazyLoad',
    //                'tether-utils': 'libs/components/tether/js/utils',
    //                'tether': 'libs/components/tether/js/tether',
    //                //'angular-tooltip': 'libs/components/angular-tooltip/src/angular-tooltip',
    //                'angular-modal': 'libs/components-fixed/angular-modal',
    //                //deviceAgent
    //                'xmlRPC': 'libs/components/jquery-xmlrpc/jquery.xmlrpc',


    //                'libs': 'libs/libs',
    //                'cabin': 'libs/cabin',
    //                'cabin-core': 'libs/modules/core/cabin-core',
    //                'cabin-directives': 'libs/modules/directives/cabin-directives',
    //                'cabin-modals': 'libs/modules/modals/cabin-modals',
    //                'cabin-services': 'libs/modules/services/cabin-services',
    //                'cabin-validations': 'libs/modules/validations/cabin-validations',
    //                'cabin-cust': 'scripts/customize-libs',
    //                'app': 'scripts/app',

    //                //customize
    //                'appCtrl': 'scripts/ctrl/appCtrl',

    //                'cabinCoreModule': 'libs/modules/core/module',
    //                'cbLazyInitialServ': 'libs/modules/core/cabin-lazyInitialServ',
    //                'cbModule': 'libs/modules/core/cabin-module',
    //                'cbTxnRouterLoaderServ': 'libs/modules/core/cabin-txnRouterLoaderServ',
    //                'cbLazyRegisterServ': 'libs/modules/core/cabin-lazyRegisterServ',


    //                // Directives
    //                'cabinDirectivesModule': 'libs/modules/directives/module',
    //                'cbBehavior': 'libs/modules/directives/cabin-behavior/cabin-behavior',
    //                'cbSplitter': 'libs/modules/directives/cabin-splitter/cabin-splitter',
    //                'cbNotify': 'libs/modules/directives/cabin-notify/cabin-notify',
    //                'cbTopMenu': 'libs/modules/directives/cabin-topMenu/cabin-topMenu',
    //                'cbSideMenu': 'libs/modules/directives/cabin-sideMenu/cabin-sideMenu',
    //                'cbPageViewer': 'libs/modules/directives/cabin-pageViewer/cabin-pageViewer',
    //                'cbGrid': 'libs/modules/directives/cabin-grid/cabin-grid',
    //                'cbComboBox': 'libs/modules/directives/cabin-comboBox/cabin-comboBox',
    //                'cbMaskNumber': 'libs/modules/directives/cabin-mask/cabin-mask-number',
    //                'cbSocketStatus': 'libs/modules/directives/cabin-socketStatus/cabin-socketStatus',
    //                'cabinModalsModule': 'libs/modules/modals/module',
    //                'cbCommonModal': 'libs/modules/modals/cabin-commonModal/cabin-commonModal',
    //                'cabinServicesModule': 'libs/modules/services/module',
    //                'cbUtils': 'libs/modules/services/cabin-utils',
    //                'cbWebSocketIoServ': 'libs/modules/services/cabin-websocket-io',
    //                'cbDeviceAgent': 'libs/modules/services/cabin-deviceAgent/cabin-deviceAgent',
    //                'cbValidationServ': 'libs/modules/services/cabin-validation',
    //                'taiwanId': 'libs/modules/validations/taiwanId',
    //                //append cust


    //                //cust
    //                'custModule': 'scripts/module',
    //                //services
    //                'iBranchServ': 'scripts/services/iBranchServ',
    //                'userServ': 'scripts/services/userServ',
    //                //modals
    //                'cbEjContextModal': 'scripts/modals/cabin-ejContextModal/cabin-ejContextModal',
    //                'cbOpenTxnModal': 'scripts/modals/cabin-openTxnModal/cabin-openTxnModal',
    //                'cbSupeviseModal': 'scripts/modals/cabin-supeviseModal/cabin-supeviseModal',
    //                'cbSupeviseRequireModal': 'scripts/modals/cabin-supeviseRequireModal/cabin-supeviseRequireModal',
    //                //validations
    //                'ACNOVal': 'scripts/validations/common/ACNOVal',
    //                'readMsr': 'scripts/validations/common/readMsr',
    //                'txn000045ACNOVal': 'scripts/validations/txn000045/txn000045ACNOVal',
    //                'txn120606ACNOVal': 'scripts/validations/txn120606/txn120606ACNOVal',
    //                'txn120606COPY': 'scripts/validations/txn120606/txn120606COPY',

    //                //mock package will add ../
    //                'angular-mocks': 'libs/components/angular-mocks/angular-mocks',
    //                'http-mock': '../test/_httpMock/define',
    //                'last': '../test/_httpMock/last',
    //                'queryMenu': '../test/_httpMock/queryMenu',
    //                'queryComboBox': '../test/_httpMock/queryComboBox',
    //                'iBranchTest': '../test/_httpMock/iBranchTest'


    //            }
    //        })
    //        .pipe(gulp.dest('dist')).pipe($.callback(function(){
    //          deferred.resolve("ok");
    //        }));

    //        return deferred.promise;
});

gulp.task('watch', function() {
    gulp.watch(['src/styles/**/*.scss'], ['compass']);
    gulp.watch(['src/scripts/**/*.js'], reload);
});

gulp.task('default', function() {
    return runSequence('clean', 'compass', 'watch', function() {
        browserSync({
            server: {
                baseDir: ["src", ".tmp", "test"],
                middleware: [require('connect-history-api-fallback')]
            },
            open: false,
            injectChanges: true,
            startPath: "/"
        });

    });
});



gulp.task('build', function() {
    return runSequence('clean', 'compassDist', 'imagemin', 'htmlmin', 'copy', 'requirejs', function() {
        browserSync({
            server: {
                baseDir: ["dist", "test"],
                middleware: [require('connect-history-api-fallback')]
            },
            open: false,
            injectChanges: true,
            startPath: "/"
        });

    });
});
