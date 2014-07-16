if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 */
define([
		"require",
		"deepjs/deep",
		// routes from deepjs documentation folder
		"deepjs/documentation/routes",
		// site specific
		"./js/app-canevas.js",
		"./js/main-nav.js",
		"./js/sub-nav.js",
		"./js/logo.js",
		"./js/dp-version.js",
		// ressources providers
		"deep-jquery/ajax/json",
		"deep-jquery/ajax/html",
		"deep-swig/index",
		// load extra from core (not loaded by default)
		"deepjs/lib/unit",
		"deepjs/lib/schema",
		"deepjs/lib/restful/collection",
		"deepjs/lib/restful/chain",
		"deepjs/lib/views/dom-sheeter",
		// "deepjs/lib/stores/object",
		// html enhancement directives
		"deep-widgets/lib/deep-try",
		"deep-widgets/lib/dp-svg-trick",
		"deep-widgets/lib/dp-api-description"
	],
	function(require, deep, map) {
		// ___________ base protocols
		deep.jquery.JSON.create();	// default json::
		deep.jquery.HTML.create();	// default html::
		deep.Swig();				// default swig:: 
		// define "docs::" (html provider) protocol to point to deepjs/documentation
		deep.jquery.HTML.create("docs", "/bower_components/deepjs/documentation");

		// create contextualised dom name space
		var dom = deep.context.dom = {};
		// configure deep-link
		deep.route.deepLink({ });	// deep-link config


		//____________________ finalise map : transform entries to deep.View and apply default behaviour/api
		// if we done it here : it's just to keep map clear and short.
		// for this : we simply use a deep-sheet.
		deep.sheet({
			_deep_sheet_:true,
			// for all entry in map that contain a 'how' property : we apply this transformation
			"dq::.//?how":deep.sheet.transform(function(node){
				if(node.value._deep_view_)	// already a view. skip.
					return node.value;
				var value = node.value;
				if(typeof value.route === 'undefined')		// default route === view path without '/subs'
					value.route = node.path.replace("/subs","");
				if(!value.where)	// add default "where"
					value.where = function(rendered){
						var $ = deep.context.$;
						// place as html of #main. add fadeIn effect on dom insertion. don't forget to return inserted node.
						var node = $("#main").html(rendered).children();
						if(deep.isBrowser)
							$(node).hide().delay(100).fadeIn(250);
						return node;
					};
				return deep(value)
				.bottom(deep.View())
				.up({ 
					// adding 'done' behaviour
					done:deep.compose.after(function(){
						var $ = deep.context.$, dom = deep.context.dom;
						dom.content = $("#content");
						if(!deep.isBrowser)
							return;
						if($(dom.content).outerHeight(true)+30 > dom.contentHeight)
							$(dom.content).append('<div style="height:'+(dom.contentHeight-150)+'px;">&nbsp;</div>')
						$(dom.main).scrollTop(0);
					})
				});
			})
		}, map);

		//___ little hack to allow refresh from particular state without loosing uri in "browser only" env.
		// i.e. when there is no "Search Engine friendly mecanism" associate to this single page app (server side).
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

		//_________________________ app init: compile and initialise routes (final)
		return function($) {
			// init contextualised jquery reference
			deep.jquery.set($);
			// enhance dp-* already present in html
			// console.profile("first enhance")
			deep.ui.enhance({}, "html");	
			// console.profileEnd("first enhance")
			// compile html routes map
			deep.route(map)
			//.delay(100)	
			.done(function(routes) {
				console.log("app intialised");
				routes.init();
			});
		};
	});