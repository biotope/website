import Component from '@biotope/element';
import template from './template';

import { BioBenefitsProps, BioBenefitsState, BioBenefitsMethods } from './defines';



class BioBenefits extends Component< BioBenefitsProps, BioBenefitsState > {
    static componentName = 'bio-benefits';

    static attributes = [

    ];

    public methods: BioBenefitsMethods = {

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

export default BioBenefits;
