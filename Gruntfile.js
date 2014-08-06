module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [
                    {expand: true, src: ['*.html'], dest: 'dist/', filter: 'isFile'},
                    {expand: true, src: ['static/css/*.css'], dest: 'dist/', filter: 'isFile'},
                    {expand: true, src: ['static/img/*.*'], dest: 'dist/', filter: 'isFile'},
                    {expand: true, src: ['static/js/*.*'], dest: 'dist/', filter: 'isFile'}
                ]
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'static/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/static/img'
                }]
            }
        },
        validation: {
            files: {
                src: ['*.html']
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
                files: ['index.html'],
                options: {
                    livereload: 9000
                }
            },
            // uglify js files
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['uglify']
            }
        },
        compass: {
            dev: {
                options: {
                    config: 'config.rb'
                }
            },
            prod: {
                options: {
                    config: 'config_production.rb'
                }
            },
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
            },
        },
        connect: {
            server: {
                options: {
                    port: parseInt(10000 * Math.random(100), 10),
                    hostname: 'localhost',
                    base: ''
                }
            }
        }
    });
    // Load plugin(s).
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    // Default task(s).
    grunt.registerTask('default', ['compass:dev', 'uglify', 'connect:server', 'watch']);
    // Compile SASS/Compass with production config
    grunt.registerTask('prod', ['compass:prod']);
    // Prepare distribution package
    grunt.registerTask('dist', ['compass:prod', 'copy', 'imagemin']);
};