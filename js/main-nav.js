/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 * A menu controller that manage single or double navigation. 
 * It reads entries from the routes map itself.
 * Need html structure : <#menu><#menu1><ul></ul></#menu1><#menu2><ul></ul></#menu2></#menu>
 */
if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
define(["require", "deepjs/deep", "deepjs/lib/view", "./routes.js"], function(require, deep, View, routes) {

	// simple list item creator : use route as href
	var createMenuItem = function(menu, obj, label, active) {
		var $ = deep.context.$;
		var href = (obj.route || ('/' + label)),
			last = href[href.length - 1];
		if (last === "*" || last === "$")
			href = href.substring(0, href.length - 1);
		var item = $('<li' + (active?' class="active"':"") + '><a href="' + href + '">' + (obj.label || label) + '</a></li>')
		.appendTo(menu);
	};


	var nav = routes.nav = deep.View({
		config:{
			enhance:false
		},
		navigation: false,
		init:function(){			
			var $ = deep.context.$, dom = deep.context.dom;
			// save dom node references in context.dom.
			// for optimisation.
			dom.menu = $("#menu");
			dom.menu1UL = $(dom.menu).find("#menu1 ul");
			dom.menu2 = $("#menu2");
			dom.menu2UL = $(dom.menu2).find("ul");
		},
		how: function(context) {
			// create single or double nav from routes-map. use current route to define which is active.
			var $ = deep.context.$, dom = deep.context.dom, currentRoute;
			if(context && context.route)
				currentRoute = context.route.route;
			$(dom.menu1UL).empty();
			Object.keys(routes).forEach(function(i) {
				var mapi = routes[i];
				var active = false;
				if (currentRoute && (currentRoute[0] == i || (!currentRoute[0] && i == 'home'))) {
					active = true;
					// produce #menu2
					if (mapi.subs) {
						$(dom.menu2UL).empty();
						var count = 0;
						Object.keys(mapi.subs)
							.forEach(function(j) {
								var subj = mapi.subs[j];
								if (subj.navigation === false)
									return;
								var active2 = false;
								if (currentRoute && ((!currentRoute[1] && count == 0) || currentRoute[1] == j))
									active2 = true;
								createMenuItem(dom.menu2UL, subj, j, active2);
								count++;
							});
						$(dom.menu2).show(); //.fadeIn(160);
					} else
						$(dom.menu2).hide();
				}
				if (mapi.navigation === false)
					return;
				createMenuItem(dom.menu1UL, mapi, i, active);
			});
		},
		where:function(){
			var $ = deep.context.$, dom = deep.context.dom;
			return dom.menu;
		}
	});
	return nav;
});