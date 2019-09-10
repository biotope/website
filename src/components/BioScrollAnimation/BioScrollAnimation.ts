import Component from '@biotope/element';
import template from './template';

import * as Bodymovin from 'bodymovin';

import { TweenMax, TimelineMax, Linear } from "gsap";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";

import * as ScrollMagic from "scrollmagic";
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

// TODO: remove indicators for final version!
import 'imports-loader?define=>false!scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min';

import { BioScrollAnimationProps, BioScrollAnimationState, BioScrollAnimationMethods } from './defines';
import {TextComponent2Methods} from "../TextComponent2/defines";

class BioScrollAnimation extends Component< BioScrollAnimationProps, BioScrollAnimationState > {
    static componentName = 'bio-scroll-animation';

    static attributes = [
		'animation-data-url',
		{name: 'autoplay', converter: (value) => true },
		{name: 'loop', converter: (value) => true },
		'renderer',
		{name: 'scroll-duration', converter: (value) => parseInt(value) },
		{name: 'scroll-factor', converter: (value) => parseFloat(value) }
	];

	public methods: BioScrollAnimationMethods = {};

	get defaultState() {
		return {

		}
	}

	get defaultProps() {
		return {
			animationDataUrl: '',
			autoplay: false,
			loop: false,
			renderer: 'svg',
			scrollDuration: '1000',
			scrollFactor: 1
		};
	}


	connectedCallback() {
		this.loadAnimationData((animationData) => this.loadAnimation(animationData) );
	}

	render() {
		return template(this.html, { ...this.props, ...this.state, ...this.methods }, this.createStyle);
	}

	loadAnimationData(onDataLoaded) {
		fetch(this.props.animationDataUrl, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Response-Type': 'json'
			}
		}).then((response) => {
			if (response.ok) {
				response.json().then((responseData) => {
					onDataLoaded(responseData);
				});
			} else {
				console.error(response.status + ': ' + response.statusText + '\n' + response.url);
			}
		}).catch((error) => {
			console.error('Error :', error.message);
		});
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
			.addIndicators() // TODO: remove indicators for final version!
	}

	loadAnimation(animationData) {

		const animationContainer: HTMLElement = this.shadowRoot.querySelector('.animation-container');

		const animationOptions = {
			animationData: animationData,
			container: animationContainer,
			...this.props
		};

		const animation = Bodymovin.loadAnimation(animationOptions);
		animation.addEventListener('DOMLoaded', () => {
			this.initScrollController(animation, animationContainer);
		});

	}
}

export default BioScrollAnimation;
