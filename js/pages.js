/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define(["require", "deepjs/deep", "deepjs/lib/view"], function (require, deep) {

 	return {
 		home:{
 			route:"/$",
 			how:"html::/pages/home.html"
 		},
		layers:{
			subs:{
				"overview":{
					route:"/layers/$", 
					navigation:false, 
					how:"<div>layers overview</div>"
				},
				"up-bottom":{ how:"html::/pages/layers/up-bottom.html" },
				compositions:{ how:"html::/pages/layers/compositions.html" },
				colliders:{ how:"html::/pages/layers/colliders.html" }
			}
		},
		chains:{
			subs:{
				"overview":{
					route:"/chains/$", 
					navigation:false, 
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
					navigation:false, 
					how:"<div>restful overview</div>"
				},
				promise:{ how:"html::/pages/chains/promises.html" },
				deep:{ how:"html::/pages/chains/deep.html" },
				others:{ how:"html::/pages/layer/colliders.html" }
			}
		},
		context:{
 			how:"html::/pages/context.html"
		},
		protocols:{
 			how:"html::/pages/protocols.html"
		},
		ocm:{
			route:"/ocm/$",
			how:"<div>ocm</div>"
		},
		views:{
			subs:{
				"overview":{
					route:"/views/$", 
					navigation:false, 
					how:"<div>views basics</div>"
				},
				advanced:{ how:"html::/pages/views/advanced.html" },
				directives:{ how:"html::/pages/views/directives.html" },
			}
		},
		tests:{
			route:"/tests/$",
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

});
