if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 */
define([
		"require",
		"deep-browser/index",
		"deepjs/lib/schema",
		// routes from deepjs documentation folder
		"deepjs/documentation/routes",
		// routes map transfo
		"./sheets/map-transfo.js",
		// site specific
		"./js/app-canevas.js",
		"./js/main-nav.js",
		"./js/sub-nav.js",
		"./js/logo.js",
		"./js/dp-version.js",
		// ressources providers
		"deep-marked/lib/clients/jq-ajax",
		"deep-jquery/lib/ajax/json",
		"deep-jquery/lib/ajax/html",
		"deep-jquery/lib/ajax/xml",
		"deep-swig/lib/jq-ajax",
		// load extra from core (not loaded by default)
		"deepjs/lib/unit",
		"deep-restful/index",
		"deep-restful/lib/collection",
		// html enhancement directives
		"deep-widgets/lib/deep-try",
		"deep-widgets/lib/dp-svg-trick",
		"./directives/dp-api-description.js"
	],
	function(require, dp, dpvalidator, map, transfo) {
		deep = dp;	// place deep in globals. (I like it so in the browser ;)
		// ___________ base protocols/clients (for demo)
		deep.jquery.ajax.json();	// default json::
		deep.jquery.ajax.html();	// default html::
		deep.jquery.ajax.xml();	// default xml::
		deep.swig.jqajax();			// default swig:: 
		deep.marked.jqajax();		// default marked::
		// define "docs::" (html provider) protocol to point to deepjs/documentation
		deep.jquery.ajax.html("docs", "/bower_components/deepjs/documentation");

		// create contextualised dom name space 
		// (it comes from the way I've made this app. not necessary in all case)
		var dom = deep.context('dom', {});

		// configure deep-link
		deep.route.deepLink({ });	// deep-link config

		// bind deepjs/lib/schema to Schema Validator (as this : you could use any validator)
		deep.Validator.set(dpvalidator);
		
		//____________________ finalise routes map : (applied sheet comes from /sheets/map-transfo.js)
		// transform entries to deep.View and apply default behaviour/api.
		deep.sheet(map, transfo);

		//___ little hack for developpement that allow refresh from particular ui state 
		// without loosing uri in "browser only" env.
		// i.e. when there is no "Search Engine friendly mecanism" associate to this single page app (server side).
		$( window ).keydown(function( e ) {
			if(e.keyCode == 82 && e.shiftKey) //  SHIFT + R = reload the page and keep current state
			{
				var currentRoute = window.location.pathname+window.location.hash;
				if(currentRoute != '/')
					window.location.assign("/#!"+currentRoute);
				else
					window.location.reload();
			}
		});

		//_________________________ app init: compile and initialise routes (final)
		return function($) {
			// init contextualised jquery reference
			deep.jquery.set($);
			// enhance current html in index
			deep.sheet(document, {
				"dom::body":deep.domsheet.enhance("control", "js::/js/app-canevas.js"),
				"dom::#dp-version":deep.domsheet.enhance("control", "js::/js/dp-version.js")
			});
			// compile html routes map
			deep.route(map)
			.done(function(routes) {
				console.log("app intialised");
				routes.init();
			});
		};
	});