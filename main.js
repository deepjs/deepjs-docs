/**  @author Gilles Coomans <gilles.coomans@gmail.com> */

// main.js : load all first dependencies
require.config({
	baseUrl: "/bower_components"
});
require([/*"deepjs/ie-hacks", "deepjs/json2",*/, "app.js"], 
function(/*ace, ieHacks, json2,*/ deep, app) {
	app($);
});