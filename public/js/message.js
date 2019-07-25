var doc = $(document)
var message = {}

message = {

	defaults: {
		$showMore: $('[data-action="showMore"]'),
		$messageForm: $('#message_form')
	},
	onInit: function() {
		var self = this,
		el = self.defaults
		self.activateShowMore(el.$showMore)
		self.activateMessageForm(el.$messageForm)
	},
	onReady: function(e) {
		var self = this,
		el = self.defaults
		self.onInit()
	},
	activateShowMore: function (trigger) {
		trigger.click(function (e) {
			let contentHolder = $('[data-holder="showMore"]');
			contentHolder.toggleClass('active');
			if(contentHolder.hasClass('active')) {
				$(this).text('Show less');
			} else {
				$(this).text('Show more');
			}
		});
	},
	activateMessageForm: function (trigger) {
		trigger.submit(function (e) {
			e.preventDefault();
			let formUrl = $(this).attr('action');
			let formMethod = $(this).attr('method');
			let formData = $(this).serialize();
			let formRedirect = $(this).attr('data-redirect');

			$.ajax({
				url: formUrl,
				type: formMethod,
				data: formData
			}).done( result => {
				location.href = formRedirect;
			});
		});
	}
}

doc.ready(function(){
	message.onReady()
})