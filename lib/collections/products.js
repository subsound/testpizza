Products = new Mongo.Collection('products');

Products.bySku = function (sku) {
	return Products.findOne({sku : sku});
	// body...
};

Products.featured = function(){
  var featuredSkus = ["honeymoon-mars","johnny-liftoff","one-way-reentry"];
  return Products.find({sku : {$in : featuredSkus}},
  	{fields : {inventory : false, cost : false}});
    
};

Products.allow({
	insert: function (userId, product) {
		return isAdmin();
	},
	update: function (userId, product) {
		return isAdmin();
	},
	remove: function (userId, product) {
		return isAdmin();
	}
});