import Component from '@biotope/element';
import template from './template';

import {BioButtonProps, BioButtonState, BioButtonMethods} from './defines';

class BioButton extends Component<BioButtonProps, BioButtonState> {
	static componentName = 'bio-button';

	static attributes = ['title', 'modifier', 'url'];

	public methods: BioButtonMethods = {};

	connectedCallback() {
		this.registerEventListeners();
	}

	registerEventListeners() {
		if (this.props.url) {
			this.addEventListener('click', (e: Event) => {
				e.preventDefault();
				if (this.props.url[0] === '#') {
					const targetElement: HTMLElement = document.querySelector(this.props.url);
					if (!!targetElement) {
						window.scrollTo(0, targetElement.offsetTop);
					}
				} else {
					window.open(this.props.url);
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
			url: null
		};
	}

	render() {
		return template(this.html, {...this.props, ...this.state, ...this.methods}, this.createStyle);
	}
}

export default BioButton;
