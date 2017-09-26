var ContentService = (function (global, $) {
	var self = {},
		_this = {};

	self.init = function () {};

	self.getResource = function (resourceName) {
		var promise, endpoint;
		endpoint = ['resources/', resourceName, '.json'].join('');

		promise = $.getJSON(endpoint, function (data) {
			//console.debug(JSON.stringify(data));
		});

		return promise;
	};

	return self;
})(this, this.jQuery);


$(document).ready(function () {
	App.init();
});