declare var dataLayer : any[];
dataLayer = dataLayer || [];

{
    document.querySelectorAll('bio-button[url^="#"]').forEach(button => {
            button.addEventListener('click', () => {
                trackAnchor('anchor', button.getAttribute('title'));
            });
    });

    document.querySelectorAll('bio-button[url^="http"]').forEach(button => {
            button.addEventListener('click', () => {
                trackCallToAction('cta-extern', button.getAttribute('title'));
            });
    });
        
        window.addEventListener('bioScrollAnimation.showSlide', (event: CustomEvent)=> {
            trackCallToAction('cta-extern', event.detail.title);
    });

    const trackAnchor = (eventType, anchorTitle: string) => {
        dataLayer.push({
            'event': eventType,
            'anchor': anchorTitle
        });
    }

    const trackCallToAction = (eventType, ctaTitle: string) => {
        dataLayer.push({
            'event': eventType,
            'cta': ctaTitle
        });
    }
}