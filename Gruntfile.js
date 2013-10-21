// Generated on 2013-08-12 using generator-angular 0.3.0
'use strict';
var fs = require('fs');
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'src',
    dist: 'dist',
    bowerDir: 'libs/components',
    capDist : '../webapp'
  };

 
  try {
    yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
  } catch (e) {}

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      options: { nospawn: true },
      coffee: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
        tasks: ['coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.coffee'],
        tasks: ['coffee:test']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '<%= yeoman.app %>/libs/**/*.html',
          //'{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          //'{.tmp,<%= yeoman.app %>}/libs/**/*.js',
          '{.tmp,<%= yeoman.app %>}/libs/*.js',
          '{.tmp,<%= yeoman.app %>}/libs/modules/**/*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      capCoffee: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
        tasks: ['coffee:capDist']
      },
      capCompass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
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
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
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
      options:{
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
          src: (function(){
            //  var ignoreCleanFiles = [
            //     '!/WEB-INF',
            //     '!/META-INF'
            // ];

            var files = fs.readdirSync(yeomanConfig.app).map(function(files){
              return yeomanConfig.capDist + '/' + files ;
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
      capDist :{
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
        require: ['susy','animate','compass-flexbox'],
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: '<%= yeoman.app %>/<%= yeoman.bowerDir %>',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        line_comments:false,
       // config: '<%= yeoman.app %>/styles/config/config.rb',
        relativeAssets: true
      },
      dist: {},
      server: {
        options: {
          debugInfo: true
        }
      },
      capDist:{
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
      capDev:{
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.capDist %>',
          src: [
            '{*,views/**/*}.{ico,png,txt,html}',
            //'.htaccess',
            //'images/{,*/}*.{png,gif,webp,svg}',
            'scripts/**/*.js',
            //'libs/*.js',
            'styles/fonts/*'
          ]
        }]
      }
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
      watchServer :[
        'watch:compass',
        'watch:livereload',
        'watch:coffee',
        'watch:coffeeTest'
      ],
      capWatch :[
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
      }
    },
    symlink: {
      capDevLink: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.app %>',
            src: ['libs','images'],
            dest: '<%= yeoman.capDist %>',
            filter: 'isDirectory'
          }
        ]
      }
    }
  });

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'connect:livereload',
      'open',
      'concurrent:watchServer'
    ]);
    //
  });


  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'connect:test'//,
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
    'symlink:capDevLink',
    'copy:capDev',
    'compass:capDist',
    'concurrent:capWatch'
  ]);

  grunt.registerTask('cap',function(arg1){
    if(arg1 === 'clean'){
      grunt.task.run(['cleanCap']);
    }
    grunt.task.run(['capDevWatch']);
  });

  grunt.event.on('watch', function(action, filepath){
    filepath = filepath.replace(grunt.config.get('yeoman.app') + '/','');
    grunt.log.writeln(filepath);
    grunt.config('copy.capDev.files',[{
      expand: true,
      dot: true,
      cwd: '<%= yeoman.app %>',
      dest: '<%= yeoman.capDist %>',
      src: [filepath]
    }]);
  });
};
