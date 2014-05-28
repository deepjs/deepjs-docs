/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 */
define([
		"require",
		"deep-browser/index",
		"./js/routes.js",
		"./js/app-template.js",
		"./js/main-nav.js",
		"./js/header.js",
		"deep-jquery/ajax/json",
		"deep-jquery/ajax/html",
		"deepjs/lib/unit",
		"deepjs/lib/stores/collection",
		"deepjs/lib/stores/object",
		"deepjs/lib/schema",
		"deep-swig/index",
		"deep-widgets/lib/deep-try"
	],
	function(require, deep, map) {
		// ___________ base protocols
		deep.jquery.JSON.create();
		deep.jquery.HTML.create();
		deep.Swig();
		deep.jquery.set($);
		//___________ start
		//console.log("start app-sndbx : ", map);
		deep.route.deepLink({ /* config */ });
		//___________________________________________  VERSION
		var dom = deep.context.dom = {};
		deep.ui.enhance("html");	// enhance dp-* already present in html

		//_________________________ init route (final)
		var init = function() {
			var p = deep.route(map);	// compile html routes map
			p.done(function(routes) {
				console.log("app-sndbx intialised");
				routes.init();
			});
		};

		//_______________________________________
		$( window ).keydown(function( e ) {
			if(e.keyCode == 82 && e.shiftKey)
			{
				var currentRoute = deep.route.current();
				if(currentRoute != '/')
					window.location.assign("/#"+currentRoute);
				else
					window.location.reload();
			}
		});

		return init;
	});