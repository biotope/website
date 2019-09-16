import Component from '@biotope/element';
import template from './template';

import { BioButtonProps, BioButtonState, BioButtonMethods } from './defines';



class BioButton extends Component< BioButtonProps, BioButtonState > {
    static componentName = 'bio-button';

    static attributes = [
        'title',
        'modifier'
    ];

    public methods: BioButtonMethods = {

    };

    connectedCallback() {
        this.registerEventListeners();
    }

    registerEventListeners() {
        
    }
   
    get defaultState() {
        return {

        }
    }
  
    get defaultProps() {
        return {
            title: '',
            modifier: '',
        }
    }

    render() {
        return template(this.html, { ...this.props, ...this.state, ...this.methods }, this.createStyle);
    }
}

export default BioButton;
