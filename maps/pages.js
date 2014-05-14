if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define(["require", "deepjs/deep", "deepjs/lib/view"], function (require, deep) {
 	var map = {

 		root:{
 			route:"/*",
 			how:"html::/pages/root.html"
 		},
		layers:{
			subs:{
				"up-bottom":{ how:"html::/pages/layers/up-bottom.html" },
				compositions:{ how:"html::/pages/layers/compositions.html" },
				colliders:{ how:"html::/pages/layers/colliders.html" }
			}
		},
		chains:{
			subs:{
				promise:{ how:"html::/pages/chains/promises.html" },
				deep:{ how:"html::/pages/chains/deep.html" },
				others:{ how:"html::/pages/layer/colliders.html" }
			}
		},
		restful:{
			subs:{
				promise:{ how:"html::/pages/chains/promises.html" },
				deep:{ how:"html::/pages/chains/deep.html" },
				others:{ how:"html::/pages/layer/colliders.html" }
			}
		},
		ocm:{

		},
		tests:{
			how:"html::/pages/tests.html",
			run:function(){
				deep.Unit.run(null, {
					verbose: true
				})
				.done(function(report) {
					console.log("report : ", report);
					report.reports = null;
					$("#reports-container").html("<div>Tests result : <pre class='dp-box'>" + JSON.stringify(report, null, ' ') + '</pre></div>').slideDown(100);
				});
			}
		},
		author:{ how:"html::/pages/author.html" }
	};

	return deep.utils.up({
		_deep_sheet_:true,
		"dq.transform::.//?how":function(node){
			var value = node.value;
			if(!value.route)
				value.route = node.path.replace("/subs","");
			if(!value.where)
				value.where = "dom.htmlOf::#main";
			if(!value.done)
				value.done = function(output){
					deep.globals.dom.submenu = $("#submenu").addClass('submenu-fixed');
					deep.globals.dom.content = $("#content");
					deep.globals.dom.reposition();
					console.log("output params ", output)
				};
			return deep.View(value);
		}
	}, map);
});
