// Generated on 2013-08-12 using generator-angular 0.3.0
'use strict';
var fs = require('fs');
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
    port: LIVERELOAD_PORT
});
var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};
var modRewrite = require('connect-modrewrite');
var extend = require('node.extend');

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'src',
        dist: 'dist',
        bowerDir: 'libs/components',
        capDist: '../webapp'
    };



    try {
        yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
    } catch (e) {}
    try {
        yeomanConfig.project = require('./config.json');
    } catch (e) {
        yeomanConfig.project = {};
    }

    extend({
        indexFile: "/index.html",
        proxies: []
    }, yeomanConfig.project);

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            options: {
                nospawn: true
            },
            coffee: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['test/spec/{,*/}*.coffee'],
                tasks: ['coffee:test']
            },
            compass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}',
                    '<%= yeoman.app %>/libs/modules/**/*.{scss,sass}'
                ],
                tasks: ['compass:server']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    //'<%= yeoman.app %>/{,*/}*.html',
                    '<%= yeoman.app %>/{,*/,*/*/,*/*/*/,*/*/*/*/,*/*/*/*/*/}*.html',
                    '{.tmp,<%= yeoman.app %>}/libs/{,*/,*/*/,*/*/*/,*/*/*/*/,*/*/*/*/*/}*.js',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*/,*/*/,*/*/*/,*/*/*/*/,*/*/*/*/*/}*.css',
                    '<%= yeoman.app %>/scripts/{,*/,*/*/,*/*/*/,*/*/*/*/,*/*/*/*/*/}*.js',
                    '<%= yeoman.app %>/images/{,*/,*/*/,*/*/*/,*/*/*/*/,*/*/*/*/*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            },
            watchValid: {
                files: ['<%= yeoman.app %>/scripts/validations/{,*/,*/*/,*/*/*/,*/*/*/*/,*/*/*/*/*/}*.js',
                    '<%= yeoman.app %>/libs/modules/validations-template.js'
                ],
                tasks: ['string-replace']
            },
            capCoffee: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
                tasks: ['coffee:capDist']
            },
            capCompass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}',
                    '<%= yeoman.app %>/libs/modules/**/*.{scss,sass}'
                ],
                tasks: ['compass:capDist']
            },
            // capImage: {
            //   files: ['<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'],
            //   tasks: ['copy:capDev']
            // },
            capJavscript: {
                files: [
                    '<%= yeoman.app %>/scripts/**/*.js'
                    //,'<%= yeoman.app %>/libs/**/*.js'
                ],
                tasks: ['copy:capDev']
            },
            capHtml: {
                files: ['<%= yeoman.app %>/{*,views/**/*}.{ico,png,txt,html}'],
                tasks: ['copy:capDev']
            }
        },
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                //hostname: 'localhost'
                hostname: '0.0.0.0'
            },
            proxies: yeomanConfig.project.proxies,
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            lrSnippet,
                            require('grunt-connect-proxy/lib/utils').proxyRequest,
                            modRewrite([
                                '!\\.html|login|\\.pdf|\\.js|\\.css|\\.swf|\\.jp(e?)g|\\.png|\\.gif|\\.eot|\\.woff|\\.ttf|\\.svg|\\.ico$ ' + yeomanConfig.project.indexFile
                            ]),
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test'),
                            mountFolder(connect, yeomanConfig.app),
                            function(req, res, next) {
                                res.setHeader('Access-Control-Allow-Origin', '*');
                                res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                                res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

                                // don't just call next() return it
                                return next();
                            }
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function(connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function(connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            options: {
                force: true
            },
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp',
            cap: {
                files: [{
                    //dot: true,
                    cwd: '<%= yeoman.capDist %>',
                    src: (function() {
                        //  var ignoreCleanFiles = [
                        //     '!/WEB-INF',
                        //     '!/META-INF'
                        // ];

                        var files = fs.readdirSync(yeomanConfig.app).map(function(files) {
                            return yeomanConfig.capDist + '/' + files;
                        });
                        var files = [yeomanConfig.capDist + '/images/generated'].concat(files);
                        return files;
                    })()
                }]
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js'
            ]
        },
        coffee: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/scripts',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/scripts',
                    ext: '.js'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'test/spec',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/spec',
                    ext: '.js'
                }]
            },
            capDist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/scripts',
                    src: '{,*/}*.coffee',
                    dest: '<%= yeoman.capweb %>/scripts',
                    ext: '.js'
                }]
            }
        },
        compass: {
            options: {
                require: ['susy', 'breakpoint', 'animate', 'compass-flexbox'],
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: '<%= yeoman.app %>/libs',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                line_comments: false,
                // config: '<%= yeoman.app %>/styles/config/config.rb',
                relativeAssets: true
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            },
            capDist: {
                options: {
                    cssDir: '<%= yeoman.capDist %>/styles',
                    generatedImagesDir: '<%= yeoman.capDist %>/images/generated',
                }
            }
        },
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
      dist: {}
    },*/
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        },
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            // By default, your `index.html` <!-- Usemin Block --> will take care of
            // minification. This option is pre-configured if you do not wish to use
            // Usemin blocks.
            // dist: {
            //   files: {
            //     '<%= yeoman.dist %>/styles/main.css': [
            //       '.tmp/styles/{,*/}*.css',
            //       '<%= yeoman.app %>/styles/{,*/}*.css'
            //     ]
            //   }
            // }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: ['*.html', 'views/*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '<%= yeoman.bowerDir %>/**/*',
                        'images/{,*/}*.{gif,webp,svg}',
                        'styles/fonts/*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: [
                        'generated/*'
                    ]
                }]
            },
            capDev: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.capDist %>',
                    src: [
                        '{*,views/**/*}.{ico,png,txt,html}',
                        '*.{ico,png,txt,html}',
                        //'.htaccess',
                        //'images/{,*/}*.{png,gif,webp,svg}',
                        //'scripts/**/*.js',
                        //'libs/*.js',
                        'styles/fonts/*'
                    ]
                }]
            },
            poc: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '{*,views/**/*}.{ico,png,txt,html}',
                        '*.{ico,png,txt,html}',
                        'scripts/**/*',
                        'libs/*',
                        'libs/{components-fix,modules}/**/*',
                        'libs/components/requirejs/require.min.js',
                        'libs/components/font-awesome/**/*',
                        //'.htaccess',
                        //'images/{,*/}*.{png,gif,webp,svg}',
                        //'scripts/**/*.js',
                        //'libs/*.js',
                        'fonts/**/*'
                    ]
                }]
            },

            // ,
            // capLibs:{
            //   files: [{
            //     expand: true,
            //     dot: true,
            //     cwd: '<%= yeoman.app %>',
            //     dest: '<%= yeoman.capDist %>',
            //     src: [
            //       '<%= yeoman.bowerDir %>/**/*'
            //     ]
            //   }]
            // }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            server: [
                'coffee:dist',
                'compass:server'
            ],
            test: [
                'coffee',
                'compass'
            ],
            dist: [
                'coffee',
                'compass:dist',
                'imagemin',
                'htmlmin'
            ],
            watchServer: [
                'watch:compass',
                'watch:livereload',
                'watch:coffee',
                'watch:coffeeTest',
                //forpoc
                'watch:watchValid'
            ],
            capWatch: [
                'watch:capCoffee',
                'watch:capCompass',
                //'watch:capImage',
                'watch:capJavscript',
                'watch:capHtml'
            ]
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>/scripts',
                    src: '*.js',
                    dest: '<%= yeoman.dist %>/scripts'
                }, {
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: '*.js',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/scripts/scripts.js': [
                        '<%= yeoman.dist %>/scripts/scripts.js'
                    ]
                }
            },
            distLib: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>/libs/components-fixed',
                    src: '**/*.js',
                    dest: '<%= yeoman.dist %>/libs/components-fixed'
                }, {
                    expand: true,
                    cwd: '<%= yeoman.dist %>/libs/modules',
                    src: '**/*.js',
                    dest: '<%= yeoman.dist %>/libs/modules'
                }, {
                    expand: true,
                    cwd: '<%= yeoman.dist %>/libs',
                    src: '*.js',
                    dest: '<%= yeoman.dist %>/libs'
                }]
            },
            poc: {
                files: {
                    '<%= yeoman.dist %>/scripts/scripts.js': [
                        '<%= yeoman.dist %>/scripts/scripts.js'
                    ],
                    '<%= yeoman.dist %>/main.js': [
                        '<%= yeoman.dist %>/main.js'
                    ]

                }
            },
            pocScript: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>/scripts',
                    src: '**/*.js',
                    dest: '<%= yeoman.dist %>/scripts'
                }]
            }
        },
        // ,
        // symlink: {
        //     capDevLink: {
        //         files: [{
        //             expand: true,
        //             cwd: '<%= yeoman.app %>',
        //             src: ['libs', 'images', 'scripts','font'],
        //             dest: '<%= yeoman.capDist %>',
        //             filter: 'isDirectory'
        //         }]
        //     }
        // }
        'string-replace': {
            kit: {
                files: {
                    '<%= yeoman.app %>/scripts/validations.js': '<%= yeoman.app %>/libs/validations-template.js'
                },
                options: {
                    replacements: [{
                        pattern: / 'txnValidaions': ''/,
                        replacement: function(match, p1, offset, string) {
                            function readFiles(path) {
                                var files = [];
                                var fileData = {};
                                fs.readdirSync(path).map(function(file) {
                                    if (fs.statSync(path + "/" + file).isDirectory()) {
                                        var _files = readFiles(path + "/" + file);
                                        //grunt.log.writeln("list _fodler : " + _files);
                                        files = files.concat(_files);
                                    } else {
                                        if (file.match(/[.]js/)) {
                                            //grunt.log.writeln("push _file : " + file);
                                            var _tmp = file.replace(/[.](js)$/, "");
                                            files.push({
                                                key: _tmp,
                                                value: path.replace("src/", "") + "/" + _tmp
                                            });
                                        }
                                    }
                                });
                                return files;
                            }

                            var files = readFiles(yeomanConfig.app + "/scripts/validations");
                            var str = "";
                            for (var i in files) {
                                str += ("\n\"" + files[i].key + "\" : \"" + files[i].value + "\",");
                            }


                            return str.replace(/,$/, "");
                        }
                    }]
                }
            },
            contentRoot: {
                files: {
                    '<%= yeoman.dist %>/index.html': '<%= yeoman.dist %>/index.html'
                },
                options: {
                    replacements: [{
                        pattern: /<base href="\/" target="_blank" \/>/,
                        replacement: function(match, p1, offset, string) {
                            return '<base href="/iBranchApp/" target="_blank" />';
                        }
                    }]
                }
            }
        },
        compress: {
            poc: {
                options: {
                    mode: 'tar',
                    archive: 'archive/cabin.tar'
                },
                expand: true,
                cwd: '<%= yeoman.dist %>/',
                src: ['**/*']
            }
        },
        'ftp_push': {
            poc: {
                options: {
                    username: "root",
                    password: "root",
                    host: "172.16.240.6",
                    dest: "/WebSphere/IISI/installedApps/IISIode01Cell/iBranchApp.ear/iBranchApp.war/",
                    port: 21
                },
                files: [{
                    expand: true,
                    cwd: 'archive/',
                    src: ['cabin.tar']
                }]
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: "<%= yeoman.app %>",
                    //mainConfigFile: "<%= yeoman.app %>/scripts/build.js",
                    name: "main", // assumes a production build using almond
                    optimize: 'none',
                    //out: "<%= yeoman.dist %>/scripts/main.js",
                    out: "<%= yeoman.dist %>/main.js",
                    paths: {
                        // 'jquery': 'libs/components/jquery/jquery',
                        // 'socket-io': 'libs/components/socket.io-client/dist/socket.io',
                        // 'angular': 'libs/components/angular/angular',
                        // 'angular-animate': 'libs/components/angular-animate/angular-animate',
                        // 'angular-resource': 'libs/components/angular-resource/angular-resource',
                        // 'angular-sanitize': 'libs/components/angular-sanitize/angular-sanitize',
                        // 'angular-socket-io': 'libs/components/angular-socket-io/socket',
                        // 'angular-mocks': 'libs/components/angular-mocks/angular-mocks',
                        // 'angular-ui-router': 'libs/components/angular-ui-router/release/angular-ui-router',
                        // 'angular-ui-bootstrap': 'libs/components/angular-bootstrap/ui-bootstrap',
                        // 'angular-ui-utils': 'libs/components/angular-ui-utils/ui-utils',
                        // 'angular-ui-utils-hiv': 'libs/components/angular-ui-utils/ui-utils-ieshiv.min',
                        // 'angular-validation': 'libs/components/angular-validation/dist/angular-validation',
                        // 'tether-utils': 'libs/components/tether/js/utils',
                        // 'tether': 'libs/components/tether/js/tether',
                        // //'angular-tooltip': 'libs/components/angular-tooltip/src/angular-tooltip',
                        // 'angular-modal': 'libs/components-fixed/angular-modal',
                        // //deviceAgent
                        // 'xmlRPC': 'libs/components/jquery-xmlrpc/jquery.xmlrpc',
                        // "libs": "libs/libs",
                        // "cabin": "libs/cabin",
                        // "cabin-libs": "libs/cabin-libs",
                        // "app": "scripts/app",
                        // "http-mock": "../test/_httpMock/define",
                        // "appCtrl": "scripts/ctrl/appCtrl",
                        // // Directives
                        // 'cbBehavior': 'libs/modules/directives/cabin-behavior/cabin-behavior',
                        // 'cbModule': 'libs/modules/directives/cabin-module/cabin-module',
                        // 'cbSplitter': 'libs/modules/directives/cabin-splitter/cabin-splitter',
                        // 'cbNotify': 'libs/modules/directives/cabin-notify/cabin-notify',
                        // 'cbTopMenu': 'libs/modules/directives/cabin-topMenu/cabin-topMenu',
                        // 'cbSideMenu': 'libs/modules/directives/cabin-sideMenu/cabin-sideMenu',
                        // 'cbPageViewer': 'libs/modules/directives/cabin-pageViewer/cabin-pageViewer',
                        // 'cbGrid': 'libs/modules/directives/cabin-grid/cabin-grid',
                        // 'cbComboBox': 'libs/modules/directives/cabin-comboBox/cabin-comboBox',
                        // 'cbMaskNumber': 'libs/modules/directives/cabin-mask/cabin-mask-number',
                        // 'cbSocketStatus': 'libs/modules/directives/cabin-socketStatus/cabin-socketStatus',
                        // // Service
                        // 'cbTxnRouterLoaderServ': 'libs/modules/services/cabin-txnRouterLoaderServ',
                        // 'cbLazyRegisterServ': 'libs/modules/services/cabin-lazyRegisterServ',
                        // 'cbComboBoxServ': 'libs/modules/services/cabin-comboBoxServ',
                        // 'cbUtils': 'libs/modules/services/cabin-utils',
                        // 'cbWebSocketIoServ': 'libs/modules/services/cabin-websocket-io',
                        // // Modal
                        // 'cbSupeviseModal': 'libs/modules/modals/cabin-supeviseModal/cabin-supeviseModal',
                        // 'cbSupeviseRequireModal': 'libs/modules/modals/cabin-supeviseRequireModal/cabin-supeviseRequireModal',
                        // 'cbDeviceAgent': 'libs/modules/services/cabin-deviceAgent/cabin-deviceAgent',
                        // 'cbValidationServ': 'libs/modules/services/cabin-validation',
                        // 'cbCommonModal': 'libs/modules/modals/cabin-commonModal/cabin-commonModal',
                        // 'cbEjContextModal': 'libs/modules/modals/cabin-ejContextModal/cabin-ejContextModal',
                        // 'cbOpenTxnModal': 'libs/modules/modals/cabin-openTxnModal/cabin-openTxnModal',

                        // //for poc
                        // 'iBranchServ': 'scripts/services/iBranchServ',
                        // 'userServ': 'scripts/services/userServ',
                        // 'cbTest': 'libs/modules/directives/cabin-test/cabin-test',
                        // 'txn-validations': 'scripts/validations',
                        // //mock test
                        // 'last': '../test/_httpMock/last',
                        // 'queryMenu': '../test/_httpMock/queryMenu',
                        // 'queryComboBox': '../test/_httpMock/queryComboBox',
                        // 'iBranchTest': '../test/_httpMock/iBranchTest'
                        'jquery': 'libs/components/jquery/dist/jquery',
                        'socket-io': 'libs/components/socket.io-client/socket.io',
                        'angular': 'libs/components/angular/angular',
                        'angular-animate': 'libs/components/angular-animate/angular-animate',
                        'angular-resource': 'libs/components/angular-resource/angular-resource',
                        'angular-sanitize': 'libs/components/angular-sanitize/angular-sanitize',
                        'angular-socket-io': 'libs/components/angular-socket-io/socket',
                        //'angular-mocks': 'libs/components/angular-mocks/angular-mocks',
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
                }
            }
        }
    });

    grunt.registerTask('server', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }



        grunt.task.run([
            'string-replace:kit',
            'clean:server',
            'concurrent:server',
            'configureProxies',
            'connect:livereload',
            'open',
            'concurrent:watchServer'
        ]);
        //
    });


    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'connect:test' //,
        //'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'concat',
        'copy:dist',
        'cdnify',
        'ngmin',
        'cssmin',
        'uglify',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('buildpoc', ['clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'concat',
        'copy:poc',
        'cdnify',
        'string-replace',
        'requirejs',
        'ngmin',
        'cssmin',
        // 'uglify:poc',
        // 'uglify:distLib',
        // 'uglify:pocScript',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('serverpoc', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['buildpoc', 'open', 'connect:dist:keepalive']);
        }



        grunt.task.run([
            'string-replace:kit',
            'clean:server',
            'concurrent:server',
            'configureProxies',
            'connect:livereload',
            'open',
            'concurrent:watchServer'
        ]);
        //
    });

    grunt.registerTask('buildpocpush', [
        'buildpoc',
        'compress:poc',
        'ftp_push:poc'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);

    grunt.registerTask('cleanCap', [
        'clean:capAll',
        'copy:capLibs'
    ]);

    grunt.registerTask('capDevWatch', [
        'clean:cap',
        //'symlink:capDevLink',
        'copy:capDev',
        'compass:capDist',
        'concurrent:capWatch'
    ]);

    grunt.registerTask('cap', function(arg1) {
        if (arg1 === 'clean') {
            grunt.task.run(['cleanCap']);
        }
        grunt.task.run(['capDevWatch']);
    });

    grunt.registerTask('js', ['requirejs', 'ngmin', 'uglify']);

    grunt.event.on('watch', function(action, filepath) {
        filepath = filepath.replace(grunt.config.get('yeoman.app') + '/', '');
        grunt.log.writeln(filepath);
        grunt.config('copy.capDev.files', [{
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            dest: '<%= yeoman.capDist %>',
            src: [filepath]
        }]);
    });

    grunt.registerTask('ttt', function(action, filepath) {
        function readFiles(path) {
            var files = [];
            var fileData = {};
            fs.readdirSync(path).map(function(file) {
                if (fs.statSync(path + "/" + file).isDirectory()) {
                    var _files = readFiles(path + "/" + file);
                    //grunt.log.writeln("list _fodler : " + _files);
                    files = files.concat(_files);
                } else {
                    if (file.match(/[.]js/)) {
                        //grunt.log.writeln("push _file : " + file);
                        var _tmp = file.replace(/[.](js)$/, "");
                        files.push({
                            key: _tmp,
                            value: path.replace("src/", "") + "/" + _tmp
                        });
                    }
                }
            });
            return files;
        }

        var ffff = readFiles(yeomanConfig.app + "/scripts/validations");
        var str = "";
        for (var i in ffff) {
            str += ("\n\"" + ffff[i].key + "\" : \"" + ffff[i].value + "\",");
        }

        grunt.log.writeln(str.replace(/,$/, ""));

    });

};
