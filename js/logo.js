/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 * Logo controller : show/hide it depending on route (logo is shown only on root url)
 * Show/hide other ui stuffs.
 */
if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
define(["require", "deepjs/deep", "deep-views/lib/view", "deepjs/documentation/routes"], function(require, deep, View, routes) {
	var logo = routes.logo = deep.View({
		navigation:false,
		config:{
			enhance:false,
			scope:"browser"
		},
		route:"/$",
		done:function(){
			var $ = deep.$(), dom = deep.context('dom');
			$(this.where).slideDown("fast").find(".tools-bar").slideDown(100);
			$("#footer").fadeOut("fast");
			$("#ribbon-down").fadeOut("fast");
			$("#ribbon-up").delay(200).fadeIn("fast");
		},
		remove:function(){
			var $ = deep.$(), dom = deep.context('dom');
			$(this.where).slideUp("fast").find(".tools-bar").slideUp(100);
			$("#footer").delay(150).fadeIn("fast");
			$("#ribbon-down").delay(300).fadeIn("fast");
			$("#ribbon-up").fadeOut("fast");
		},
		where:"#dp-logo-box"
	});
	return logo;
});