import Component from '@biotope/element';
import template from './template';

import { BioSectionHeadlineProps, BioSectionHeadlineState, BioSectionHeadlineMethods } from './defines';



class BioSectionHeadline extends Component< BioSectionHeadlineProps, BioSectionHeadlineState > {
    static componentName = 'bio-section-headline';

    static attributes = [

    ];

    public methods: BioSectionHeadlineMethods = {

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

export default BioSectionHeadline;
