module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
    });
    // Load the plugin
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    // Default task(s).
    grunt.registerTask('default', ['compass:dev' , 'uglify' , 'watch']);
    // prod build
    grunt.registerTask('prod', ['compass:prod']);
};