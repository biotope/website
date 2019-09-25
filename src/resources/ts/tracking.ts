declare var dataLayer: any[];
dataLayer = dataLayer || [];

{
	function trackAnchor(anchorTitle: string) {
		dataLayer.push({
			'event': 'anchor',
			'anchor': anchorTitle
		});
	}

	function trackCallToAction(eventType, ctaTitle: string) {
		dataLayer.push({
			'event': eventType,
			'cta': ctaTitle
		});
	}

	function trackAnimationShowSlide(slideHeader: string) {
		dataLayer.push({
			'event': 'scroll-animation',
			'header': slideHeader
		});
	}

	document.querySelectorAll('bio-button[url^="#"]').forEach(button => {
		button.addEventListener('click', () => {
			trackAnchor(button.getAttribute('title'));
		});
	});

	document.querySelectorAll('bio-button[url^="http"]').forEach(button => {
		button.addEventListener('click', () => {
			trackCallToAction('cta-extern', button.getAttribute('title'));
		});
	});

	window.addEventListener('bioScrollAnimation.showSlide', (event: CustomEvent) => {
		trackAnimationShowSlide(event.detail.title);
	});
}
