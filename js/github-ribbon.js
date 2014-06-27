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
			enhance:false
		},
		route:"/$",
		done:function(){
			if(deep.isBrowser)
			{
				var $ = deep.context.$;
				$("#ribbon-down").fadeOut("fast");
				$("#ribbon-up").fadeIn("fast");
			}
		},
		remove:function(){
			if(deep.isBrowser)
			{
				var $ = deep.context.$;
				$("#ribbon-down").fadeIn("fast");
				$("#ribbon-up").fadeOut("fast");
			}
		}
	});
	return ribbon;
});