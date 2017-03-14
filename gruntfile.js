module.exports = function(grunt)
{
    grunt.initConfig({
        // connects to the (local?) server
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: '',
                    open: {
                        appName: 'Chrome'
                    }
                }
            }
        },

        // merge all js files
        concat: {
            dist: {
                src: ['js/**/*.js'],
                dest: 'build/canvas.js'
            }
        },

        // uglifying js files
        uglify: {
            build: {
                src: 'build/canvas.js',
                dest: 'build/canvas.min.js'
            }
        },

        // uglifying css files
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },

            target: {
                files: {
                    'build/canvas.min.css': [
                        'node_modules/bootstrap/dist/css/bootstrap.min.css',
                        'css/main.css'
                    ]
                }
            }
        },

        // code analyser
        eslint: {
            target: ['build/canvas.js']
        },

        hashres: {
            options: {
                fileNameFormat: '${name}.[${hash}].${ext}'
            },

            prod: {
                src: [
                    'build/canvas.min.js',
                    'build/canvas.min.css'
                ],

                dest: ['index.html']
            }
        },

        // Automatically calls procedures in tasks array
        watch: {
            options: {
                livereload: true
            },

            css: {
                files: ['css/**/*.*'],
                tasks: ['cssmin', 'hashres:prod']
            },

            scripts: {
                files: ['js/**/*.*'],
                tasks: ['concat', 'uglify', 'eslint', 'hashres:prod']
            },

            // this can be deleted?
            html: {
                files: ['*.html']
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-hashres');
    grunt.loadNpmTasks('grunt-eslint');

    grunt.registerTask('default', [
        'concat', 'uglify', 'cssmin',
        'connect:server', 'hashres:prod', 'watch'
    ]);
};
