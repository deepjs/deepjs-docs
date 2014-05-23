/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 * Template/Canevas controller that manage header + main + footer as an app will do (header = top bar, footer = bottom bar, main = content)
 * It mainly set the #main height, accordingly to viewport (viewport.height - header.height - footer.height), to achieve this canevas.
 */

if (typeof define !== 'function')
	var define = require('amdefine')(module);

define(["require", "deepjs/deep", "deep-routes/browser"], function(require, deep) {

	return deep.View({
		init:function(){
			// console.log("APP TEMPLATE INIT");
			var $ = deep.context.$;
			var dom = deep.context.dom;
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
		clean:function (argument) {
			// console.log("APP TEMPLATE CLEAN");
			if(!deep.context.concurrency)
			{
				$(window).unbind("resize", this.done);
				deep.route.unbind("refreshed", this.done);
			}
		},
		done:function(){
			var $ = deep.context.$, dom = deep.context.dom;
			var viewPortHeight = $(window).height();
			dom.contentOffset =  $(dom.menu).outerHeight(true)+ $(dom.header).outerHeight(true);
			var outContent = dom.contentHeight = dom.contentOffset + $(dom.footer).outerHeight(true) + 16;
			dom.contentHeight = viewPortHeight-outContent;
			$(dom.main).css('height', dom.contentHeight);
			$(dom.content).css('height', dom.contentHeight);
			// console.log("APP TEMPLATE DONE");
		}
	});
});

