/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define(["require", "deepjs/deep", "deepjs/lib/view"], function (require, deep) {

 	var map = {
 		home:{
 			navigation:false,
 			route:"/$",
 			how:"html::/pages/home.html"
 		},
		layers:{
			subs:{
				"overview":{
					route:"/layers/$", 
					how:"html::/pages/layers/overview.html"
				},
				"up-bottom":{ how:"html::/pages/layers/up-bottom.html" },
				compositions:{ how:"html::/pages/layers/compositions.html" },
				colliders:{ how:"html::/pages/layers/colliders.html" },
				flatten:{ how:"html::/pages/layers/backgrounds.html" },
				shared:{ how:"swig::/pages/layers/shared.html" },
				classes:{ how:"swig::/pages/layers/classes.html" },
				sheets:{ how:"swig::/pages/layers/sheets.html" }
			}
		},
		queries:{
			subs:{
				"overview":{
					route:"/layers/$", 
					how:"html::/pages/layers/overview.html"
				},
				"deep-query":{ how:"html::/pages/layers/up-bottom.html" },
				rql:{ how:"html::/pages/layers/compositions.html" }
			}
		},
		chains:{
			subs:{
				"overview":{
					route:"/chains/$", 
					how:"<div>chains overview</div>"
				},
				promise:{ how:"html::/pages/chains/promises.html" },
				deep:{ how:"html::/pages/chains/deep.html" },
				others:{ how:"html::/pages/layer/colliders.html" }
			}
		},
		restful:{
			subs:{
				"overview":{
					route:"/restful/$", 
					how:"<div>restful overview</div>"
				},
				collection:{ how:"html::/pages/restful/collection.html" },
				object:{ how:"html::/pages/restful/object.html" },
				validation:{ how:"html::/pages/restful/validation.html" },
				constraints:{ how:"html::/pages/restful/constraints.html" },
				wrappers:{ how:"html::/pages/restful/wrappers.html" }
			}
		},
		protocols:{
 			how:"html::/pages/protocols.html"
		},
		context:{
			subs:{
				"overview":{
					route:"/context/$", 
					how:"<div>context overview</div>"
				},
				modes:{ how:"html::/pages/context/modes.html" },
				protocols:{ how:"html::/pages/context/protocols.html" },
				logger:{ how:"html::/pages/context/logger.html" }
			}
		},
		ocm:{
 			how:"html::/pages/ocm.html"
		},
		schemas:{
			how:"html::/pages/schemas.html"
		},
		views:{
			subs:{
				"overview":{
					route:"/views/$", 
					how:"<div>views basics</div>"
				},
				advanced:{ how:"html::/pages/views/advanced.html" },
				directives:{ how:"html::/pages/views/directives.html" },
			}
		},
		utils:{
			subs:{
				"overview":{
					route:"/utils/$", 
					how:"<div>utils overview</div>"
				},
				interpret:{ how:"html::/pages/context/modes.html" },
				parse:{ how:"html::/pages/context/protocols.html" },
				logger:{ how:"html::/pages/context/logger.html" }
			}
		},
		tests:{
			how:"html::/pages/tests.html",
			run:function(verbose){
				deep.Unit.run(null, { verbose: verbose?true:false })
				.done(function(report) {
					console.log("report : ", report);
					report.reports = null;
					$("#reports-container").html("<div>Tests result : <pre class='dp-box'>" + JSON.stringify(report, null, ' ') + '</pre></div>')
					.slideDown(200);
				});
			}
		}
	};
	//____________________ finalise map
	deep.utils.up({
		_deep_sheet_:true,
		"dq.transform::.//?how":function(node){
			if(node.value._deep_view_)
				return node.value;
			var value = node.value;
			if(typeof value.route === 'undefined')		// default route === view.path without '/subs'
				value.route = node.path.replace("/subs","");
			if(typeof value.where === 'undefined')		// default where === htmlof #main
				value.where = "dom.htmlOf::#main";

			deep.utils.up({ done:deep.compose.after(function(){
				var $ = deep.context.$, dom = deep.context.dom;
				$(dom.main).css("height", dom.contentHeight);
				$(dom.content).css("height", dom.contentHeight);
			}) }, value);
			return deep.utils.bottom(deep.View(),value);
		}
	}, map);

	return map;
});
