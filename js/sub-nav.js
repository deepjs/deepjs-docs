/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 * TODO : still cross reference to #main : need to delegate
 * Anchor subnavigation controller : seek after h3 in #main a correspondance in #submenu ul li*[href]
 * Try to highlight menu at right entry while scrolling #main.
 *
 *
 * Browser/Server behaviour and design concerns : 
 *
 * This controller is aimed to be used as a singleton (could only have one submenu on screen at a time)
 * So we could use locals variables without concurrency or design problems.
 * 
 * He has nothing to do server side. ==> dp-scope="browser"
 *
 *
 * COUPLING : need #content in html and a simple ul/li/a or ul/li/ul/li/a structure to wrap
 * 
 * 
 * TODO : produce navigation automaticaly based on h3, h4 from #content
 */

if (typeof define !== 'function')
	var define = require('amdefine')(module);

define(["require", "deepjs/deep", "deepjs/lib/view"], function(require, deep, View) {
	// WARNING : localy declaring those vars are ennemy of concurrency. but in our case : it works. (see above)
	var prev, prevParents, prevH, fromID = false, oldContentHeight, contentContainer, headings;

	//__________________________________ AUTO HIGHLIGHT ANCHOR
	//__________________________________ inspired from expressjs API doc navigation
	//
	// catch closest heading to top of content
	function closest() {
		if (!headings)
			return;

		var $ = deep.context.$, 
			dom = deep.context.dom,
			h,
			top = $(dom.content).scrollTop() + dom.contentOffset +40,
			i = headings.length;
		while (i--) {
			h = headings[i];
			// console.log("closest : ", i, top, h.top, top >= h.top - 40);
			if (top >= h.top - 40) return h;
		}
	}


	// catch all content's h3 and h4 and store their heights in local array
	var resetHeadings = function(init){
		var $ = deep.context.$, dom = deep.context.dom;
		var scrollTop = $(dom.content).scrollTop();
		if(init)
		{
			headings = [];
			$(dom.content)
			.find('h3, h4')
			.each(function(i, el) {
				headings.push({
					top: $(el).offset().top + scrollTop,
					id: el.id,
					el: el
				});
			});
		}
		else
			headings.forEach(function(h){
				h.top = $(h.el).offset().top + scrollTop;
			});
	};

	// we need to reset headings .top property when content height has changed
	var checkHeight = function(){
		var $ = deep.context.$, dom = deep.context.dom;
		var newHeight = $(contentContainer).height();
		if( newHeight !==  oldContentHeight)
		{
			oldContentHeight = newHeight;
			resetHeadings();
		}
	};

	// just highlight (swap active) associate navigation dom entry
	var highlight = function(h){
		// console.log("hightlight : ", h);
		var $ = deep.context.$, dom = deep.context.dom;
		if (prev)
			$(prev).removeClass('active');
		if (prevParents)
			$(prevParents).removeClass('active');
		prev = $(dom.submenu).find('a[href="#' + h.id + '"]').parent().addClass('active');
		prevParents = $(prev).parents("li").addClass('active');
	};

	// highlight submenu entry with id
	var highlightById = function(id){
		checkHeight();
		var h = deep.query(headings, "/*?id="+id).shift();
		if (!h)
			return;
		prevH = h;
		var $ = deep.context.$, dom = deep.context.dom;
		var offset = Math.round(h.top - dom.contentOffset - 39);

		// WARNING : work only if hashes are ont used by deep-link
		deep.context.hash = id;
		window.location.hash = id;
		$(window).scrollTop(0);
		fromID = true;
		$(dom.content).scrollTop(offset);
		highlight(h);
	};

	// highlight menu on position
	var highlightClosest = function() {
		if(fromID)
		{
			fromID = false;
			return;
		}
		checkHeight();
		var h = closest();
		// console.log("highlightClosest : ", h);
		if(!h || (prevH && h.id == prevH.id))
			return;
		prevH = h;
		highlight(h);
		var $ = deep.context.$, dom = deep.context.dom;
		var offset = $(dom.content).scrollTop();
		window.location.hash = deep.context.hash = h.id;
		$(window).scrollTop(0);
		$(dom.content).scrollTop(offset);
	};

	return deep.View({
		config:{
			enhance:false,
			scope:"browser"
		},
		init: deep.compose.after(function() {
			prevH = null;
			var $ = deep.context.$, dom = deep.context.dom;
			dom.content = $("#content");	// wee need it at different place. and to be sure to have it here and now : we catch it also here blindly.
			contentContainer = $(dom.content).wrapInner('<div></div>').children().first();
			// add listeners
			$(dom.content).scroll(highlightClosest);
			// console.log("sub nav init");
		}),
		clean: deep.compose.after(function(){
			// remove listeners
			var $ = deep.context.$, dom = deep.context.dom;
			$(dom.content).unbind("scroll", highlightClosest);
			// console.log("sub nav clean");
		}),
		done: deep.compose.after(function(output) {
			var $ = deep.context.$, dom = deep.context.dom;
			oldContentHeight = $(contentContainer).height();
			dom.submenu = $(output.placed);
			//__________________________________________________ highlight by location.hash or closest
			// console.log("sub nav done : ", deep.context.hash);

			resetHeadings(true);
			if(deep.context.hash)
				deep.delay(1).done(function(){ highlightById(deep.context.hash); });
			else
				highlightClosest();
			//__________________________________________________ scroll to anchor on click
			$(dom.submenu)
				.find("a")
				.each(function() {
					var anchor = $(this).attr("href");
					$(this).click(function(e) {
						e.preventDefault();
						highlightById(anchor.substring(1));
					});
				});
		})
	});
});