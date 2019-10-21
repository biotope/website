declare var dataLayer: any[];

const initGoogleTagManager = (w, d, s, l, i) => {
	w[l] = w[l] || [];
	w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
	var f = d.getElementsByTagName(s)[0],
		j = d.createElement(s),
		dl = l != "dataLayer" ? "&l=" + l : "";
	j.async = "true";
	j.onload = function() {
		((window as any).biotope as any).initTrackingMethods();
	};
	j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
	f.parentNode.insertBefore(j, f);
};

const deleteCookies = (cnames: string[]) => {
	cnames.forEach(cname => {
		document.cookie = `${cname}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
	});
};

const setCookie = (cname, cvalue, exdays, domain) => {
	let d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	let expires = "expires=" + d.toUTCString();
	domain = domain !== undefined ? ";domain=" + domain : "";
	document.cookie = cname + "=" + cvalue + "; " + expires + domain + ";path=/";
};

const deleteGoogleAnalyticsScripts = () => {
	if (document.querySelector('[src^="https://www.googletagmanager.com/"]')) {
		document.querySelector('[src^="https://www.googletagmanager.com/"]').remove();
		}
	if (document.querySelector('[src^="https://www.google-analytics.com/"]')) {
		document.querySelector('[src^="https://www.google-analytics.com/"]').remove();
	}
};

const initGoogleAnalytics = () => {
	if (document.cookie.includes("cookies-accepted=true")) {
		initGoogleTagManager(
			window,
			document,
			"script",
			"dataLayer",
			((window as any).biotope as any).configuration.get("global.gtmId")
		);
	}

	document.addEventListener("cookies.accept", (e: CustomEvent) => {
		setCookie("cookies-accepted", "true", 365, window.location.hostname);
		initGoogleTagManager(
			window,
			document,
			"script",
			"dataLayer",
			((window as any).biotope as any).configuration.get("global.gtmId")
		);
	});

	document.addEventListener("cookies.decline", (e: CustomEvent) => {
		deleteCookies([
			"cookies-accepted",
			"_gid",
			"_ga",
			`_gat_${((window as any).biotope as any).configuration.get("global.gaId")}`
		]);
		deleteGoogleAnalyticsScripts();
	});

	document.querySelectorAll("[data-cookie-settings]").forEach(element => {
		element.addEventListener("click", () => {
			document.querySelector("bio-cookie-banner").dispatchEvent(new CustomEvent("cookiebanner.open"));
		});
	});
};

initGoogleAnalytics();

(window as any).biotope.initTrackingMethods = () => {
	dataLayer = dataLayer || [];
	const internalHostnames = ["localhost", "biotope.sh", "build.biotope.sh", "www.biotope.sh"];

	const visitedSectionIds = [];
	const visitSectionTime = 2000;
	let visitSectionTimeout;

	function trackAnchorLink(anchorTitle: string) {
		dataLayer.push({
			event: "anchor",
			anchor: anchorTitle
		});
	}

	function trackCallToAction(eventType, ctaTitle: string) {
		dataLayer.push({
			event: eventType,
			cta: ctaTitle
		});
	}

	function trackAnimationShowSlide(slideHeader: string) {
		dataLayer.push({
			event: "scroll-animation",
			header: slideHeader
		});
	}

	function trackLink(link: HTMLElement) {
		const linkHref = link.getAttribute("url") || link.getAttribute("href");
		const linkURL = new URL(linkHref);
		const linkHostname = linkURL ? linkURL.hostname : "";
		if (internalHostnames.indexOf(linkHostname) != -1) {
			trackCallToAction("cta-intern", linkHref);
		} else {
			trackCallToAction("cta-extern", linkHref);
		}
	}

	function trackMailtoLink(mailtoLink: HTMLElement) {
		const linkHref = mailtoLink.getAttribute("url") || mailtoLink.getAttribute("href");
		const eMailAddress = linkHref.replace("mailto:", "");
		dataLayer.push({
			event: "contact",
			eMail: eMailAddress
		});
	}

	function trackModalLink(modalLink: HTMLElement) {
		const title = modalLink.getAttribute("title") || modalLink.innerText;
		dataLayer.push({
			event: "modal",
			overlay: title
		});
	}

	function trackScrollEvent(currentSectionId: string) {
		dataLayer.push({
			event: "scroll",
			header: currentSectionId
		});
	}

	document.querySelectorAll('a[href^="#"], bio-button[url^="#"]').forEach(button => {
		button.addEventListener("click", () => {
			trackAnchorLink(button.getAttribute("title"));
		});
	});

	document.querySelectorAll('a[href^="http"], bio-button[url^="http"]').forEach((link: HTMLElement) => {
		link.addEventListener("click", () => {
			trackLink(link);
		});
	});

	document
		.querySelectorAll('a[href^="mailto:"], bio-button[url^="mailto:"]')
		.forEach((link: HTMLElement) => {
			link.addEventListener("click", () => {
				trackMailtoLink(link);
			});
		});

	document.querySelectorAll(".js-openModal").forEach((link: HTMLElement) => {
		link.addEventListener("click", () => {
			trackModalLink(link);
		});
	});

	document.querySelectorAll('bio-github-corner').forEach((corner: HTMLElement) => {
		corner.addEventListener('click', (e: Event) => {
			trackLink(corner.shadowRoot.querySelector('a'));
		})
	})

	document.querySelectorAll('bio-collaborator-tile').forEach((tile: HTMLElement) => {
		tile.addEventListener('click', (e: Event) => {
			trackLink(tile.shadowRoot.querySelector('a'));
		}) 
	})

	window.addEventListener("bioScrollAnimation.showSlide", (event: CustomEvent) => {
		trackAnimationShowSlide(event.detail.title);
	});

	window.addEventListener("scroll", event => {
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
		const mainSections: NodeListOf<HTMLElement> = document.querySelectorAll("body > section");
		let currentSectionId;

		mainSections.forEach((section: HTMLElement) => {
			if (
				scrollPosition > section.offsetTop &&
				scrollPosition < section.offsetTop + section.offsetHeight
			) {
				currentSectionId = section.getAttribute("id");
			}
		});
		return currentSectionId || null;
	}
};
