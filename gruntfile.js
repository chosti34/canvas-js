module.exports = function(grunt)
{
    grunt.initConfig({
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

        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/react/dist/',
                        src: 'react.min.js',
                        dest: './build/'
                    },

                    {
                        expand: true,
                        cwd: 'node_modules/react-dom/dist/',
                        src: 'react-dom.min.js',
                        dest: './build/'
                    },

                    {
                        expand: true,
                        cwd: 'node_modules/systemjs/dist/',
                        src: 'system.js',
                        dest: './build/'
                    }
                ]
            }
        },

        clean: {
            all: [
               'build/**/*.*',
               '!build/scripts.js',
               '!build/styles.css'
            ],
            css: [
                'build/**/*.*',
                '!build/scripts.*.js'
            ]
        },

        concat: {
            dist: {
                src: [
                    './build/system.js',
                    './build/react.min.js',
                    './build/react-dom.min.js',
                    './build/app.js',
                    './build/canvas-modules.js'
                ],
                dest: './build/scripts.js'
            }
        },

        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },

            target: {
                files: {
                    'build/styles.css': [
                        'node_modules/bootstrap/dist/css/bootstrap.min.css',
                        'src/css/main.css'
                    ]
                }
            }
        },

        tslint: {
            options:
            {
                configFile: 'tslint.json',
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
                    './build/scripts.js',
                    './build/styles.css'
                ],

                dest: ['index.html']
            }
        },

        react: {
            single_file_output: {
                files: {
                    './build/app.js': 'src/jsx/**/*.jsx'
                }
            }
        },

        ts: {
            default: {
                src: ['src/ts/**/*.ts'],
                out: './build/canvas.js',
                configFile: 'tsconfig.json',
                options: {
                    module: 'system',
                    target: 'es5',
                    noImplicitAny: true,
                    noEmitOnError: true,
                    sourceMap: false,
                }
            }
        },

        systemjs: {
            options: {
                sfx: true,
                baseURL: "./",
                configFile: "./system.config.js",
                minify: true,
                sourceMaps: false,
                build: {
                    mangle: false
                }
            },

            dist: {
                files: [{
                    "src":  "./build/canvas.js",
                    "dest": "./build/canvas-modules.js"
                }]
            }
        },

        shell: {
            options: {
                stderr: true
            },
            target: {
                command: 'cspell src/**/*.*'
            }
        },

        watch: {
            options: {
                livereload: true
            },

            css: {
                files: ['src/css/**/*.*'],
                tasks: ['shell', 'clean:css', 'cssmin', 'hashres:prod']
            },

            scripts: {
                files: ['src/jsx/**/*.*', 'src/ts/**/*.*'],
                tasks: [
                    'shell', 'clean', 'copy', 'react', 'tslint', 'ts',
                    'systemjs', 'concat', 'cssmin',
                    'clean:all', 'hashres:prod'
                ],
            },

            html: {
                files: ['*.html'],
                tasks: ['shell']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-hashres');
    grunt.loadNpmTasks("grunt-tslint");
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks("grunt-systemjs-builder");
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('default', [
        'shell', 'copy', 'react', 'tslint', 'ts',
        'systemjs', 'concat', 'cssmin', 'clean:all',
        'connect:server', 'hashres:prod', 'watch'
    ]);
};
