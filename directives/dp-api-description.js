/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 * arguments/return html representation
 */
if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
define(["require", "deepjs/deep", "deep-views/lib/view"], function(require, deep, View) {
	deep.ui.directives["dp-api-description"] = function(node, route) {
		var $ = deep.$();
		var doubleCol = '<div class="row dp-api-description"><div class="col-sm-12 col-md-6  dp-api-col">' + '<span class="label label-info">Arguments</span>' + '<div class="dp-api-block">' + $('<div>').append($(node).find("*[rel=args]").clone()).html() + '</div></div><div class="col-sm-12 col-md-6 dp-api-col">' + '<span class="label label-success">Return</span>' + '<div class="dp-api-block">' + $('<div>').append($(node).find("*[rel=returns]").clone()).html() + '</div></div></div>';
		$(node).replaceWith(doubleCol);
	};
});