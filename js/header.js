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
			var $ = deep.context.$;
			$(this.placed()).find(".deepjs-version").text(context.what.version);
			if(deep.isBrowser)
				$(this.placed()).find(".hidden").removeClass("hidden").hide().fadeIn();
		}
	});
});