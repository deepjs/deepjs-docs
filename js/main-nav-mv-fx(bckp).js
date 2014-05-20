/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 */
if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
define(["require", "deepjs/deep", "deepjs/lib/view", "./dom.js", "./routes.js"], function(require, deep, View, dom, routes) {

	// simple list item creator : use route as href
	var createMenuItem = function(menu, obj, label, active) {
		var $ = deep.context.$;
		var href = (obj.route || ('/' + label)),
			last = href[href.length - 1];
		if (last === "*" || last === "$")
			href = href.substring(0, href.length - 1);
		var item = $('<li' + (active?' class="active"':"") + '"><a href="' + href + '">' + (obj.label || label) + '</a></li>')
			.appendTo(menu);
	};

	deep.utils.up({
		reposition: deep.compose.after(function() {
			var $ = deep.context.$;
			var scrollTop = $(window).scrollTop();
			if (scrollTop >= dom.pos.top) { // FIXED
				if (dom.menu.hasClass('top-header')) {
					dom.content.css("margin-top", dom.menuShift);
					dom.menu.addClass('top-fixed').removeClass("top-header");
				}
			} else if (scrollTop < dom.pos.top) { // MOVING
				if (dom.menu.hasClass('top-fixed')) {
					dom.content.css("margin-top", 0);
					dom.menu.removeClass('top-fixed').addClass("top-header"); //.fadeIn('fast');
				}
			}
		}),
		init: deep.compose.after(function() {
			var $ = deep.context.$;
			dom.menu = $('#menu-container');
			dom.menu1 = $('#menu');
			dom.menu2 = $('#menu2');
			dom.pos = $(dom.menu).offset();
			deep.route.on("refreshed", function(event) {
				dom.reposition();
			});
			if (dom.menu.length)
				$(window).scroll(dom.reposition);
		})
	}, dom);

	var nav = routes.nav = deep.View({
		navigation: false,
		how: function(context) {
			var $ = deep.context.$;
			var menuUL = $("#menu ul").empty(),
				currentRoute = context.route.route;
			Object.keys(routes).forEach(function(i) {
				var mapi = routes[i];
				if (mapi.navigation === false)
					return;
				var active = false;
				if (currentRoute[0] == i || (!currentRoute[0] && i == 'home')) {
					active = true;
					// produce #menu2
					if (mapi.subs) {
						var menu2 = $("#menu2"),
							menu2UL = $(menu2).find("ul").empty(),
							count = 0;
						Object.keys(mapi.subs)
							.forEach(function(j) {
								var subj = mapi.subs[j];
								if (subj.navigation === false)
									return;
								var active2 = false;
								if ((!currentRoute[1] && count == 0) || currentRoute[1] == j)
									active2 = true;
								createMenuItem(menu2UL, subj, j, active2);
								count++;
							});
						$(dom.menu2).show(); //.fadeIn(160);
					} else
						$(dom.menu2).hide();
				}
				createMenuItem(menuUL, mapi, i, active);
			});
		},
	 	where:function(){
	 		return $("#menu-container");
	 	},
		done: deep.compose.after(function(output) {
			var $ = deep.context.$;
			dom.menuShift = $(dom.menu).outerHeight(true);
		})
	});
	return nav;
});