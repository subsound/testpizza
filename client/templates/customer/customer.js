

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MM-DD-YYYY');
});

Template.customerShow.helpers({
	customerShow : function () {
		return Customer.find({});
	}
});
