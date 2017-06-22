module.exports = function (grunt) {
  'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
      sass: {
        options: {
          sourceMap: true
        },
        dist: {
          files: {
            'css/main.css': 'scss/main.scss'
          }
        }
      },
      watch: {
      css: {
        files: ['scss/*.scss'],
        //tasks: ['sass', 'kss'],
        tasks: ['sass'],
        options: {

        }
      }
    },
    });

    grunt.registerTask('default', ['sass']);

  }