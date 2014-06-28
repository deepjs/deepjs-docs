/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 * Logo controller : show/hide it depending on route (logo is shown only on root url)
 */
if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
define(["require", "deepjs/deep", "deepjs/lib/view", "./routes.js"], function(require, deep, View, routes) {
	var logo = routes.logo = deep.View({
		navigation:false,
		config:{
			enhance:false,
			scope:"browser"
		},
		route:"/$",
		done:function(){
			var $ = deep.context.$, dom = deep.context.dom;
			$(this.where).slideDown("fast").find(".tools-bar").fadeIn(50);
			$("#footer").fadeOut("fast");
			$("#ribbon-down").fadeOut("fast");
			$("#ribbon-up").fadeIn("fast");
		},
		remove:function(){
			var $ = deep.context.$, dom = deep.context.dom;
			$(this.where).slideUp("fast").find(".tools-bar").fadeOut(50);
			$("#footer").fadeIn("fast");
			$("#ribbon-down").fadeIn("fast");
			$("#ribbon-up").fadeOut("fast");
		},
		where:"#dp-logo-box"
	});
	return logo;
});