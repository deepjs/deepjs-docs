/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 * Template/Canevas controller that manage header + main + footer as an app will do (header = top bar, footer = bottom bar, main = content)
 * It mainly set the #main height, accordingly to viewport (viewport.height - header.height - footer.height), to achieve this canevas.
 */

if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
define(["require", "deepjs/deep", "deep-views/lib/view", "deep-routes/browser"], function(require, deep) {

	return deep.View({
		config:{
			enhance:false,
			scope:"browser"
		},
		init:function(){
			var $ = deep.$(), dom = deep.context('dom');
			dom.fullwrapper = $("#fullwrapper");
			dom.header = $("#header");
			dom.uppart = $("#up-part");
			dom.menu = $("#menu");
			dom.main = $("#main");
			dom.footer = $("#footer");
			$(window).resize(this.done);
			deep.route.on("refreshed", this.done);
		},
		done:function(){
			var $ = deep.$(), dom = deep.context('dom');
			var viewPortHeight = $(window).height();
			dom.contentOffset =  104;
			var footerHeight = 68;
			var outContent = dom.contentHeight = dom.contentOffset+ footerHeight;
			dom.contentHeight = viewPortHeight-outContent;
			$(dom.main).css('height', dom.contentHeight);
			$(dom.fullwrapper).css('height', viewPortHeight);
			$(dom.uppart).css('height', viewPortHeight-footerHeight);
			if(dom.content)
				$(dom.content).css('height', dom.contentHeight);//.perfectScrollbar('update');
		},
		clean:function (argument) {
			deep.$(window).unbind("resize", this.done);
			deep.route.unbind("refreshed", this.done);
		}
	});
});

