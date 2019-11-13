import Component from '@biotope/element';
import template from './template';

import { BioLinkButtonProps, BioLinkButtonState, BioLinkButtonMethods } from './defines';



class BioLinkButton extends Component< BioLinkButtonProps, BioLinkButtonState > {
    static componentName = 'bio-link-button';

	static attributes = ['title', 'modifier', 'href'];

	public methods: BioLinkButtonMethods = {};

	connectedCallback() {
		this.registerEventListeners();
	}

	registerEventListeners() {
		if (this.props.href) {
			this.addEventListener('click', (e: Event) => {
				e.preventDefault();
				if (this.props.href[0] === '#') {
					const targetElement: HTMLElement = document.querySelector(this.props.href);
					if (!!targetElement) {
						targetElement.scrollIntoView({behavior: 'smooth'});
					}
				} else {
					window.open(this.props.href);
				}
			});
		}
	}

	get defaultState() {
		return {};
	}

	get defaultProps() {
		return {
			title: '',
			modifier: '',
			href: null
		};
	}

	render() {
		return template(this.html, {...this.props, ...this.state, ...this.methods}, this.createStyle);
	}
}

export default BioLinkButton;
