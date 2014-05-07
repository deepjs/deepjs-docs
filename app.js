/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 */
define([
		"require",
		"deep-browser/index",
		"deepjs/lib/unit",
		"deepjs/lib/stores/collection",
		"deepjs/lib/stores/object",
		"deepjs/lib/schema",
		"deep-widgets/lib/deep-try"
	],
	function(require, deep) {
		console.log("start app-sndbx");
		var init = function() {
			deep.jquery.set($);
			deep.ui.enhance("body");
			console.log("app-sndbx intialised");
			$(".run-core-units-verbose").click(function(e) {
				e.preventDefault();
				deep.Unit.run(null, {
					verbose: true
				})
				.done(function(report) {
					console.log("report : ", report);
					report.reports = null;
					$("#reports-container").html("<div>Tests result : <pre class='dp-box'>" + JSON.stringify(report, null, ' ') + '</pre></div>').slideDown(50);
				});
			});
		};
		$(function(){
			var menu = $('#menu'),
				pos = menu.offset();
			$(window).scroll(function(){
				if($(this).scrollTop() > pos.top && menu.hasClass('top-header')){
					console.log("menu out of screen")
					$("#submenu").removeClass("submenu-moving").addClass('submenu-fixed');//.fadeIn('fast');
					menu.removeClass("top-header").addClass('top-fixed');//.fadeIn('fast');
				} else if($(this).scrollTop() <= pos.top && menu.hasClass('top-fixed')){
					menu.removeClass('top-fixed').addClass("top-header");//.fadeIn('fast');
					$("#submenu").addClass("submenu-moving").removeClass('submenu-fixed');//.fadeIn('fast');
				}
			});
		});
		return init;
	});