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
 			how:'<div/>'
 		},
		layers:{
			subs:{
				overview:{
					route:"/layers/$", 
					how:"html::/pages/layers/overview.html"
				},
				"up-bottom":{ how:"html::/pages/layers/up-bottom.html" },
				compositions:{ how:"html::/pages/layers/compositions.html" },
				colliders:{ how:"html::/pages/layers/colliders.html" },
				flatten:{ how:"html::/pages/layers/flatten.html" },
				shared:{ how:"html::/pages/layers/shared.html" },
				classes:{ how:"html::/pages/layers/classes.html" }
			}
		},
		queries:{
			subs:{
				overview:{
					route:"/queries/$", 
					how:"html::/pages/queries/overview.html"
				},
				query:{ separated:true, how:"html::/pages/queries/deep-query.html" },
				rql:{ how:"html::/pages/queries/rql.html" },
				traversal:{ separated:true, how:"html::/pages/queries/traversal.html" },
				selectors:{ how:"html::/pages/queries/selectors.html" },
				descriptors:{ separated:true, how:"html::/pages/queries/nodes.html" }
			}
		},
		chains:{
			subs:{
				overview:{
					route:"/chains/$", 
					how:"html::/pages/chains/overview.html"
				},
				fundamentals:{ how:"html::/pages/chains/base.html" },
				promise:{ label:"promise", how:"html::/pages/chains/promises.html" },
				identities:{ how:"html::/pages/chains/identities.html" },
				deep:{ separated:true, label:"deep chain", how:"html::/pages/chains/deep.html" },
				patterns:{ separated:true, label:"usage patterns", how:"html::/pages/chains/subtilities.html" },
				others:{ separated:true, label:"other chains", how:"html::/pages/chains/other-chains.html" }
			}
		},
		context:{
			subs:{
				overview:{
					route:"/context/$", 
					how:"html::/pages/context/overview.html"
				},
				base:{ how:"html::/pages/context/base.html" },
				logger:{ how:"html::/pages/context/logger.html" }
			}
		},
		protocols:{
			subs:{
				overview:{
					route:"/protocols/$", 
					how:"html::/pages/protocols/overview.html"
				},
				base:{ how:"html::/pages/protocols/base.html" },
				natives:{ how:"html::/pages/protocols/natives.html" },
				templates:{ 
					separated:true,
					how:"html::/pages/protocols/templates.html"
				},
				nodejs:{ how:"html::/pages/protocols/nodejs.html" },
				browser:{ how:"html::/pages/protocols/browser.html" }
			}
		},
		sheets:{
			subs:{
				overview:{
					route:"/sheets/$", 
 					how:"html::/pages/sheets/overview.html" 
				},
				object:{ label:"object sheets", how:"html::/pages/sheets/object.html" },
				dom:{ label:"dom sheets", how:"html::/pages/sheets/dom.html" }
			}
		},
		ocm:{
			subs:{
				concepts:{
					route:"/ocm/$", 
 					how:"html::/pages/ocm/introduction.html"
				},
				modes:{ how:"html::/pages/ocm/modes.html" },
				compilation:{ how:"html::/pages/ocm/compilation.html" },
				classes:{ how:"html::/pages/ocm/classes.html" },
				design:{ separated:true, label:"design patterns", how:"html::/pages/ocm/design.html" },
			}
		},
		utils:{
			subs:{
				log:{ how:"html::/pages/utils/log.html" },
				interpret:{ how:"html::/pages/utils/interpret.html" },
				deepLoad:{ how:"html::/pages/utils/deepload.html" },
				"json-schema":{ how:"html::/pages/utils/schema.html" },
				errors:{ how:"html::/pages/utils/errors.html" },
				"media-cache":{ label:"media cache", how:"html::/pages/protocols/cache.html" },
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
			}
		},
		restful:{
			separated:true,
			subs:{
				overview:{
					route:"/restful/$", 
					how:"<div>restful overview</div>"
				},
				collection:{ how:"html::/pages/restful/collection.html" },
				object:{ how:"html::/pages/restful/object.html" },
				validation:{ how:"html::/pages/restful/validation.html" },
				constraints:{ how:"html::/pages/restful/constraints.html" },
				relations:{ how:"html::/pages/restful/relations.html" },
				ocm:{ how:"html::/pages/restful/ocm.html" },
				chain:{ label:"restful chain", how:"html::/pages/restful/chain.html" },
				wrappers:{ separated:true, how:"html::/pages/restful/wrappers.html" }
			}
		},
		views:{
			separated:true,
			subs:{
				overview:{
					route:"/views/$", 
					how:"<div>views basics</div>"
				},
				refresh:{ how:"html::/pages/views/refresh.html" },
				"dom-protocol":{ label:"dom.xxx", how:"html::/pages/views/dom-protocol.html" },
				directives:{ how:"html::/pages/views/directives.html" },
				concurrency:{ how:"html::/pages/views/concurrency.html" }
			}
		},
		routes:{
			subs:{
				overview:{
					route:"/routes/$", 
					how:"<div>routes basics</div>"
				},
				path:{ how:"html::/pages/routes/path.html" },
				map:{ how:"html::/pages/routes/map.html" },
				ocm:{ how:"html::/pages/routes/ocm.html" }
			}
		},
		more:{
			separated:true,
			subs:{
				overview:{
					route:"/more/$", 
					how:'<div>you could install one of the 5 environnements or try online one of the 2 other sandboxes (autobahn and browser)</div>'
				},
				environnements:{ how:"html::/pages/more/environnements.html" },
				sandboxes:{ how:"html::/pages/more/sandboxes.html" },
				tutorials:{ how:"html::/pages/more/tutorials.html" },
				discussions:{ how:"html::/pages/more/discussions.html" }
			}
		}
	};
	//____________________ finalise map : transform entries to deep.View and apply default behaviour/api
	// if we done it here : it's just to keep map clear and short.
	// for this : we simply use a deep-sheet.
	return deep.up({
		_deep_sheet_:true,
		// for all entry in map that contain a 'how' property : we apply this transformation
		"dq.transform::.//?how":function(node){
			if(node.value._deep_view_)	// already a view. skip.
				return node.value;
			var value = node.value;
			if(typeof value.route === 'undefined')		// default route === view path without '/subs'
				value.route = node.path.replace("/subs","");
			if(typeof value.where === 'undefined')		// default where === htmlof #main
				value.where = "dom.htmlOf::#main";
			return deep(value)
			.bottom(deep.View())
			.up({ 
				done:deep.compose.after(function(){
					// console.log("content done");
					var $ = deep.context.$, dom = deep.context.dom;
					dom.content = $("#content");
					if($(dom.content).outerHeight(true)+30 > dom.contentHeight)
						$(dom.content).append('<div style="height:'+(dom.contentHeight-150)+'px;">&nbsp;</div>')
					$(dom.main).scrollTop(0);
				}) 
			});
		}
	}, map);
});
