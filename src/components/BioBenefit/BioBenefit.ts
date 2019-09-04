import Component from '@biotope/element';
import template from './template';

import { BioBenefitProps, BioBenefitState, BioBenefitMethods } from './defines';



class BioBenefit extends Component< BioBenefitProps, BioBenefitState > {
    static componentName = 'bio-benefit';

    static attributes = [
        'imgsrc',
        'title'
    ];

    public methods: BioBenefitMethods = {

    };

    get defaultState() {
        return {

        }
    }
  
    get defaultProps() {
        return {
            imgsrc: '',
            title: ''
        }
    }

    render() {
        return template(this.html, { ...this.props, ...this.state, ...this.methods }, this.createStyle);
    }
}

export default BioBenefit;
