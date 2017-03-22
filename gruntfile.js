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

        // clean build and temp directory
        clean: ['build', 'temp'],

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

        tslint: {
            options:
            {
                configFile: '.eslintrc.json',
                quiet: false
            },
            target: 'src/ts/*.ts'
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

        ts: {
            default: {
                src: ['src/ts/Canvas.ts', 'src/ts/IShape.ts', 'src/ts/Shape.ts', 'src/ts/Rectangle.ts', 'src/ts/Triangle.ts', 'src/ts/Circle.ts', 'src/ts/Application.ts', 'src/ts/main.ts'],
                out: 'temp/app.js',
                options: {
                    module: 'system',
                    target: 'es5',
                    noImplicitAny: true,
                    noEmitOnError: true,
                    sourceMap: false
                }
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
                files: ['src/js/**/*.*', 'src/ts/**/*.*'],
                tasks: ['concat', 'uglify', 'eslint', 'hashres:prod', 'tslint', 'ts'],
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
    grunt.loadNpmTasks("grunt-tslint");
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-ts');

    grunt.registerTask('default', [
        'clean', 'ts', 'tslint', 'concat', 'uglify', 'cssmin',
        'connect:server', 'copy:main', 'hashres:prod', 'watch'
    ]);
};
