(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['posts.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4="function", alias5=container.escapeExpression;

  return "    <tr>\n        <td>\n            <a href=\"/posts/"
    + alias5(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">post_"
    + alias5(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"id","hash":{},"data":data}) : helper)))
    + ": "
    + alias5(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"content","hash":{},"data":data}) : helper)))
    + "</a>\n        </td>\n    </tr>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4="function", alias5=container.escapeExpression;

  return "<tbody>\n"
    + ((stack1 = helpers.each.call(alias2,((stack1 = (depth0 != null ? depth0.posts : depth0)) != null ? stack1.rows : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</tbody>\n<p>Page "
    + alias5(((helper = (helper = helpers.page || (depth0 != null ? depth0.page : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"page","hash":{},"data":data}) : helper)))
    + " of "
    + alias5(((helper = (helper = helpers.pageCount || (depth0 != null ? depth0.pageCount : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"pageCount","hash":{},"data":data}) : helper)))
    + "</p>";
},"useData":true});
})();