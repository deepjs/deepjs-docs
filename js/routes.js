/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define(["require", "deepjs/deep", "deepjs/lib/view"], function (require, deep) {

	// all sitemap of content that is used to produce routed views tree.
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
				flatten:{ how:"html::/pages/layers/flatten.html" },
				shared:{ how:"html::/pages/layers/shared.html" },
				classes:{ how:"html::/pages/layers/classes.html" },
				sheets:{ how:"html::/pages/layers/sheets.html" }
			}
		},
		queries:{
			subs:{
				"overview":{
					route:"/queries/$", 
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
				rest:{ how:"html::/pages/chains/rest.html" },
				others:{ how:"html::/pages/layer/other-chains.html" }
			}
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
		protocols:{
			subs:{
				"overview":{
					route:"/protocols/$", 
					how:"html::/pages/protocols/overview.html"
				},
				natives:{ how:"html::/pages/protocols/natives.html" },
				"media-cache":{ label:"media cache", how:"html::/pages/protocols/cache.html" },
				custom:{ how:"html::/pages/protocols/custom.html" }
			}
		},
		ocm:{
			subs:{
				"intro":{
					route:"/ocm/$", 
 					how:"html::/pages/ocm/introduction.html"
				},
				compilation:{ how:"html::/pages/ocm/compilation.html" },
				classes:{ how:"html::/pages/ocm/classes.html" },
				design:{ how:"html::/pages/ocm/design.html" },
				delegation:{ how:"html::/pages/ocm/delegation.html" }
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
				relations:{ how:"html::/pages/restful/relations.html" },
				range:{ how:"html::/pages/restful/range.html" },
				ocm:{ how:"html::/pages/restful/ocm.html" },
				wrappers:{ how:"html::/pages/restful/wrappers.html" }
			}
		},
		views:{
			subs:{
				"overview":{
					route:"/views/$", 
					how:"<div>views basics</div>"
				},
				refresh:{ how:"html::/pages/views/refresh.html" },
				api:{ how:"html::/pages/views/api.html" },
				advanced:{ how:"html::/pages/views/advanced.html" },
				directives:{ how:"html::/pages/views/directives.html" }
			}
		},
		routes:{
			subs:{
				"overview":{
					route:"/routes/$", 
					how:"<div>routes basics</div>"
				},
				path:{ how:"html::/pages/routes/path.html" },
				map:{ how:"html::/pages/routes/map.html" },
				ocm:{ how:"html::/pages/routes/ocm.html" }
			}
		},
		utils:{
			subs:{
				"overview":{
					route:"/utils/$", 
					how:"<div>utils overview</div>"
				},
				log:{ how:"html::/pages/utils/log.html" },
				interpret:{ how:"html::/pages/utils/interpret.html" },
				parsers:{ how:"html::/pages/utils/parsers.html" },
				deepLoad:{ how:"html::/pages/utils/deepload.html" },
				schema:{ how:"html::/pages/utils/schema.html" }
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
	//____________________ finalise map : transform entry to deep.View and apply default behaviour/api
	// if we done it here : it's just to keep map clear and short.
	// for this : we simply use a deep-sheet.
	deep.utils.up({
		_deep_sheet_:true,
		// for all entry in map that contain a 'how' property : we apply this transformation
		"dq.transform::.//?how":function(node){
			if(node.value._deep_view_)	// already a view. skip.
				return node.value;
			var value = node.value;
			if(typeof value.route === 'undefined')		// default route === view.path without '/subs'
				value.route = node.path.replace("/subs","");
			if(typeof value.where === 'undefined')		// default where === htmlof #main
				value.where = "dom.htmlOf::#main";
			
			deep.utils.up({ 
				done:deep.compose.after(function(){
					// console.log("content done");
					var $ = deep.context.$;
					var dom = deep.context.dom;
					dom.content = $("#content"); 
					$(dom.main).scrollTop(0);
				}) 
			}, value);
			return deep.utils.bottom(deep.View(),value);
		}
	}, map);

	return map;
});
