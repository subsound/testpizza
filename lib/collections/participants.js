Participants = new Mongo.Collection('participants');

Participants.allow({
	insert: function (userId, product) {
		return true;
	},
	update: function (userId, product) {
		return true;
	},
	remove: function (userId, product) {
		return true;
	}
});

GroupsCollection = class GroupsCollection extends Mongo.Collection {
  removeUser(groupId, userId){
    var a = Customer.findOne({_id:userId});
    return super.update(groupId, {$pull:{participants: a}});
  }
  addUser(groupId, userId){
    var a = Customer.findOne({_id:userId});
    //delete a['_id'];
    return super.update(groupId, {$addToSet: {participants: a}});
  }
  addMenuItem(groupId, item){
    return super.update(groupId, {$addToSet:{menuItems: item}});
  }
  removeMenuItem(groupId, item){
    return super.update(groupId, {$pull:{menuItems: item}});
  }
  editMenuItem(groupId, itemId, modifiedItem){
    return super.update({_id:groupId, "menuItems.id": itemId},
      {$set:{
        "menuItems.$.name":modifiedItem.name,
        "menuItems.$.price":modifiedItem.price
      }}
    );
  }
  attachFreeCouponToItem(groupId, targetItemId){
    return super.update({_id: groupId, "menuItems.id": targetItemId}, {$inc:{"menuItems.$.freePizzaCouponsAttached": 1}});
  }
  attachDiscountCouponToItem(groupId, targetItemId){
    return super.update({_id: groupId, "menuItems.id": targetItemId}, {$inc:{"menuItems.$.discountPizzaCouponsAttached": 1}});
  }
  // maybe will be removed
  detachFreeCouponFromItem(groupId, targetItemId){
    return super.update({_id: groupId, "menuItems.id": targetItemId}, {$inc:{"menuItems.$.freePizzaCouponsAttached": -1}});
  }
  detachDiscountCouponFromItem(groupId, targetItemId){
    return super.update({_id: groupId, "menuItems.id": targetItemId}, {$inc:{"menuItems.$.discountPizzaCouponsAttached": -1}});
  }
  //
};
Groups = new GroupsCollection("groups");