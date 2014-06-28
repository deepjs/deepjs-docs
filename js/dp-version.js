/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 * Header controller :
 * load deepjs package.version and show header smoothly
 */
if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
define(["require", "deepjs/deep", "deepjs/lib/view"], function(require, deep, View) {
	return deep.View({
		config:{
			enhance:false
		},
		what:"json::/bower_components/deepjs/package.json",
		how:function(context){
			// console.log("context dp-version : ", context);
			var $ = deep.context.$;
			console.log("version ? : ", $(context.placed).find(".deepjs-version"));
			$(context.placed).find(".deepjs-version").text(context.what.version);
			if(deep.isBrowser)
				$(context.placed).slideDown("fast");
		}
	});
});