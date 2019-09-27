import Component from '@biotope/element';
import template from './template';

import { BioEasySetUpProps, BioEasySetUpState, BioEasySetUpMethods } from './defines';

class BioEasySetUp extends Component< BioEasySetUpProps, BioEasySetUpState > {
    static componentName = 'bio-easy-set-up';

    static attributes = [
        'imgsrc',
        'position',
        'headline',
        'text',
        'code'
    ];

    public methods: BioEasySetUpMethods = {

    };
   
    get defaultState() {
        return {

        }
    }
  
    get defaultProps() {
        return {
            imgsrc: '',
            position: '',
            headline: '',
            text: '',
            code: ''
        }
    }

    render() {
        return template(this.html, { ...this.props, ...this.state, ...this.methods }, this.createStyle);
    }
}

export default BioEasySetUp;
