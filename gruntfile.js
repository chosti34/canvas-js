module.exports = function(grunt)
{
    grunt.initConfig(
    {
        connect:
        {
            server:
            {
                options:
                {
                    port: 8080,
                    base: '',
                    open:
                    {
                        appName: 'Chrome'
                    }
                }
            }
        },

        concat:
        {
            dist:
            {
                src: ['js/**/*.js'],
                dest: 'dist/canvas.js'
            }
        },

        uglify:
        {
            build:
            {
                src: 'dist/canvas.js',
                dest: 'dist/canvas.min.js'
            }
        },

        cachebust: {
            task: {
                options: {
                    assets: ['dist/**']
                },
                src: ['index.html']
            }
        },

        bustCache: {
            dev: {
                options: {
                    hashType: "timestamp",
                    css: true,
                    javascript: true
                },
                src: "index.html"
            }
        },

        cssmin:
        {
            options:
            {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },

            target:
            {
                files:
                {
                    'dist/canvas.min.css':
                    [
                        'node_modules/bootstrap/dist/css/bootstrap.min.css',
                        'css/main.css'
                    ]
                }
            }
        },

        eslint:
        {
            target: ['dist/canvas.js']
        },

        watch:
        {
            options:
            {
                livereload: true
            },

            css:
            {
                files: ['css/**/*.*'],
                tasks: ['cssmin', 'bustCache']
            },

            scripts:
            {
                files: ['js/**/*.*'],
                tasks: ['concat', 'uglify', 'eslint', 'bustCache'],
            },

            html:
            {
                files: ['index.html', 'bustCache']
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-bust-cache');
    grunt.loadNpmTasks('grunt-eslint');

    grunt.registerTask('default', [
        'concat', 'uglify',
        'cssmin', 'connect:server',
        'bustCache', 'watch'
    ]);
};
