jQuery(document).ready(function () {

	let $currentSection = jQuery('section:first');

	$(document).on('mousewheel', function (event) {
		$currentSection = jQuery(event.target).closest('section');

		const isScrolledDown = event.originalEvent.deltaY > 0;
		const nextSection = isScrolledDown ? $currentSection.next() : $currentSection.prev();
		const nextSectionId = nextSection.attr('id');
		if (nextSectionId) {
			scrollToHash('#' + nextSectionId);
		}
	});


	const $navDots = jQuery('<ul>', {'class': 'nav-dots'});
	$navDots.appendTo('body');

	const sectionIds = jQuery('section').map(function (i) {
		const sectionId = jQuery(this).attr('id');
		$navDots.append(jQuery(`<li><a href="#${sectionId}" /></li>`));
	});

	$navDots.on('click', 'a', function (event) {
		const href = jQuery(this).attr('href');
		scrollToHash(href);
		event.originalEvent.preventDefault();
	});

	//first load
	scrollToHash(location.hash || '#' + $currentSection.attr('id'));

	function scrollToHash(elementHashId) {
		jQuery(window).stop();
		jQuery.scrollTo(elementHashId, 'slow');
		history.pushState(null, null, elementHashId);

		$navDots.find('a').removeClass('selected');
		$navDots.find(`a[href="${elementHashId}"]`).addClass('selected');
		//todo: impl history support for shit browsers?
	}

});
