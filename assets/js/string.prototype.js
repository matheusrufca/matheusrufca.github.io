(function (global) {
	if (String.prototype.hasOwnProperty('replaceAll')) {
		return;
	}

	String.prototype.replaceAll = function (search, replacement) {
		var target = this;
		return target.replace(new RegExp(search, 'g'), replacement);
	}
})(this)