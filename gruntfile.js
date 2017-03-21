module.exports = function(grunt)
{
    grunt.initConfig({
        // connects to the (local?) server
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: 'build/',
                    open: {
                        appName: 'Chrome'
                    }
                }
            }
        },

        // copy index.html to build/ folder
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: ['index.html'],
                        dest: 'build/',
                        filter: 'isFile'
                    }
                ]
            }
        },

        // clean build directory
        clean: ['build'],

        typescript: {
            base: {
                src: ['ts/**/*.ts'],
                dest: 'js/ts-compiled.js',
                options: {
                    module: 'amd',
                    target: 'es5'
                }
            }
        },

        // merge all js files
        concat: {
            dist: {
                src: ['src/js/**/*.js'],
                dest: 'temp/canvas.js'
            }
        },

        // uglifying js files
        uglify: {
            build: {
                src: 'temp/canvas.js',
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
                        'src/css/main.css'
                    ]
                }
            }
        },

        // code analyser
        eslint: {
            target: ['temp/canvas.js']
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

                dest: ['build/index.html']
            }
        },

        // Automatically calls procedures in tasks array
        watch: {
            options: {
                livereload: true
            },

            css: {
                files: ['src/css/**/*.*'],
                tasks: ['cssmin', 'hashres:prod']
            },

            scripts: {
                files: ['src/js/**/*.*'],
                tasks: ['concat', 'uglify', 'eslint', 'hashres:prod']
            },

            typescript: {
                files: ['ts/**/*.ts'],
                tasks: ['typescript']
            },

            // this can be deleted?
            html: {
                files: ['*.html'],
                tasks: ['copy:main']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-hashres');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', [
        'clean', 'concat', 'uglify', 'cssmin',
        'connect:server', 'copy:main', 'hashres:prod', 'watch'
    ]);
};
