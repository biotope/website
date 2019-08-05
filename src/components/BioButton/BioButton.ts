import Component from '@biotope/element';
import template from './template';

import { BioButtonProps, BioButtonState, BioButtonMethods } from './defines';



class BioButton extends Component< BioButtonProps, BioButtonState > {
    static componentName = 'bio-button';

    static attributes = [

    ];

    public methods: BioButtonMethods = {

    };
   
    get defaultState() {
        return {

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

export default BioButton;
