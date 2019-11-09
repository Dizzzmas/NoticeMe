(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['search.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.search_res : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4="function", alias5=container.escapeExpression;

  return "            <li>\n                <a href=\"/posts/"
    + alias5(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">post_"
    + alias5(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"id","hash":{},"data":data}) : helper)))
    + ": "
    + alias5(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"content","hash":{},"data":data}) : helper)))
    + "</a>\n            </li>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "        <b>No results</b>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {});

  return "<p>\n    Search results of <b>"
    + container.escapeExpression(((helper = (helper = helpers.search_str || (depth0 != null ? depth0.search_str : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias2,{"name":"search_str","hash":{},"data":data}) : helper)))
    + "</b>: <br/>\n<div>\n"
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.search_str : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});
})();