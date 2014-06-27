/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 * Header controller :
 * load deepjs package.version and show header smoothly
 */
if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
define(["require", "deepjs/deep", "deepjs/lib/view", "./routes.js"], function(require, deep, View, routes) {
	var ribbon = routes.ribbon = deep.View({
		navigation:false,
		config:{
			enhance:false,
			scope:"browser"
		},
		route:"/$",
		done:function(){
			var $ = deep.context.$;
			$("#ribbon-down").fadeOut();
			$("#ribbon-up").fadeIn();
		},
		remove:function(){
			var $ = deep.context.$;
			$("#ribbon-down").fadeIn();
			$("#ribbon-up").fadeOut();
		}
	});
	return ribbon;
});