/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 */
define([
		"require",
		"deep-browser/index",
		"./js/routes.js",
		"./js/app-canevas.js",
		"./js/main-nav.js",
		"./js/logo.js",
		"./js/github-ribbon.js",
		"./js/dp-version.js",
		"deep-jquery/ajax/json",
		"deep-jquery/ajax/html",
		"deepjs/lib/unit",
		"deepjs/lib/stores/collection",
		"deepjs/lib/stores/object",
		"deepjs/lib/schema",
		"deep-swig/index",
		"deep-widgets/lib/deep-try",
		"deep-widgets/lib/dp-svg-trick"
	],
	function(require, deep, map) {
		// ___________ base protocols
		deep.jquery.JSON.create();
		deep.jquery.HTML.create();
		deep.Swig();
		deep.jquery.set($);
		//___________ start
		deep.route.deepLink({ /* config */ });
		// create contextualised dom name space
		var dom = deep.context.dom = {};
		deep.ui.enhance("html");	// enhance dp-* already present in html

		//_________________________ init route (final)
		var init = function() {
			deep.route(map)	// compile html routes map
			.done(function(routes) {
				console.log("app intialised");
				routes.init();
			});
		};

		//_______________________________________ little hack to allow refresh from particular state without loosing uri in "browser only" env.
		$( window ).keydown(function( e ) {
			if(e.keyCode == 82 && e.shiftKey) //  SHIFT + R
			{
				var currentRoute = window.location.pathname+window.location.hash;
				if(currentRoute != '/')
					window.location.assign("/#!"+currentRoute);
				else
					window.location.reload();
			}
		});

		return init;
	});