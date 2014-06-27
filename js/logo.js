/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 * Header controller :
 * load deepjs package.version and show header smoothly
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
		done:function(output){
			var $ = deep.context.$;
			$(this.where).slideDown("fast");
			$("#footer").fadeOut("fast");
		},
		remove:function(){
			var $ = deep.context.$;
			$(this.where).slideUp("fast");
			$("#footer").fadeIn("fast");
		},
		where:"#dp-logo-box"
	});
	return logo;
});