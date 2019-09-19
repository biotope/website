import Component from '@biotope/element';
import template from './template';

import { BioButtonProps, BioButtonState, BioButtonMethods } from './defines';

class BioButton extends Component<BioButtonProps, BioButtonState> {
	static componentName = 'bio-button';

	static attributes = ['title', 'modifier', 'url'];

	public methods: BioButtonMethods = {};

	connectedCallback() {
		this.registerEventListeners();
	}

	registerEventListeners() {
		this.addEventListener('click', (e: Event) => {
			e.preventDefault();
			if (this.props.url[0] === '#') {
				window.scrollTo(0, document.querySelector(this.props.url).getBoundingClientRect().top);
			} else {
				window.open(this.props.url);
			}
		});
	}

	get defaultState() {
		return {};
	}

	get defaultProps() {
		return {
			title: '',
			modifier: '',
			url: null
		};
	}

	render() {
		return template(this.html, { ...this.props, ...this.state, ...this.methods }, this.createStyle);
	}
}

export default BioButton;
