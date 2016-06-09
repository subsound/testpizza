Template.productsShow.events({
	'click #add-to-cart' : function (ev) {
	ev.preventDefault();
	addToCart(this.sku, function(err,res){
		console.log(err);
		console.log(res);
		Router.go("cartShow");
	});
}

});