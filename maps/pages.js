if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define(["require", "deepjs/deep", "deepjs/lib/view"], function (require, deep) {
 	var map = {
 		nav:{
 			navigation:false,
 			route:null,
 			how:function(context){
 				var where = this.where;
 				if(!where)
 					where = this.where = $("#menu-container");
 				var menuUL = $(where).find("#menu ul");
 				menuUL.empty();
 				var route = context.route.route;
 				//console.log("NAVIGATION : ", route);
 				Object.keys(map).forEach(function(i){
					var mapi = map[i];
					if(mapi.navigation === false)
						return;
					var href = (mapi.route || ('/'+i)), 
						last = href[href.length-1];
					if(last === "*" || last === "$")
						href = href.substring(0, href.length-1);

					var liclass = "";
					if(route[0] == i || (!route[0] && i == 'home'))
					{
						liclass = 'active';
						// produce #menu2
						if(mapi.subs)
						{
							var menu2 = $("#menu2 ul").empty(), count = 0;
							Object.keys(mapi.subs).forEach(function(j){
								var subj = mapi.subs[j];
								var href = subj.route;
								if(!href)
									return;
								var	last = href[href.length-1];
								if(last === "*" || last === "$")
									href = href.substring(0, href.length-1);

								var liclass2 = "";
								if(route[1] == j)
									liclass2 = 'active';
								$('<li class="'+liclass2+'"><a href="'+href+'">'+j+'</a></li>')
								.appendTo(menu2);
								count++;
							});
							$("#menu2").show();
						}
						else
							$("#menu2").hide();
					}
 					var item = $('<li class="'+liclass+'"><a href="'+href+'">'+i+'</a></li>')
 					.appendTo(menuUL);
 				});
 			},
 			where:null,
 			done:function(output){}
 		},
 		home:{
 			route:"/$",
 			how:"html::/pages/root.html"
 		},
		layers:{
			how:"<div>layers</div>",
			subs:{
				"up-bottom":{ how:"html::/pages/layers/up-bottom.html" },
				compositions:{ how:"html::/pages/layers/compositions.html" },
				colliders:{ how:"html::/pages/layers/colliders.html" }
			}
		},
		chains:{
			how:"<div>chains</div>",
			subs:{
				promise:{ how:"html::/pages/chains/promises.html" },
				deep:{ how:"html::/pages/chains/deep.html" },
				others:{ how:"html::/pages/layer/colliders.html" }
			}
		},
		restful:{
			how:"<div>restful</div>",
			subs:{
				promise:{ how:"html::/pages/chains/promises.html" },
				deep:{ how:"html::/pages/chains/deep.html" },
				others:{ how:"html::/pages/layer/colliders.html" }
			}
		},
		ocm:{
			how:"<div>ocm</div>",
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
		}
	};

	return deep.utils.up({
		_deep_sheet_:true,
		"dq.transform::.//?how":function(node){
			var value = node.value;
			if(typeof value.route === 'undefined')
				value.route = node.path.replace("/subs","");
			if(typeof value.where === 'undefined')
				value.where = "dom.htmlOf::#main";
			if(!value.done)
				value.done = function(output){
					deep.globals.dom.reconfigureMenu();
					deep.globals.dom.reposition();
					//console.log("render output ", output)
				};
			return deep.utils.bottom(deep.View(),value);
		}
	}, map);
});
