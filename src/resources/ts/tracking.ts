declare var dataLayer: any[];
dataLayer = dataLayer || [];

{
	const internalHostnames = [
		'localhost',
		'biotope.sh',
		'build.biotope.sh',
		'www.biotope.sh'
	];

	const visitedSectionIds = [];
	const visitSectionTime = 2000;
	let visitSectionTimeout;

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
		const linkHref = link.getAttribute('url') || link.getAttribute('href');
		const linkURL = new URL(linkHref);
		const linkHostname = linkURL ? linkURL.hostname : '';
		if (internalHostnames.indexOf(linkHostname) != -1) {
			trackCallToAction('cta-intern', linkHref);
		} else {
			trackCallToAction('cta-extern', linkHref);
		}
	}

	function trackMailtoLink(mailtoLink: HTMLElement) {
		const linkHref = mailtoLink.getAttribute('url') || mailtoLink.getAttribute('href');
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

	function trackScrollEvent(currentSectionId : string) {
		dataLayer.push({
			'event': 'scroll',
			'header': currentSectionId
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

	window.addEventListener('scroll', (event) => {
		const currentSectionId = getCurrentSectionId();

		window.clearTimeout(visitSectionTimeout);

		// only track currentSectionId, if not already visited and after 2 seconds
		if (currentSectionId && visitedSectionIds.indexOf(currentSectionId) === -1) {
			visitSectionTimeout = window.setTimeout(() => {
				trackScrollEvent(currentSectionId);
				visitedSectionIds.push(currentSectionId);
			}, visitSectionTime);
		}
	});

	function getCurrentSectionId() {
		const scrollPosition = window.scrollY + Math.round(window.outerHeight / 2);
		const mainSections: NodeListOf<HTMLElement> = document.querySelectorAll('body > section');
		let currentSectionId;

		mainSections.forEach((section : HTMLElement) => {
			if (scrollPosition > section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
				currentSectionId = section.getAttribute('id');
			}
		});
		return currentSectionId || null;
	}
}
