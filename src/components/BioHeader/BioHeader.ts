import Component from '@biotope/element';
import template from './template';

import { BioHeaderProps, BioHeaderState, BioHeaderMethods } from './defines';



class BioHeader extends Component< BioHeaderProps, BioHeaderState > {
    static componentName = 'bio-header';

    static attributes = [

    ];

    public methods: BioHeaderMethods = {

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

export default BioHeader;
