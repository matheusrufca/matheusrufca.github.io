var App = (function (global, contentService) {
	var self = {},
		_this = {};


	_this.content = [];

	_this.carouselMain = document.getElementById('carousel_main');
	_this.$carouselMain = $(_this.carouselMain);

	self.init = function () {
		loadResources();
	};

	function loadOwlCarousel(containerId, content) {
		renderCarouselItems(containerId, content);

		setTimeout(function () {
			var $carousel;

			$carousel = $('#' + containerId).owlCarousel({
				items: 5,
				lazyLoad: true,
				loop: true,
				margin: 15,
				nav: true,
				navText: ["<i class='fa fa-chevron-left' ></i>", "<i class='fa fa-chevron-right'></i>"],
				//dots: 1,
				//dotsEach: true,
				stagePadding: 60,
			});
			_this['$' + containerId] = $carousel;
		}, 300);
	};


	function loadOwlMainCarousel(content) {

		function renderCarouselItems(carouselItems) {
			var carousel, $carousel, tplItem, items = [];

			tplItem = document.getElementById('tpl-main-carousel-item').innerHTML;
			carousel = document.getElementById('carousel_main');

			(carouselItems || []).forEach(function (item, i) {
				var htmlItem, itemData;

				htmlItem = tplItem
					.replaceAll('{itemId}', item.id)
					.replaceAll('{itemTitle}', item.title)
					.replaceAll('{itemDescription}', item.description)
					.replaceAll('{itemBackground}', item.cover_url.replace('SX200',''));

				this.push(htmlItem);
			}, items);

			carousel.innerHTML = items.join('');
		};


		renderCarouselItems(content);

		setTimeout(function () {
			_this.$carouselMain.owlCarousel({
				items: 1,
				lazyLoad: true,
				loop: true,
				nav: true,
				navText: ["<i class='fa fa-chevron-left' ></i>", "<i class='fa fa-chevron-right'></i>"],
				//dots: 1,
				//dotsEach: true,
			});
		}, 300);
	};




	function loadResources() {
		var deferred_1, deferred_2, deferred_3;

		deferred_1 = contentService.getResource('content');
		deferred_2 = contentService.getResource('content-2');
		deferred_3 = contentService.getResource('content-main');

		$.when(deferred_1, deferred_2, deferred_3).done(function (content_1, content_2, content_main) {
			_this.content.push(content_1[0]);
			_this.content.push(content_2[0]);

			loadOwlCarousel('carousel_1', _this.content[0]);
			loadOwlCarousel('carousel_2', _this.content[1]);

			loadOwlMainCarousel(content_main[0]);
		});
	};


	function renderCarouselItems(carouselId, carouselItems) {
		var carousel, $carousel, tplItem, items = [];

		tplItem = document.getElementById('tpl-carousel-item').innerHTML;
		carousel = document.getElementById(carouselId);
		//$carousel = $(carousel);

		(carouselItems || []).forEach(function (item, i) {
			var htmlItem, itemData;

			htmlItem = tplItem
				.replaceAll('{itemId}', item.id)
				.replaceAll('{itemTitle}', item.title)
				.replaceAll('{itemBackground}', item.cover_url);

			this.push(htmlItem);
		}, items);

		carousel.innerHTML = items.join('');
	};
	return self;
})(this, this.ContentService);





$(document).ready(function () {
	App.init();
});