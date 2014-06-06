/**  @author Gilles Coomans <gilles.coomans@gmail.com> */
module.exports = function (grunt) {


	require('deep-shell');

	grunt.registerTask('gitify', 'Making git repository of node or bower dependencies.', function() {
		var done = this.async();
		grunt.log.writeln('Grunt Gitify task start.');

		var config = grunt.config('gitify'),
			packageFile, 
			folder;

		if(config.namespace == 'bower')
		{
			packageFile = "bower.json";
			folder = "bower_components"
		}
		else
		{
			packageFile = "package.json";
			folder = "node_modules"
		}
		var packages = grunt.file.readJSON(packageFile).dependencies;
		var prefixes = config.prefixes;
		var exclude = config.exclude;

		var regex = new RegExp("^((" + prefixes.join(')|(') + "))");
		var regexExclude = new RegExp("^((" + exclude.join(')|(') + "))");
		var promises = [];
		for (var key in packages) {
			var pack = packages[key].split("#");
			var packURI = pack[0].substring(4);
			var packVersion = pack[1] || "master";
			if (!regexExclude.test(key) && regex.test(key))
			{
				console.log(key, ":", packURI);
				var d = deep.shell()
				.exec("rm -rf ./"+folder+"/" + key)
				.cd("./"+folder)
				//.log("git clone " + packURI + " " + key)
				.exec("git clone " + packURI + " " + key)
				//.log("git cloned " + packURI)
				.cd("./" + key)
				.exec("git checkout " + packVersion).log();
				promises.push(d);
			}
		}

		deep.all(promises)
		.done(function (success) {
			done(true);
		}).fail(function (argument) {
			done(false);
		});
	});

	// Project configuration.
	grunt.initConfig({
		gitify: {
			namespace:"bower",
			prefixes: ["deep", "autobahn"],
			exclude: ["deep-shell"]
		},
		pkg: grunt.file.readJSON('package.json'),
		'http-server': {
			'dev': {
				// the server root directory
				root: './',

				port: 8282,
				host: '127.0.0.1',

				cache: 60, // sec
				showDir: true,
				autoIndex: true,
				defaultExt: 'html',

				//wait or not for the process to finish
				runInBackground: false
			}
		},
		processhtml: {
			dist: {
				files: {
					'dist/index.html': ['index.html']
				}
			}
		},
		requirejs: {
			dist: {
				options: {
					//appDir:".",
					baseUrl: './',
					name: 'app',
					out: './app.min.js',
					enforceDefine: false,
					wrap: true,
					paths: {
						'deepjs': './libs/deepjs',
						'deep-routes': './libs/deep-routes',
						'rql': './libs/rql',
						'deep-jquery': './libs/deep-jquery',
						'deep-browser': './libs/deep-browser',
						'deep-swig': './libs/deep-swig',
						'deep-local-storage': './libs/deep-local-storage',
						'deep-data-bind': './libs/deep-data-bind'
					}
				}
			}
		},
		htmllint: {
	        all: ["./*.html", "pages/**/*.html"]
	    }/*,
		less: {
		  development: {
		    options: {
		      paths: ["assets/css"]
		    },
		    files: {
		      "path/to/result.css": "path/to/source.less"
		    }
		  },
		  production: {
		    options: {
		      paths: ["assets/css"],
		      cleancss: true,
		      modifyVars: {
		        imgPath: '"http://mycdn.com/path/to/images"',
		        bgColor: 'red'
		      }
		    },
		    files: {
		      "path/to/result.css": "path/to/source.less"
		    }
		  }
		}*/
	});

	//https://github.com/gruntjs/grunt-contrib-less
	/*grunt.loadNpmTasks('grunt-contrib-less');*/

	grunt.loadNpmTasks('grunt-requirejs');
	grunt.loadNpmTasks('grunt-http-server');
	grunt.loadNpmTasks('grunt-html');	// HTML VALIDATION

	// Default task(s).
	grunt.registerTask('default', ['requirejs']);
	/*grunt.registerTask('default', 'Log some stuff.', function() {
	    grunt.log.write('Logging some stuff...').ok();
	});*/
};