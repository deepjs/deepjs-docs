/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 */
define([
		"require",
		"deep-browser/index",
		"./js/pages.js",
		"./js/navigation.js",
		"deep-jquery/ajax/json",
		"deep-jquery/ajax/html",
		"deepjs/lib/unit",
		"deepjs/lib/stores/collection",
		"deepjs/lib/stores/object",
		"deepjs/lib/schema",
		"deep-swig/index",
		"deep-widgets/lib/deep-try"
	],
	function(require, deep, map, navigation) {
		// ___________ base protocols
		deep.jquery.JSON.create();
		deep.jquery.HTML.create();
		deep.Swig();
		deep.jquery.set($);
		//___________ start
		//console.log("start app-sndbx : ", map);
		deep.globals.pages = map;
		deep.route.deepLink({ /* config */ });
		//____________________ finalise map
		deep.utils.up({
			_deep_sheet_:true,
			"dq.transform::.//?how":function(node){
				var value = node.value;
				if(typeof value.route === 'undefined')		// default route === view.path without '/subs'
					value.route = node.path.replace("/subs","");
				if(typeof value.where === 'undefined')		// default where === htmlof #main
					value.where = "dom.htmlOf::#main";
				return deep.utils.bottom(deep.View(),value);
			}
		}, map);
		//___________________________________________  VERSION
		deep.get("json::/bower_components/deepjs/package.json")
		.done(function(s) {
			$(".deepjs-version").text(s.version);
			$(".deepjs-version-label").css("visibility", "visible").hide().fadeIn();
		})
		.elog();
		// launch init (init navigation + flatten and compile htmls map)
		navigation.init(map);
		var p = deep.route(map);
		//_________________________ init route (final)
		var init = function() {
			p.done(function(routes) {
				console.log("app-sndbx intialised");
				routes.init();
			});
		};
		return init;
	});