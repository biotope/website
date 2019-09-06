import Component from '@biotope/element';
import template from './template';

import {
	BioHeadlineProps,
	BioHeadlineState,
	BioHeadlineMethods
} from './defines';

class BioHeadline extends Component<BioHeadlineProps, BioHeadlineState> {
	static componentName = 'bio-headline';

	static attributes = [
		{
			name: 'power',
			converter: value => parseInt(value)
		}
	];

	public methods: BioHeadlineMethods = {};

	get defaultState() {
		return {};
	}

	get defaultProps() {
		return {
			power: 1
		};
	}

	render() {
		return template(
			this.html,
			{ ...this.props, ...this.state, ...this.methods },
			this.createStyle
		);
	}
}

export default BioHeadline;
