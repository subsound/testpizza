Template.groupsShow.helpers({
    groups: function(){
    	return Groups.find({});
    },
    isCreator: function(ctx){
    return ctx?ctx.creatorID === Meteor.userId():this.creatorID === Meteor.userId();
  },
   participants: function () {
    return Customer.find({ _id: { $in: [this.participants] } });
  },
   possibleParticipants: function () {
    return Customer.find({ _id: { $nin: [this.participants] } });
  },
});