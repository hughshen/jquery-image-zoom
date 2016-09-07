/*
 * jQuery Image Zoom Plugin
 * Copyright (c) 2016 Hugh Shen
 * https://github.com/hughshen/jquery-image-zoom
 */
;(function($, undefined) {

	$.fn.imageZoom = function(options) {

		var settings = $.extend(true, {}, $.fn.imageZoom.defaults, options || {}),
			elements = this;

		elements.bind('click', function(e) {

			// console.log(settings);

			if (settings.preventDefault) e.preventDefault();

			var $this = $(this),
				imageUrl = $this.attr(settings.urlAttr),
				imageNode = new Image(),
				bgNode = document.createElement('div'),
				wrapNode = document.createElement('div'),
				closeNode = document.createElement('div');

			imageNode.src = imageUrl;
			$(bgNode).addClass('image-zoom-bg');
			$(wrapNode).addClass('image-zoom-wrap');
			$(closeNode).addClass('image-zoom-close');

			// Set element style
			if (settings.elementClass) {
				$(bgNode).css(settings.bgCss);
				$(wrapNode).css(settings.wrapCss);
				$(imageNode).css(settings.imageCss);
				$(closeNode).css(settings.closeCss);
			}

			$(imageNode).load(function() {
				var imageWidth = imageNode.width;
					imageHeight = imageNode.height,
					clientHeight = $(window).height();

				$(closeNode).html('X');
				$(wrapNode).append(closeNode);
				$(wrapNode).append(imageNode);
				$('body').append(bgNode);
				$('body').append(wrapNode);

				$(bgNode).bind('click', function() {
					$(wrapNode).remove();
					$(bgNode).remove();
				});
				$(closeNode).bind('click', function() {
					$(wrapNode).remove();
					$(bgNode).remove();
				});
			});
		});
	}

	$.fn.imageZoom.defaults = {
		'urlAttr': 'href',
		'preventDefault': true,
		'elementClass': true,
		'bgCss': {
			'position': 'fixed',
			'top': '0',
			'left': '0',
			'z-index': '1',
			'width': '100%',
			'max-width': '100%',
			'height': '100%',
			'background': 'rgba(0,0,0,0.7)',
		},
		'wrapCss': {
			'position': 'absolute',
			'top': '20px',
			'left': '50%',
			'z-index': '2',
			'width': '70%',
			'margin': '40px 0',
			'border': '3px solid #fff',
			'border-radius': '3px',
			'transform': 'translateX(-50%)',
		},
		'imageCss': {
			'max-width': '100%',
			'display': 'block',
		},
		'closeCss': {
			'position': 'absolute',
			'top': '-13px',
			'right': '-13px',
			'z-index': '3',
			'width': '20px',
			'height': '20px',
			'line-height': '20px',
			'text-align': 'center',
			'border-radius': '10px',
			'background': '#fff',
			'cursor': 'pointer',
		},
	};
	
})(jQuery);
