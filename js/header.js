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
		what:"json::/bower_components/deepjs/package.json",
		how:function(context){
			var $ = deep.context.$;
			$(this.where).find(".deepjs-version").text(context.what.version);
			$(this.where).find(".hidden").removeClass("hidden").hide().fadeIn();
		}
	});
});