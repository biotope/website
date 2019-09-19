import Component from '@biotope/element';
import template from './template';

import * as Lottie from 'lottie-web/build/player/lottie.min.js';

import { TweenLite, TimelineLite, Linear } from "gsap";
import * as ScrollMagic from "scrollmagic";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
ScrollMagicPluginGsap(ScrollMagic, TweenLite, TimelineLite);

import { BioScrollAnimationProps, BioScrollAnimationState, BioScrollAnimationMethods } from './defines';

/**
 * a scroll triggered animation component
 * based on:
 * @see https://uxplanet.org/the-ultimate-workflow-of-creating-scroll-based-animations-7366b670630
 */
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
			scrolling: false,
			slides: [
				{
					title: 'start',
					offset: 0
				}
			]
		}
	}

	get defaultProps() {
		return {
			animationDataPath: '',
			slideDuration: 2000,
			scrollLength: 10000
		};
	}

	connectedCallback() {
		this.initAnimation();
	}

	render() {
		return template(this.html, { ...this.props, ...this.state, ...this.methods }, this.createStyle);
	}

    initScrollController(animation, animationContainer) {
		let timeline = new TimelineLite();

		timeline.to({
			frame: 0
		}, 3, {
			frame: animation.totalFrames - 1,
			onUpdate: function () {
				animation.goToAndStop(Math.round(this.target.frame), true);
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
			this.initSlides();
		});
	}

	initSlides() {

		const slidesSections = this.querySelectorAll('.animation-slide');

		if (slidesSections.length > 1) {
			slidesSections.forEach((slideSection, index) => {
				this.state.slides.push({
					title: slideSection.querySelector('h2') ? slideSection.querySelector('h2').innerText : '',
					offset: Math.round((index + 1) * this.props.scrollLength / slidesSections.length)
				});
			});

			this.state.slides.forEach((slide, index) => {
				this.addSlideControl(index);
			});

			window.addEventListener('scroll', (event) => {
				if (this.state.slides.length > 0 && !this.state.scrolling) {
					const scrollPosition = Math.round(window.pageYOffset);
					const startOffset = this.offsetTop;
					const endOffset = startOffset + this.props.scrollLength;

					if (scrollPosition > startOffset && scrollPosition <= endOffset) {
						this.showSlideControls();
						if (scrollPosition > startOffset + this.state.slides[this.state.currentSlide].offset) {
							const slideIndex = this.state.currentSlide + 1;
							const targetOffset = startOffset + this.state.slides[slideIndex].offset;

							if (targetOffset <= endOffset) {
								this.scrollToSlide(slideIndex, this.props.slideDuration);
							}
						} else if (scrollPosition < startOffset + this.state.slides[this.state.currentSlide].offset) {
							const slideIndex = this.state.currentSlide - 1;
							this.scrollToSlide(slideIndex, this.props.slideDuration);
						}
					} else {
						this.hideSlideControls();
					}
				}
			});

			let resizeTimeout;

			// prevent automatic scrolling when resizing
			window.addEventListener('resize', (event) => {
				this.state.scrolling = true;
				resizeTimeout = window.setTimeout(() => {
					this.state.scrolling = false;
					window.clearTimeout(resizeTimeout);
				}, 250);
			});
		}
	}

	scrollToSlide(slideIndex, slideDuration) {
		if (this.state.slides.length > 0 && !this.state.scrolling) {
			const startOffset = this.offsetTop;
			const targetOffset = startOffset + this.state.slides[slideIndex].offset;
			const slideTitle = this.state.slides[slideIndex].title;

			this.state.scrolling = true;
			this.activateSlideControl(slideIndex);
			this.dispatchShowSlideEvent(slideTitle);

			this.animateScrollTo(targetOffset, slideDuration, () => {
				this.state.currentSlide = slideIndex;
				this.state.scrolling = false;
			});
		}
	}

	dispatchShowSlideEvent(slideTitle) {
		const showSlideEvent = new CustomEvent (
			'bioScrollAnimation.showSlide',
			{
				detail: {
					title: slideTitle
				},
				bubbles: true,
				cancelable: true
			});

		this.dispatchEvent(showSlideEvent);
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

	addSlideControl(slideIndex) {
		let slideControls = this.shadowRoot.querySelector('.slide-controls');
		let slideControlElement = Component.wire()`<li>slide ${slideIndex}</li>`;

		slideControlElement.addEventListener('click', (event)=> {
			this.scrollToSlide(slideIndex, 0);
		});
		
		slideControls.appendChild(slideControlElement);
	}

	showSlideControls() {
		let slideControls : HTMLElement= this.shadowRoot.querySelector('.slide-controls');
		slideControls.classList.add('visible');
	}

	hideSlideControls() {
		let slideControls : HTMLElement= this.shadowRoot.querySelector('.slide-controls');
		slideControls.classList.remove('visible');
	}
	activateSlideControl(slideIndex) {
		let slideControls = this.shadowRoot.querySelector('.slide-controls');
		slideControls.querySelectorAll('li').forEach((control)=> control.classList.remove('active'));
		slideControls.querySelectorAll('li')[slideIndex].classList.add('active');
	}
}

export default BioScrollAnimation;
