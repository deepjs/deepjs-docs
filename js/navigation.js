/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 */
if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
define(["require", "deepjs/deep", "deepjs/lib/view"], function(require, deep) {

	// simple list item creator : use route as href
	var createMenuItem = function(menu, obj, label, liclass) {
		var href = (obj.route || ('/' + label)),
			last = href[href.length - 1];
		if (last === "*" || last === "$")
			href = href.substring(0, href.length - 1);
		var item = $('<li class="' + liclass + '"><a href="' + href + '">' + label + '</a></li>')
			.appendTo(menu);
	};

	return {
		init: function(map) {
			var $ = deep.context.$;
			var dom;
			var closure = {};
				//__________________________________ AUTO HIGHLIGHT ANCHOR
			//__________________________________ inspired from expressjs API doc navigation
			function closest() {
				if (!closure.headings)
					return;
				var h;
				var top = $(window).scrollTop() + dom.menuShift;
				var i = closure.headings.length;
				while (i--) {
					h = closure.headings[i];
					if (top >= h.top - 1) return h;
				}
			}
			var prev;
			var hightlightSubmenu = function() {
				var h = closest();
				if (!h) return;

				if (prev)
					prev.removeClass('active');

				var a = $(dom.submenu).find('a[href="#' + h.id + '"]');
				a.addClass('active');
				prev = a;
			};
			$(function() {

				$(document).scroll(hightlightSubmenu);
				//__________________________________ END AUTO HIGHLIGHT ANCHOR
				//_________________________________ NAVIGATION MOVING/FIXED

				dom = {
					menu: $('#menu-container'),
					menu1: $('#menu'),
					menu2: $('#menu2'),
					submenu: null,
					header: $("#header"),
					content: null,
					menuShift: 0,
					pos: null,
					reconfigureMenu: function() {
						this.submenu = $("#submenu");
						this.content = $("#main");
						this.submenu.addClass('submenu-fixed');
						this.menuShift = dom.menu.outerHeight(true);
						//__________________________________________________ SCROLL TO ANCHOR on click
						this.submenu
							.find("a")
							.each(function() {
								var anchor = $(this).attr("href");
								$(this).click(function(e) {
									e.preventDefault();
									var offset = $(anchor).offset();
									if (!offset)
										return;
									offset = Math.round(offset.top - dom.menuShift);
									//console.log("scroll to : ", offset)
									/*$('html, body').animate({
										scrollTop: offset
									}, 80);*/
									window.location.hash = anchor.substring(1);
									$(window).scrollTop(offset);
									deep(this)
									.delay(1)
									.done(function(node){
										if (prev)
											prev.removeClass('active');
										prev = $(node).addClass('active');
									});
								})
								
							});
						//_____________ reset headings for auto-highlight
						closure.headings = $(this.content).find('h3').map(function(i, el) {
							return {
								top: $(el).offset().top,
								id: el.id
							}
						});
					},
					reposition: function() {
						var scrollTop = $(window).scrollTop();
						if (scrollTop >= dom.pos.top) { // FIXED
							if (dom.menu.hasClass('top-header')) {
								dom.content.css("margin-top", dom.menuShift);
								dom.menu.addClass('top-fixed').removeClass("top-header");
							}
							dom.submenu.css("top", (dom.menuShift) + "px");
						} else if (scrollTop < dom.pos.top) { // MOVING
							if (dom.menu.hasClass('top-fixed')) {
								dom.content.css("margin-top", 0);
								dom.menu.removeClass('top-fixed').addClass("top-header"); //.fadeIn('fast');
							}
							dom.submenu.css("top", ((dom.pos.top - scrollTop) + dom.menuShift) + "px");
						}
					}
				}
				if (!dom.menu.length)
					return;
				dom.pos = dom.menu.offset();
				dom.reconfigureMenu();
				$(window).scroll(dom.reposition);
			});
			//________________________________________________ reconfigure + reset ui after route refresh
			deep.route.on("refreshed", function(event) {
				dom.reconfigureMenu();
				dom.reposition();
				hightlightSubmenu();
			});
			//_______________________________________________ END NAVIGATION MOVE
			//_________________________________ NAVIGATION VIEW
			// produce simple or double primary nav(s) directly from html map
			map.nav = deep.View({
				navigation: false,
				how: function(context) {
					var where = this.where;
					if (!where)
						where = this.where = dom.menu;
					var menuUL = $(dom.menu1).find("ul").empty();
					var route = context.route.route;
					//console.log("NAVIGATION : ", route);
					Object.keys(map).forEach(function(i) {
						var mapi = map[i];
						if (mapi.navigation === false)
							return;
						var liclass = "";
						if (route[0] == i || (!route[0] && i == 'home')) {
							liclass = 'active';
							// produce #menu2
							if (mapi.subs) {
								var menu2UL = $(dom.menu2).find("ul").empty();
								Object.keys(mapi.subs).forEach(function(j) {
									var subj = mapi.subs[j];
									if (subj.navigation === false)
										return;
									var liclass2 = "";
									if (route[1] == j)
										liclass2 = 'active';
									createMenuItem(menu2UL, subj, j, liclass2);
								});
								$(dom.menu2).show(); //.fadeIn(160);
							} else
								$(dom.menu2).hide();
						}
						createMenuItem(menuUL, mapi, i, liclass);
					});
				}
			});
			//_______________________________________________ END NAVIGATION VIEW
		}
	};
});