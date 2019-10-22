import Component from '@biotope/element';
import template from './template';

import { BioLinkButtonProps, BioLinkButtonState, BioLinkButtonMethods } from './defines';



class BioLinkButton extends Component< BioLinkButtonProps, BioLinkButtonState > {
    static componentName = 'bio-link-button';

	static attributes = ['title', 'modifier', 'url'];

	public methods: BioLinkButtonMethods = {};

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

export default BioLinkButton;
