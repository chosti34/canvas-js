module.exports = function(grunt)
{
    grunt.initConfig(
    {
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
                tasks: ['cssmin']
            },

            scripts:
            {
                files: ['js/**/*.*'],
                tasks: ['concat', 'uglify', 'eslint'],
            },

            html:
            {
                files: ['index.html']
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-eslint');

    grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'watch']);
};
