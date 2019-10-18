import Component from '@biotope/element';
import template from './template';

import { BioBenefitProps, BioBenefitState, BioBenefitMethods } from './defines';



class BioBenefit extends Component< BioBenefitProps, BioBenefitState > {
    static componentName = 'bio-benefit';

    static attributes = [
        'imgsrc',
        'title',
        'color'
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
            title: '',
            color: ''
        }
    }

    render() {
        return template(this.html, { ...this.props, ...this.state, ...this.methods }, this.createStyle);
    }
}

export default BioBenefit;
