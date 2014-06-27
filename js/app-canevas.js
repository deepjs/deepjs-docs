/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 * Template/Canevas controller that manage header + main + footer as an app will do (header = top bar, footer = bottom bar, main = content)
 * It mainly set the #main height, accordingly to viewport (viewport.height - header.height - footer.height), to achieve this canevas.
 *
 * Warning : as it's done now : there is another coupling with #content (that is in #main and refered by dom.content for optimisation): it's just a trick to get correct scroll for this dom entry.
 */

if (typeof define !== 'function')
	var define = require('amdefine')(module);

define(["require", "deepjs/deep", "deep-routes/browser"], function(require, deep) {

	return deep.View({
		config:{
			enhance:false,
			scope:"browser"
		},
		init:function(){
			// console.log("APP TEMPLATE INIT");
			var $ = deep.context.$, dom = deep.context.dom;
			dom.header = $("#header");
			dom.main = $("#main");
			dom.footer = $("#footer");
			dom.contentOffset = $(dom.main).offset().top;
			if(!deep.context.concurrency)
			{
				$(window).resize(this.done);
				deep.route.on("refreshed", this.done);
			}
		},
		done:function(){
			var $ = deep.context.$, dom = deep.context.dom;
			var viewPortHeight = $(window).height() -10;
			dom.contentOffset =  104; //$("#header").outerHeight(true);
			var footerHeight = 68;// $(dom.footer).outerHeight(true);
			//var logoHeight = $("#dp-logo-box").outerHeight(true) ;
			var outContent = dom.contentHeight = dom.contentOffset+ footerHeight;
			dom.contentHeight = viewPortHeight-outContent;
			// console.log("done app canevas : ", dom.contentOffset, footerHeight, outContent, dom.contentHeight)
			$(dom.main).css('height', dom.contentHeight);
			$("#up-part").css('height', viewPortHeight-footerHeight);
			$(dom.content).css('height', dom.contentHeight);
			// console.log("APP TEMPLATE DONE");
		},
		clean:function (argument) {
			// console.log("APP TEMPLATE CLEAN");
			if(!deep.context.concurrency)
			{
				$(window).unbind("resize", this.done);
				deep.route.unbind("refreshed", this.done);
			}
		}
	});
});

