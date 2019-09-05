import Component from '@biotope/element';
import template from './template';

import { BioFooterProps, BioFooterState, BioFooterMethods } from './defines';



class BioFooter extends Component< BioFooterProps, BioFooterState > {
    static componentName = 'bio-footer';

    static attributes = [

    ];

    public methods: BioFooterMethods = {

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

export default BioFooter;
