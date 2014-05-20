/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 *
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
			if(!deep.context.concurrency)
			{
				$(window).unbind("resize", this.done);
				deep.route.unbind("refreshed", this.done);
			}
		},
		done:function(){
			var $ = deep.context.$, dom = deep.context.dom;
			var windHeight = $(window).height();
			var footerHeight = $(dom.footer).outerHeight(true);
			var offset = parseInt(windHeight) - parseInt(footerHeight);
			var start = dom.contentOffset = $(dom.main).offset().top;
			$(dom.main).css('height', offset-start);
		}
	});
});