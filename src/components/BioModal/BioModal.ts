import Component from '@biotope/element';
import template from './template';

import { BioModalProps, BioModalState, BioModalMethods } from './defines';



class BioModal extends Component< BioModalProps, BioModalState > {
    static componentName = 'bio-modal';

    static attributes = [

    ];

    public methods: BioModalMethods = {

    };

    connectedCallback() {
        this.addEventListener('modal.open', e => {
            this.setState({
                open: true
            })
        })
    }
   
    get defaultState() {
        return {
            open: false
        }
    }
  
    get defaultProps() {
        return {
        }
    }

    render() {
        return template(this.html, { ...this.props, ...this.state, ...this.methods }, this.createStyle);
    }
}

export default BioModal;
