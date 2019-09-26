declare var dataLayer: any[];
dataLayer = dataLayer || [];

{
	const internalHostnames = [
		'localhost',
		'biotope.sh',
		'build.biotope.sh',
		'www.biotope.sh'
	];

	function trackAnchorLink(anchorTitle: string) {
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
	
	function trackLink(link: HTMLElement) {
		const linkHref = link.getAttribute('url') ||  link.getAttribute('href');
		const linkURL = new URL(linkHref);
		const linkText = link.getAttribute('title') || link.innerText;
		const linkHostname = linkURL ? linkURL.hostname : '';
		if (internalHostnames.indexOf(linkHostname) != -1) {
			trackCallToAction('cta-intern', linkText);
		} else {
			trackCallToAction('cta-extern', linkText);
		}
	}

	function trackMailtoLink(mailtoLink: HTMLElement) {
		const linkHref = mailtoLink.getAttribute('url') ||  mailtoLink.getAttribute('href');
		const eMailAddress = linkHref.replace('mailto:', '');
		dataLayer.push({
			'event': 'contact',
			'eMail': eMailAddress
		});
	}

	function trackModalLink(modalLink: HTMLElement) {
		const title = modalLink.getAttribute('title') || modalLink.innerText;
		dataLayer.push({
			'event': 'modal',
			'overlay': title
		});
	}

	document.querySelectorAll('a[href^="#"], bio-button[url^="#"]').forEach(button => {
		button.addEventListener('click', () => {
			trackAnchorLink(button.getAttribute('title'));
		});
	});

	document.querySelectorAll('a[href^="http"], bio-button[url^="http"]').forEach((link: HTMLElement) => {
		link.addEventListener('click', () => {
			trackLink(link);
		});
	});

	document.querySelectorAll('a[href^="mailto:"], bio-button[url^="mailto:"]').forEach((link: HTMLElement) => {
		link.addEventListener('click', () => {
			trackMailtoLink(link);
		});
	});

	document.querySelectorAll('.js-openModal').forEach((link: HTMLElement) => {
		link.addEventListener('click', () => {
			trackModalLink(link);
		});
	});

	window.addEventListener('bioScrollAnimation.showSlide', (event: CustomEvent) => {
		trackAnimationShowSlide(event.detail.title);
	});
}
