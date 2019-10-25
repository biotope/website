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
		{name: 'scroll-length', converter: (value) => parseInt(value) },
	];

	public methods: BioScrollAnimationMethods = {};

	get defaultProps() {
		return {
			animationDataPath: '',
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

	private slides = [];
	
	initSlides() {
		
		this.slides = [{
			title: 'start',
			offset: 0
		}];

		const slidesSections = this.querySelectorAll('.animation-slide');

		if (slidesSections.length > 1) {
			slidesSections.forEach((slideSection, index) => {
				this.slides.push({
					title: slideSection.querySelector('h3') ? slideSection.querySelector('h3').innerText : '',
					offset: Math.round((index + 1) * this.props.scrollLength / slidesSections.length)
				});
			});

			this.slides.forEach((slide, index) => {
				this.addSlideControl(index);
			});

			window.addEventListener('scroll', (event) => {
				if (this.slides.length > 0) {
					const scrollPosition = Math.floor(window.pageYOffset);
					const startOffset = this.offsetTop;
					const endOffset = startOffset + this.props.scrollLength;
					this.hideSlideControls();

					if (scrollPosition > startOffset && scrollPosition <= endOffset) {
						this.showSlideControls();
						this.updateSlideControls(scrollPosition);
					}
				}
			});
		}
	}

	scrollToSlide(slideIndex) {
		if (this.slides.length > 0) {
			const startOffset = this.offsetTop;
			const targetOffset = startOffset + this.slides[slideIndex].offset;

			window.scroll(0, targetOffset);
		}
	}

	updateSlideControls(scrollPosition) {
		this.slides.forEach((slide)=> {
			const startOffset = this.offsetTop;
			const slideOffset = startOffset + slide.offset;
			const slideIndex = this.slides.indexOf(slide);

			if (scrollPosition > slideOffset) {
				this.activateSlideControl(slideIndex + 1);
				this.dispatchShowSlideEvent(this.slides[slideIndex + 1].title);
			}
		})
	};

	private showSlideTimeout = 0;
	private currentSlideTitle = "";

	// only dispatch showSlide event when showed longer than 2 seconds
	dispatchShowSlideEvent(slideTitle) {
		window.clearTimeout(this.showSlideTimeout);

		if (slideTitle != this.currentSlideTitle) {
			this.showSlideTimeout = window.setTimeout(()=> {
				this.currentSlideTitle = slideTitle;
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
			}, 2000);
		}
	}

	addSlideControl(slideIndex) {
		let slideControls = this.shadowRoot.querySelector('.slide-controls');
		let slideControlElement = Component.wire()`<li>slide ${slideIndex}</li>`;

		slideControlElement.addEventListener('click', (event)=> {
			// prevent rendering issue on iOS touch devices when scrolling automatically too fast.
			if (!this.isTouchDevice()) {
				this.scrollToSlide(slideIndex);
			}
		});

		slideControls.appendChild(slideControlElement);
	}

	isTouchDevice() {
		return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
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
