module.exports = function(grunt) {

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("flexloader.jquery.json"),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Made by <%= pkg.author.name %>\n" +
				" *  Under <%= pkg.licenses[0].type %> License\n" +
				" */\n"
		},

		// Concat definitions
		concat: {
			dist: {
				src: ["src/jquery.flexloader.js"],
				dest: "dist/jquery.flexloader.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		// Lint definitions
		jshint: {
			files: ["src/jquery.flexloader.js"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		// copy flexloader source to dist dir
	copy: {
	  main: {
	    files: [
	      {expand: true, src: ['src/jquery.flexloader.js'], dest: 'dist/jquery.flexloader.js', filter: 'isFile'}
	    ]
	  }
	},

		// Minify definitions
		uglify: {
			my_target: {
				src: ["dist/jquery.flexloader.js"],
				dest: "dist/jquery.flexloader.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

    responsive_images: {
      slideshow_slides: {
        options: {
          sizes: [
            {
              width: 540,
              height: 270
            },
            {
              width: 720,
              height: 360
            },
            {
              width: 900,
              height: 450
            }
          ]
        },
        files: [{
          expand: true,
          src: ['img/slideshow/1080/*.jpg'],
          custom_dest: 'img/slideshow/{%= width %}/'
        }]
      },
      carousel_slides: {
        options: {
          sizes: [
            {
              width: 90,
              height: 90
            },
            {
              width: 135,
              height: 136
            },
            {
              width: 180,
              height: 180
            },
            {
              width: 225,
              height: 225
            }
          ]
        },
        files: [{
          expand: true,
          src: ['img/carousel/270/*.jpg'],
          custom_dest: 'img/carousel/{%= width %}/'
        }]
      }
    }

	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-responsive-images");

	grunt.registerTask("release", [
		"jshint",
		"concat",
		"uglify"
	]);

	grunt.registerTask("travis", ["jshint"]);

	grunt.registerTask('resize-slideshow-slides', [
		'responsive_images:slideshow_slides'
	]);

  grunt.registerTask('resize-carousel-slides', [
    'responsive_images:carousel_slides'
  ]);

};
