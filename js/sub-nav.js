/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 * TODO : still cross reference to #main : need to delegate
 */

if (typeof define !== 'function')
	var define = require('amdefine')(module);

define(["require", "deepjs/deep", "deepjs/lib/view"], function(require, deep, View) {
	var closure = {};

	//__________________________________ AUTO HIGHLIGHT ANCHOR
	//__________________________________ inspired from expressjs API doc navigation
	function closest() {
		var $ = deep.context.$, dom = deep.context.dom;
		if (!closure.headings)
			return;
		var h;
		var top = $(dom.main).scrollTop() + dom.contentOffset +30;
		var i = closure.headings.length;
		while (i--) {
			h = closure.headings[i];
			if (top >= h.top - 25) return h;
		}
	}

	var prev;
	var hightlightSubmenu = function() {
		var h = closest();
		if (!h) return;
		//console.log("hightlight : ", h);
		var $ = deep.context.$, dom = deep.context.dom;
		if (prev)
			$(prev).removeClass('active');
		prev = $(dom.submenu).find('a[href="#' + h.id + '"]').addClass('active');
	};

	var resetHeadings = function(){
		var $ = deep.context.$, dom = deep.context.dom;
		closure.headings = $(dom.main)
		.find('h3')
		.map(function(i, el) {
			return {
				top: $(el).offset().top,
				id: el.id
			}
		});
	}

	return deep.View({
		init: deep.compose.after(function() {
			//console.log("subnav init");
			if(deep.context.concurrency)
				return;
			var $ = deep.context.$, dom = deep.context.dom;
			if(!deep.context.concurrency)
			{
				$(dom.main).scroll(hightlightSubmenu);
				$(window).resize(resetHeadings);
			}
		}),
		clean:deep.compose.after(function(){
			var $ = deep.context.$;
			//console.log("SUB NAV clean")
			if(!deep.context.concurrency)
			{
				$(dom.main).unbind("scroll", hightlightSubmenu);
				$(window).unbind("resize", resetHeadings);
			}
		}),
		done: deep.compose.after(function(output) {
			var $ = deep.context.$, dom = deep.context.dom;
			dom.submenu = $(output.placed);
			//__________________________________________________ SCROLL TO ANCHOR on click
			dom.submenu
				.find("a")
				.each(function() {
					var anchor = $(this).attr("href");
					$(this).click(function(e) {
						e.preventDefault();
						var offset = $(anchor).offset();
						if (!offset)
							return;
						offset = Math.round(offset.top - dom.contentOffset);
						// WARNING : work only if hashes are ont used by deep-link
						window.location.hash = anchor.substring(1);
						$(window).scrollTop(offset);
						deep(this)
							.delay(1)
							.done(function(node) {
								if (prev)
									prev.removeClass('active');
								prev = $(node).addClass('active');
							});
					});
				});
			resetHeadings();
			hightlightSubmenu();
		})
	});
});