import Component from '@biotope/element';
import template from './template';

import { BioResourceProps, BioResourceState, BioResourceMethods } from './defines';



class BioResource extends Component< BioResourceProps, BioResourceState > {
    static componentName = 'bio-resource';

    static attributes = [
        'imgsrc'
    ];

    public methods: BioResourceMethods = {

    };
   
    get defaultState() {
        return {

        }
    }
  
    get defaultProps() {
        return {
            imgsrc: ''
        }
    }

    render() {
        return template(this.html, { ...this.props, ...this.state, ...this.methods }, this.createStyle);
    }
}

export default BioResource;
