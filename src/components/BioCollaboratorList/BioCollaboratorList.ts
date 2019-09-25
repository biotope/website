import Component from '@biotope/element';
import template from './template';

import BioCollaboratorTile from '../BioCollaboratorTile/BioCollaboratorTile';

import { BioCollaboratorListProps, BioCollaboratorListState, BioCollaboratorListMethods } from './defines';

class BioCollaboratorList extends Component<BioCollaboratorListProps, BioCollaboratorListState> {
	static componentName = 'bio-collaborator-list';

	static attributes = [];

	static dependencies = [BioCollaboratorTile as typeof Component];

	public methods: BioCollaboratorListMethods = {};

	connectedCallback() {
		this.addEventListener('switch', (e: any) => {
			this.setState({
				activeType: e.detail.type
			});
		});

		this.shadowRoot.querySelectorAll('.wrapper .switch ul li').forEach(switchButton => {
			switchButton.addEventListener('click', (e: any) => {
				this.dispatchEvent(new CustomEvent('switch', { detail: { type: e.target.dataset.value } }));
			});
		});
	}

	get defaultState() {
		return {
			activeType: 'core'
		};
	}

	get defaultProps() {
		return {};
	}

	render() {
		return template(this.html, { ...this.props, ...this.state, ...this.methods }, this.createStyle);
	}
}

export default BioCollaboratorList;
