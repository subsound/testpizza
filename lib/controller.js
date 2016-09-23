Group = class Group {
  constructor(name, participants, groupImage) {
   	this.creatorID = Meteor.userId();
	this.creatorName = Meteor.user().username;
   	this.name = name;
    this.participants = participants;
    this.groupImage = groupImage;
    // kinda default pre-defined menu
    //this.menuItems = [new MenuItem("Hawaii Pizza", 5), new MenuItem("Seafood Pizza", 7)];
    
    
  }
};
const adminHook = (adminId) => Meteor.userId() === adminId;
// avoid unhandled exceptions on the client
function throwError(error, reason, details){
  const err = new Meteor.Error(error, reason, details);
  if (Meteor.isClient) {
    return err;
  } else if (Meteor.isServer) {
    throw err;
  }
}


Meteor.methods({
  
  createGroup: (name, participants, groupImage) => {
    if (!Meteor.userId()) {
       throwError("log in pls");
    }
    if (!name){
      throwError("add group name pls");
    }
    if(!groupImage){
      throwError("upload group image pls");
    }
    if(participants.length === 0){
      throwError("no members in group");
    }
    Groups.insert(new Group(name, participants, groupImage));
  },
  deleteGroup: (groupId) => {
    if (!Meteor.userId()) {
       throwError("not-authorized");
    }
    if (!adminHook(Groups.findOne(groupId).creatorID)){
      throwError("not-admin");
    }
    Groups.remove(groupId);
  },
  removeUserFromGroup: (groupId, userId) => {
    if (!Meteor.userId()) {
      throwError("not-authorized");
    }
    if (!adminHook(Groups.findOne(groupId).creatorID)){
      throwError("not-admin");
    }
    Groups.removeUser(groupId, userId);
  },
  
  addUser: (groupId, userId) => {
    if (!Meteor.userId()) {
      throwError("not-authorized");
    }
    if (!adminHook(Groups.findOne(groupId).creatorID)){
      throwError("not-admin");
    }
    Groups.addUser(groupId, userId);
  },
  
   });