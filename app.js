/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 */
define([
		"require",
		"deep-browser/index",
		"./js/routes.js",
		"./js/app-template.js",
		"./js/main-nav.js",
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
		//
		deep.get("json::/bower_components/deepjs/package.json")
		.done(function(s) {
			$(".deepjs-version").text(s.version);
			$(".deepjs-version-label").css("visibility", "visible").hide().fadeIn();
		})
		.elog();
		//_________________________ init route (final)
		var init = function() {
			var p = deep.route(map);	// compile html routes map
			p.done(function(routes) {
				console.log("app-sndbx intialised");
				routes.init();
			});
		};
		return init;
	});