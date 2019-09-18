import Component from '@biotope/element';
import template from './template';

import { BioButtonProps, BioButtonState, BioButtonMethods } from './defines';



class BioButton extends Component< BioButtonProps, BioButtonState > {
    
    static componentName = 'bio-button';

    static attributes = [
        'title',
        'modifier',
        'url'
    ];

    public methods: BioButtonMethods = {

    };

    connectedCallback() {
        this.registerEventListeners();
    }

    registerEventListeners() {
        this.addEventListener('click', (e: Event) => {
            e.preventDefault();
            window.open(this.props.url);
        })
    }
   
    get defaultState() {
        return {

        }
    }
  
    get defaultProps() {
        return {
            title: '',
            modifier: '',
            url: ''
        }
    }

    render() {
        return template(this.html, { ...this.props, ...this.state, ...this.methods }, this.createStyle);
    }
}

export default BioButton;
