/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 * TODO : still cross reference to #main : need to delegate
 * Anchor subnavigation controller : seek after h3 in #main a correspondance in #submenu ul li*[href]
 * Try to highlight menu at right entry while scrolling #main.
 * 
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
		var top = $(dom.content).scrollTop() + dom.contentOffset +30;
		var i = closure.headings.length;
		while (i--) {
			h = closure.headings[i];
			if (top >= h.top - 25) return h;
		}
	}

	var prev, prevParents, prevH;
	var hightlightSubmenu = function() {
		var h = closest();
		if (!h) return;
		if(prevH && h.id == prevH.id)
			return;
		prevH = h;
		var $ = deep.context.$, dom = deep.context.dom;
		// console.log("hightlight : ", h);
		if (prev)
			$(prev).removeClass('active');
		if (prevParents)
			$(prevParents).removeClass('active');
		prev = $(dom.submenu).find('a[href="#' + h.id + '"]').parent().addClass('active');
		prevParents = $(prev).parents("li").addClass('active');
		var offset = $(dom.content).scrollTop();
		window.location.hash = h.id;
		$(window).scrollTop(0);
		$(dom.content).scrollTop(offset);
	};

	var resetHeadings = function(){
		var $ = deep.context.$, dom = deep.context.dom;
		closure.headings = [];
		$(dom.content)
		.find('h3, h4')
		.each(function(i, el) {
			closure.headings.push({
				top: $(el).offset().top,
				id: el.id
			});
		});
	}

	return deep.View({
		config:{
			enhance:false
		},
		label:"sub-nav",
		init: deep.compose.after(function() {
			prevH = null;
			console.log("subnav init");
			var $ = deep.context.$, dom = deep.context.dom;
			dom.content = $("#content")
			if(deep.context.concurrency)// you should only bind those event if you in a plein browser environnement
				return;
			$(dom.content).scroll(hightlightSubmenu);
			$(window).resize(resetHeadings);
		}),
		clean:deep.compose.after(function(){
			var $ = deep.context.$, dom = deep.context.dom;
			// console.log("SUB NAV clean")
			if(!deep.context.concurrency) // you should only bind those event if you in a plein browser environnement
			{
				$(dom.content).unbind("scroll", hightlightSubmenu);
				$(window).unbind("resize", resetHeadings);
			}
			this.initialised = false;
		}),
		done: deep.compose.after(function(output) {
			// console.log("SUBMENU DONE : ", output);
			var $ = deep.context.$, dom = deep.context.dom;
			dom.submenu = $(output.placed);
			//__________________________________________________ SCROLL TO ANCHOR on click
			resetHeadings();
			hightlightSubmenu();
			$(dom.submenu)
				.find("a")
				.each(function() {
					var anchor = $(this).attr("href");
					$(this).click(function(e) {
						// console.log("CLICK ON SUBMENU : ", anchor, closure.headings);
						e.preventDefault();
						var offset = deep.query(closure.headings, "/*?id="+anchor.substring(1)).shift();
						if (!offset)
							return;
						offset = Math.round(offset.top - dom.contentOffset - 37);
						// WARNING : work only if hashes are ont used by deep-link
						window.location.hash = anchor.substring(1);
						$(window).scrollTop(0);
						$(dom.content).scrollTop(offset);
					});
				});

		})
	});
});