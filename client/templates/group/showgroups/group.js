Template.group.helpers({
    isCreator: function(ctx){
    return ctx?ctx.creatorID === Meteor.userId():this.creatorID === Meteor.userId();
  },
   possibleParticipants: function () {
    return Customer.find({/* _id: { $nin: this.participants }*/ });
  },
});

Template.group.events({
  "click .adduser": function(){
    
    Meteor.call("addUser", Template.instance().data._id, this._id);
  },
  "click .removeuser": function(){
    Meteor.call("removeUserFromGroup", Template.instance().data._id, this._id);
  },
});