import Component from '@biotope/element';
import template from './template';

import { BioParagraphProps, BioParagraphState, BioParagraphMethods } from './defines';



class BioParagraph extends Component< BioParagraphProps, BioParagraphState > {
    static componentName = 'bio-paragraph';

    static attributes = [

    ];

    public methods: BioParagraphMethods = {

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

export default BioParagraph;
