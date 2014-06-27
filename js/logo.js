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
			enhance:false
		},
		route:"/$",
		done:function(output){
			if(deep.isBrowser)
			{
				var $ = deep.context.$;
				$(this.where).slideDown("fast");
				$("#footer").slideUp("fast");
			}
		},
		remove:function(){
			if(deep.isBrowser)
			{
				var $ = deep.context.$;
				$(this.where).slideUp("fast", function(){
					$("#footer").slideDown("fast");
				});
			}
		},
		where:"#dp-logo-box"
	});
	return logo;
});