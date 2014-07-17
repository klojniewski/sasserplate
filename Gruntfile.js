module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            compass: {
                files: ['sass/*.scss', 'sass/partials/*.scss'],
                tasks: ['compass:dev']
            },
            js: {
                files: ['static/js/**/*.js'],
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
                        'static/js/plugins.js',
                        'static/js/main.js'
                    ]
                }
            },
        },
    });

  // Load the plugin
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['compass:dev' , 'uglify' , 'watch']);
  // prod build
  grunt.registerTask('prod', ['compass:prod']);
};