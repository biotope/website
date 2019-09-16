import Component from '@biotope/element';
import template from './template';

import * as Lottie from 'lottie-web/build/player/lottie.min.js';

import { TweenLite, TimelineLite, Linear } from "gsap";
import * as ScrollMagic from "scrollmagic";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
ScrollMagicPluginGsap(ScrollMagic, TweenLite, TimelineLite);

import { BioScrollAnimationProps, BioScrollAnimationState, BioScrollAnimationMethods } from './defines';

class BioScrollAnimation extends Component< BioScrollAnimationProps, BioScrollAnimationState > {
    static componentName = 'bio-scroll-animation';

    static attributes = [
		'animation-data-path',
		{name: 'slides', converter: (value) => parseInt(value) },
		{name: 'slide-duration', converter: (value) => parseInt(value) },
		{name: 'scroll-length', converter: (value) => parseInt(value) },
		{name: 'scroll-factor', converter: (value) => parseFloat(value) }
	];

	public methods: BioScrollAnimationMethods = {};

	get defaultState() {
		return {
			currentSlide: 0,
			scrolling: false
		}
	}

	get defaultProps() {
		return {
			animationDataPath: '',
			slides: 1,
			slideDuration: 2000,
			scrollLength: 10000,
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
		let timeline = new TimelineLite();

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

		let animationScene = new ScrollMagic.Scene({
			triggerElement: this.shadowRoot.querySelector('.scroll-trigger'),
			duration: this.props.scrollLength
		})
			.setTween(timeline)
			.setPin(animationContainer, {pushFollowers: true})
			.addTo(controller);
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
			if (this.props.slides > 1) {
				this.initSnapToSlides();
			}
		});
	}

	// snap to virtual slides within the animation if slides prop > 1 is given
	initSnapToSlides() {
		let slideOffsets = [];
		if (this.props.slides > 1) {
			for (let i = 0; i <= this.props.slides; i++) {
				slideOffsets.push(Math.round(i * this.props.scrollLength / this.props.slides));
			}
		}

		window.addEventListener('scroll', (event) => {
			if (slideOffsets.length > 0 && !this.state.scrolling) {
				event.preventDefault();
				const scrollPosition = window.pageYOffset;
				const startOffset = this.offsetTop;
				const endOffset = startOffset + this.props.scrollLength;

				if (scrollPosition > startOffset && scrollPosition < endOffset) {
					if (scrollPosition > startOffset + slideOffsets[this.state.currentSlide]) {
						const targetSlide = this.state.currentSlide + 1;
						const targetOffset = startOffset + slideOffsets[targetSlide];

						if (targetOffset <= endOffset) {
							this.state.scrolling = true;
							this.animateScrollTo(targetOffset, this.props.slideDuration, () => {
								this.state.currentSlide = this.state.currentSlide + 1;
								this.state.scrolling = false;
							});
						}
					} else if (scrollPosition < startOffset + slideOffsets[this.state.currentSlide]) {
						const targetSlide = this.state.currentSlide - 1;
						const targetOffset = startOffset + slideOffsets[targetSlide];

						this.state.scrolling = true;
						this.animateScrollTo(targetOffset, this.props.slideDuration, () => {
							this.state.currentSlide = this.state.currentSlide - 1;
							this.state.scrolling = false;
						});
					}
				}
			}
		})
	}

	animateScrollTo(scrollToOffset: number, duration: number, callback?: Function) {
		const startOffset = window.pageYOffset;
		const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

		if ('requestAnimationFrame' in window === false) {
			window.scroll(0, scrollToOffset);
			if (callback) {
				callback();
			}
			return;
		}

		const animateScrolling = () => {
			const now = 'now' in window.performance ? performance.now() : new Date().getTime();
			const time = Math.min(1, ((now - startTime) / duration));
			// using linear time function, animation is already easing.
			window.scroll(0, Math.ceil((time * (scrollToOffset - startOffset)) + startOffset));

			if (time === 1) {
				if (callback) {
					callback();
				}
				return;
			}
			requestAnimationFrame(animateScrolling);
		};
		animateScrolling();
	}
}

export default BioScrollAnimation;
