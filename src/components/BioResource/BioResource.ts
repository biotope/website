import Component from '@biotope/element';
import template from './template';
import BioLinkButton from '../BioLinkButton/BioLinkButton';

import { BioResourceProps, BioResourceState, BioResourceMethods } from './defines';

class BioResource extends Component< BioResourceProps, BioResourceState > {
    static componentName = 'bio-resource';

    static attributes = [
        'imgsrc',
        'image-border-color',
        'border'
    ];

    public static dependencies = [
        BioLinkButton as typeof Component,
      ];

    public methods: BioResourceMethods = {

    };
   
    get defaultState() {
        return {

        }
    }
  
    get defaultProps() {
        return {
            imgsrc: '',
            imageBorderColor: '',
            border: ''
        }
    }

    render() {
        return template(this.html, { ...this.props, ...this.state, ...this.methods }, this.createStyle);
    }
}

export default BioResource;
