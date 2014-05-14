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


			//__________________________________________ ROUTES
			deep.route.deepLink({ /* config */ });

			deep.route(map)
				.done(function(routes) {
					routes.init();
				});

			//___________________________________________  VERSION
			deep.get("json::/bower_components/deepjs/package.json")
			.done(function(s) {
				// console.log("package : ", s)
				$(".deepjs-version").text(s.version);
				$(".deepjs-version-label").css("visibility", "visible").hide().fadeIn();
			})
			.elog();
		};


		//_________________________________ NAVIGATION MOVING/FIXED
		$(function() {
			var dom = deep.globals.dom = {
				menu : $('#menu-container'),
				submenu : null,
				header : $("#header"),
				content : null,
				menuShift : 0,
				pos:null,
				reconfigureMenu:function(){
					this.submenu = $("#submenu"),
					this.content = $("#content"),
					this.menuShift = dom.menu.outerHeight(true);
					this.submenu.addClass('submenu-fixed');
					this.pos = this.menu.offset();
				},
				reposition : function() {
					var scrollTop = $(window).scrollTop();
					if (scrollTop >= dom.pos.top)
					{
						if(dom.menu.hasClass('top-header')) {
							dom.content.css("margin-top", dom.menuShift);
							dom.menu.removeClass("top-header").addClass('top-fixed'); //.fadeIn('fast');
						}
						dom.submenu.css("top", (dom.menuShift) + "px");
					} else if (scrollTop < dom.pos.top) {
						if (dom.menu.hasClass('top-fixed')) {
							dom.content.css("margin-top", 0);
							dom.menu.removeClass('top-fixed').addClass("top-header"); //.fadeIn('fast');
						}
						dom.submenu.css("top", ((dom.pos.top - scrollTop) + dom.menuShift-1) + "px");
					}
				}
			}
			if (!dom.menu.length)
				return;
			dom.reconfigureMenu();
			$(window).scroll(dom.reposition);
			dom.reposition();
		});
		return init;
	});