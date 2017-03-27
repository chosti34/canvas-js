module.exports = function(grunt)
{
    grunt.initConfig({
        // connects to the (local?) server
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: './',
                    livereload: true,
                    open: {
                        target: 'http://localhost:8080'
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
                        cwd: 'node_modules/react/dist/',
                        src: 'react.min.js',
                        dest: 'build/'
                    },

                    {
                        expand: true,
                        cwd: 'node_modules/react-dom/dist/',
                        src: 'react-dom.min.js',
                        dest: 'build/'
                    }
                ]
            }
        },

        // clean build and temp directory
        clean: ['build', 'temp'],

        // merge all js files
        concat: {
            dist: {
                src: ['temp/**/*.js'],
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
                    'build/canvas.min.css',
                    'build/app.js',
                    'build/react-dom.min.js',
                    'build/react.min.js'
                ],

                dest: ['index.html']
            }
        },

        react: {
            single_file_output: {
                files: {
                    'build/app.js': 'src/jsx/app.jsx'
                }
            }
        },

        spell: {
            files: ['src/**/*.*'],
            options: {
                lang: 'en'
            }
        },

        ts: {
            default: {
                src: ['src/ts/Canvas.ts', 'src/ts/IShape.ts', 'src/ts/Shape.ts', 'src/ts/Rectangle.ts', 'src/ts/Triangle.ts', 'src/ts/Circle.ts', 'src/ts/Application.ts', 'src/ts/main.ts'],
                out: 'temp/canvas.js',
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
                tasks: ['spell', 'cssmin', 'hashres:prod']
            },

            scripts: {
                files: ['src/ts/**/*.*', 'src/jsx/**/*.*'],
                tasks: ['spell', 'clean', 'copy', 'cssmin', 'react', 'tslint', 'ts', 'uglify', 'hashres:prod'],
            },

            html: {
                files: ['*.html']
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
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-spell');

    grunt.registerTask('default', [
        'clean', 'copy', 'ts', 'tslint', 'concat', 'uglify', 'react', 'cssmin',
        'connect:server', 'copy:main', 'hashres:prod', 'watch'
    ]);
};
