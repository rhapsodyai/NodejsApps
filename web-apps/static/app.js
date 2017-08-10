showView = function(selected) {
	window.location.hash = '#' + selected;
	$('.view').hide().filter('#' + selected + "-view").show();
},

$(window).on('hashchange', function(event) {
	var view = (window.locoation.hash || '').replace(/^#/, '');
	if($('#' + view + '-view').length) {
		showView(view);
	}
});

$.ajax({
	url: '/api/user',
	accepts: 'application/json'
})

.then(function(data, status, xhr) {
	getBundles();
}, function(xhr, status, err) {
	showView('welcome');
});

getBundles = function() {
	$.ajax({
		url: '/api/user/bundles'
	}).then(function(data, status, xhr) {
		bundles = data;
		showBundles();
	}, function(xhr, status, err) {
		if(xhr.status >= 500) {
			showErr(xhr, status, err);
		}
		bundles = {};
		showBundles();
	});
},

saveBundles = function(bundles, callback) {
	$.ajax({
		type: 'PUT',
		url: '/api/user/bundles',
		data: JSON.stringify(bundles),
		contentType: 'application/json; charset=utf-8',
		accepts: 'application/json'
	}).then(function(data, status, xhr) {
		callback(null, data);
	}, function(xhr, status, err) {
		callback(err);
	});
},
