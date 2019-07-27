
var doc = $(document);
var reservation = {}
reservation = {
	defaults: {
		$showMore: $('[data-action="showMore"]'),
		$messageForm: $('#message_form'),
		$updateStatus: $('[data-action="update_status"]')
	},
	onInit: function() {
		var self = this,
		el = self.defaults
		self.activateShowMore(el.$showMore)
		self.activateMessageForm(el.$messageForm)
		self.activateUpdateStatus(el.$updateStatus)
	},
	onReady: function(e) {
		var self = this,
		el = self.defaults
		self.onInit()
		
		$('.dataTable').DataTable({
			"ordering": false
		});
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
	},
	activateUpdateStatus: function (trigger) {
		trigger.click(function (e) {
			e.preventDefault();
			let dataUrl = $(this).attr('data-url');
			let dataStatus = $(this).attr('data-status');
			let redirectUrl = $('[data-redirect]').attr('data-redirect');

			Swal.fire({
				type: 'warning',
				title: 'Are you sure?',
				text: "You want to "+dataStatus+" this reservation?",
				showCancelButton: true,
				confirmButtonColor: '#2CA8FF',
				cancelButtonColor: '#FF3636',
				confirmButtonText: 'Yes!'
			}).then((result) => {
				if(result.value) {
					$.ajax({
						url: dataUrl,
						type: 'GET'
					}).done( result => {
						location.href = redirectUrl;
					});
				}
			});

		});
	}
}


doc.ready(function(){
	reservation.onReady()
})