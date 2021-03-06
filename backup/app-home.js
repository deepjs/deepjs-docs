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
		"deep-widgets/lib/deep-try",
		"deep-jquery/ajax/json"
	],
	function(require, deep) {
		console.log("start app-sndbx");
		var init = function() {
			deep.jquery.set($);
			deep.jquery.JSON.create();
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

			deep.get("json::/bower_components/deepjs/package.json")
			.done(function(s){
				console.log("package : ", s)
				$(".deepjs-version").text(s.version);
				$(".deepjs-version-label").css("visibility","visible").hide().fadeIn();
			})
			.elog();
		};

		$(function(){
			var menu = $('#menu-container'),
				submenu = $("#submenu"),
				header = $("#header"),
				content = $("#content"),
				pos = menu.offset();

			if(!menu.length)
				return;
			var menuShift = menu.outerHeight(true);

			var reposition = function(){
				var scrollTop = $(this).scrollTop();
				if(scrollTop >= pos.top && menu.hasClass('top-header')){
					content.css("margin-top", menuShift);
					menu.removeClass("top-header").addClass('top-fixed');//.fadeIn('fast');
					submenu.css("top", (menuShift)+"px");
				} else if(scrollTop < pos.top)
				{
					if(menu.hasClass('top-fixed')){
						content.css("margin-top", 0);
						menu.removeClass('top-fixed').addClass("top-header");//.fadeIn('fast');
					}
					submenu.css("top", ((pos.top-scrollTop)+menuShift)+"px")
				}
			};
			$(window).scroll(reposition);
			reposition();
		});
		return init;
	});