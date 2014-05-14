/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 */
define([
		"require",
		"deep-browser/index",
		"./maps/pages.js",
		"deepjs/lib/unit",
		"deepjs/lib/stores/collection",
		"deepjs/lib/stores/object",
		"deepjs/lib/schema",
		"deep-swig/index",
		"deep-widgets/lib/deep-try",
		"deep-jquery/ajax/json",
		"deep-jquery/ajax/html"
	],
	function(require, deep, map) {
		console.log("start app-sndbx : ", map);
		deep.globals.pages = map;
		var init = function() {
			deep.jquery.set($);
			deep.jquery.JSON.create();
			deep.jquery.HTML.create();
			deep.Swig();
			//deep.ui.enhance("body");
			console.log("app-sndbx intialised");

			deep.route.deepLink({ /* config */ });

			deep.route(map)
				.done(function(routes) {
					routes.init();
				});

			var nav = [];
			for(var i in map)
			{
				var entry = map[i];
				var navi = { label:i, entry:entry, subnav:null };
				nav.push(navi);
				if(entry.subs)
				{
					navi.subnav = [];
					for(var j in entry.subs)
					{
						var subj = entry.subs[j];
						navi.subnav.push({ label:j, entry:subj });
					}
				}
			}

			console.log("nav produced : ", nav);

			nav.forEach(function(n){
				$('#menu ul').append('<li><a href="#">'+n.label+'</a></li>');
			})


			deep.get("json::/bower_components/deepjs/package.json")
			.done(function(s) {
				// console.log("package : ", s)
				$(".deepjs-version").text(s.version);
				$(".deepjs-version-label").css("visibility", "visible").hide().fadeIn();
			})
			.elog();
		};

		$(function() {

			var dom = deep.globals.dom = {
				menu : $('#menu-container'),
				submenu : $("#submenu"),
				header : $("#header"),
				content : $("#content"),
				menuShift : 0,
				reposition : function() {
					var scrollTop = $(window).scrollTop();
					if (scrollTop >= pos.top)
					{
						if(dom.menu.hasClass('top-header')) {
							dom.content.css("margin-top", dom.menuShift);
							dom.menu.removeClass("top-header").addClass('top-fixed'); //.fadeIn('fast');
						}
						dom.submenu.css("top", (dom.menuShift) + "px");
					} else if (scrollTop < pos.top) {
						if (dom.menu.hasClass('top-fixed')) {
							dom.content.css("margin-top", 0);
							dom.menu.removeClass('top-fixed').addClass("top-header"); //.fadeIn('fast');
						}
						dom.submenu.css("top", ((pos.top - scrollTop) + dom.menuShift-1) + "px");
					}
				}
			}
			dom.submenu.addClass('submenu-fixed');
			dom.menuShift = dom.menu.outerHeight(true);
			var pos = dom.menu.offset();

			if (!dom.menu.length)
				return;

			$(window).scroll(dom.reposition);
			dom.reposition();
		});
		return init;
	});