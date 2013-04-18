module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    curl: {
        'UI/JsLibraries/backbone.collectionbinder.js':   'http://raw.github.com/theironcook/Backbone.ModelBinder/master/Backbone.CollectionBinder.js',
        'UI/JsLibraries/backbone.js':                    'http://raw.github.com/documentcloud/backbone/master/backbone.js',
        'UI/JsLibraries/backbone.marionette.js':         'http://raw.github.com/marionettejs/backbone.marionette/master/lib/backbone.marionette.js',
        'UI/JsLibraries/backbone.modelbinder.js':        'http://raw.github.com/theironcook/Backbone.ModelBinder/master/Backbone.ModelBinder.js',
        'UI/JsLibraries/backbone.mutators.js':           'http://raw.github.com/asciidisco/Backbone.Mutators/master/backbone.mutators.js',
        'UI/JsLibraries/backbone.shortcuts.js':          'http://raw.github.com/bry4n/backbone-shortcuts/master/backbone.shortcuts.js',
        //'UI/JsLibraries/bootstrap.js':         
        //'UI/JsLibraries/bootstrap.slider.js':      
        'UI/JsLibraries/bootstrap.swtitch.js':           'http://raw.github.com/nostalgiaz/bootstrap-switch/master/static/js/bootstrapSwitch.js',    
        'UI/JsLibraries/handlebars.runtime.js':          'http://raw.github.com/wycats/handlebars.js/master/dist/handlebars.runtime.js',
        'UI/JsLibraries/jquery.cookie.js':               'http://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js',
        'UI/JsLibraries/jquery.js':                      'http://code.jquery.com/jquery.js',
        //'NzbDrone.Backbone/JsLibraries/jquery.tablesorter.bootstrap.js':        
        //'NzbDrone.Backbone/JsLibraries/jquery.tablesorter.js': 
        'UI/JsLibraries/require.js':                     'http://raw.github.com/jrburke/requirejs/master/require.js',
        'UI/JsLibraries/sugar.js':                       'http://raw.github.com/andrewplummer/Sugar/master/release/sugar-full.development.js',
        'UI/JsLibraries/underscore.js':                  'http://raw.github.com/documentcloud/underscore/master/underscore.js'
    },

    uglify: {
        files: {
          expand: true, // Enable dynamic expansion.
          cwd: 'UI/',      // Src matches are relative to this path.
          src: ['**/*.js'], // Actual pattern(s) to match.
          dest: 'build/',   // Destination path prefix.
          ext: '.min.js'
        }
    },
    less:{
      bootstrap:{
        src: ["UI/Content/bootstrap/bootstrap.less"],
        dest: "_output/UI/Content/bootstrap.css"
      }
    },

    handlebars: {
      options: {
        namespace: "Templates",
        processName: function(fileName){
          return fileName
              .replace('UI/','')
              .replace('.html','')
              .toLowerCase();
        }
      },  
      files: {
          src: ['UI/**/*emplate.html'],
          dest: '_output/UI/templates.js'
      },
    },

    copy:{
      index:{
        src: 'UI/index.html', 
        dest: '_output/UI/index.html'
      },
      scripts:{
        src: 'UI/**/*.js', 
        dest: '_output/'
      },
      styles:{
        src: 'UI/**/*.css', 
        dest: '_output/'
      },
      images:{
        src: 'UI/**/*.png', 
        dest: '_output/'
      },
      fonts:{
        src: 'UI/**/Fonts/*.*', 
        dest: '_output/',
      }
    },

    watch:{
      bootstrap:{
        files: 'NzbDrone.Backbone/Content/bootstrap/*.less',
        tasks: ['less:bootstrap']  
      },
      handlebars:{
        files: '<%= handlebars.files.src %>',
        tasks: ['handlebars']  
      },
      copyIndex:{
        files: '<%= copy.index.src %>',
        tasks: ['copy:index']  
      },
      copyScripts:{
        files: '<%= copy.scripts.src %>',
        tasks: ['copy:scripts']  
      },
      copyStyles:{
        files: '<%= copy.styles.src %>',
        tasks: ['copy:styles']  
      },
      copyImages:{
        files: '<%= copy.images.src %>',
        tasks: ['copy:images']  
      },
      copyFonts:{
        files: '<%= copy.fonts.src %>',
        tasks: ['copy:fonts']  
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-wrap');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-curl');
  // Default task(s).
  grunt.registerTask('default', ['copy','less:bootstrap','handlebars', 'watch']);

};