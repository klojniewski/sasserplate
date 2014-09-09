module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            dev: {
                files: [
                    // copy javascripts
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['js/**'],
                        dest: 'static/'
                    },
                    // copy images
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['img/**'],
                        dest: 'static/'
                    },
                    {
                        expand: true,
                        cwd: 'node_modules/jquery/dist',
                        src: ['jquery.js'],
                        dest: 'static/js/vendor'
                    }
                ]
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'static/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'static/img'
                }]
            }
        },
        watch: {
            // compass, sass compilation
            compass: {
                files: ['src/sass/*.scss', 'src/sass/partials/*.scss'],
                tasks: ['compass:dev']
            },
            // enable LiveReload for css files
            css: {
                files: ['static/css/*.css'],
                options: {
                    livereload: 9000
                }
            },
            // enable LiveReload for html files
            html: {
                files: ['*.html'],
                options: {
                    livereload: 9000
                }
            },
            // enable JS copy
            copy: {
                files: ['src/js/*.js', 'src/img/**'],
                tasks: ['copy:dev']
            }
        },
        compass: {
            dev: {
                options: {
                    config: 'config.rb'
                }
            },
            compile: {
                options: {
                    config: 'config.rb'
                }
            }
        },
        uglify: {
            all: {
                files: {
                    'static/js/app.min.js': [
                        'node_modules/jquery/dist/jquery.js',
                        'src/js/plugins.js',
                        'src/js/main.js'
                    ]
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: grunt.option('port') || 8080,
                    hostname: 'localhost',
                    base: ''
                }
            }
        }
    });
    // Load the plugin
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    // Default task(s).
    grunt.registerTask('default', ['compass:dev', 'connect:server', 'copy:dev', 'watch']);
    // Images compression
    grunt.registerTask('compress', ['imagemin:dynamic']);
    // SASSS/Compass compilation only
    grunt.registerTask('compile', ['compass:compile', 'copy:dev', 'imagemin:static']);
};