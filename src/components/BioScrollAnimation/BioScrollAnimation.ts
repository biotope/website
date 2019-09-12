import Component from '@biotope/element';
import template from './template';

import * as Lottie from 'lottie-web/build/player/lottie.min.js';

import { TweenMax, TimelineMax, Linear } from "gsap";
import * as ScrollMagic from "scrollmagic";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

// TODO: remove indicators for final version!
//import 'imports-loader?define=>false!scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min';

import { BioScrollAnimationProps, BioScrollAnimationState, BioScrollAnimationMethods } from './defines';

class BioScrollAnimation extends Component< BioScrollAnimationProps, BioScrollAnimationState > {
    static componentName = 'bio-scroll-animation';

    static attributes = [
		'animation-data-path',
		{name: 'scroll-duration', converter: (value) => parseInt(value) },
		{name: 'scroll-factor', converter: (value) => parseFloat(value) }
	];

	public methods: BioScrollAnimationMethods = {};

	get defaultState() {
		return {}
	}

	get defaultProps() {
		return {
			animationDataPath: '',
			scrollDuration: '1000',
			scrollFactor: 1
		};
	}


	connectedCallback() {
		this.initAnimation();
	}

	render() {
		return template(this.html, { ...this.props, ...this.state, ...this.methods }, this.createStyle);
	}

    initScrollController(animation, animationContainer) {

		const scrollFactor = this.props.scrollFactor;
		let timeline = new TimelineMax();

		timeline.to({
			frame: 0
		}, 3, {
			frame: animation.totalFrames - 1,
			onUpdate: function () {
				animation.goToAndStop(Math.round(this.target.frame * scrollFactor), true);
			},
			ease: Linear.easeNone
		});

		let controller = new ScrollMagic.Controller({
			globalSceneOptions: {
				triggerHook: 'onLeave'
			}
		});

		let scrollTrigger: HTMLElement = this.shadowRoot.querySelector('.scroll-trigger');

		let animationScene = new ScrollMagic.Scene({
			triggerElement: scrollTrigger,
			duration: this.props.scrollDuration
		})
			.setTween(timeline)
			.setPin(animationContainer, {pushFollowers: true})
			.addTo(controller)
			//.addIndicators() // TODO: remove indicators for final version!
	}

	initAnimation() {

		const animationContainer: HTMLElement = this.shadowRoot.querySelector('.animation-container');

		const animation = Lottie.loadAnimation({
			container: animationContainer,
			renderer: 'svg',
			loop: false,
			autoplay: false,
			path: this.props.animationDataPath,
			rendererSettings: {
				preserveAspectRatio: 'xMidYMid slice', // Supports the same options as the svg element's preserveAspectRatio property
				progressiveLoad: true, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
				viewBoxOnly: true
			}
		});
		animation.addEventListener('DOMLoaded', () => {
			this.initScrollController(animation, animationContainer);
		});

	}
}

export default BioScrollAnimation;
