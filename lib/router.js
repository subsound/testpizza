Router.configure({
	layoutTemplate:'layout',
	loadingTemplate:'loading',
	notFoundTemplate:'notFound'

});

Router.route("/", {
	name : "homeIndex",
	data : function() {
		return { 
			message : "Welcome to the shop" 
		}
	}
});

Router.route("/about", {
	name : "homeAbout"
});

Router.route("/contact", {
	name : "homeContact"
});

Router.route("/products/:sku", {
	name : "productsShow",
	data : function(){
		return Products.findOne({sku : this.params.sku});
	}
});

Router.route("/vendors/:slug", {
	name : "vendorsShow",
	data : function(){
		return Vendors.findOne({slug : this.params.slug});
	}
});
// little bug about that, sadly but fuck it global var userKey
/*Router.route("/cart", {
	name : "cartShow",
	data : function(){
		return Carts.getCart(userKey);
	}
});
*/



Router.route("/customer", {
	name : "customerShow"
});

Router.route("/groups", {
	name : "groupsShow"
});

Router.route("/addgroup", {
	name : "addGroup"
});