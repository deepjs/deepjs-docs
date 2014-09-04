/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 *
 */
 
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define(["require", "deepjs/deep"], function(require, deep){
	return {
		_deep_sheet_:true,
		// for all entry in map that contain a 'how' property : we apply this transformation
		"dq::.//?how":deep.sheet.map(function(node){
			if(node.value._deep_view_)	// already a view. skip.
				return node.value;
			var value = node.value;
			if(typeof value.route === 'undefined')		// default route === view path without '/subs'
				value.route = node.path.replace("/subs","");
			if(!value.where)	// add default "where"
				value.where = function(rendered){
					var $ = deep.$();
					// place as html of #main. add fadeIn effect on dom insertion. don't forget to return inserted node.
					var node = $("#main").html(rendered).children();
					if(deep.isBrowser)
						$(node).hide().delay(100).fadeIn(250);
					return node;
				};
			return value;
		})
		.bottom("instance::deep-views/lib/view")
		.up({ 
			// adding 'done' behaviour
			done:deep.compose.after(function(){
				var $ = deep.$(), dom = deep.context('dom');
				dom.content = $("#content");
				if(!deep.isBrowser)
					return;
				if($(dom.content).outerHeight(true)+30 > dom.contentHeight)
					$(dom.content).append('<div style="height:'+(dom.contentHeight-150)+'px;">&nbsp;</div>')
				$(dom.main).scrollTop(0);
			})
		})
	};
});