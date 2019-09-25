import Component from '@biotope/element';
import template from './template';

import { BioModalProps, BioModalState, BioModalMethods } from './defines';

import BioCollaboratorList from '../BioCollaboratorList/BioCollaboratorList';

class BioModal extends Component<BioModalProps, BioModalState> {
	static componentName = 'bio-modal';

    static attributes = [
		{
			name: 'openonpageload',
			converter: value => {
				if (value == '' || value == 'true') return true;
			}
		}
	];

    static dependencies = [ BioCollaboratorList as typeof Component ];

	public methods: BioModalMethods = {};

	connectedCallback() {

		this.addEventListener('modal.open', (e: CustomEvent) => {
            document.body.style.top = `-${window.scrollY}px`;
            document.body.style.position = 'fixed';
			this.setState({
                open: true
			});
		});
        
		this.addEventListener('modal.close', (e: CustomEvent) => {
            const scrollY = document.body.style.top;
			document.body.style.position = '';
			document.body.style.top = '';
			window.scrollTo(0, parseInt(scrollY || '0') * -1);
			this.setState({
                open: false
			});
		});

		['.backdrop', '.modal-close'].forEach((className: string) => {
			this.shadowRoot.querySelector(className).addEventListener('click', (e: CustomEvent) => {
				this.dispatchEvent(new CustomEvent('modal.close'));
			})
		})

		if (this.props.openonpageload) {
			this.setState({
				open: true
			})
		}
	}
    
	get defaultState() {
        return {
            open: false
		};
    }
    
    get defaultProps() {
        return {
			openonpageload: false
		}
    }

	render() {
		return template(this.html, { ...this.props, ...this.state, ...this.methods }, this.createStyle);
	}
}

export default BioModal;
