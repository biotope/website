import Component from '@biotope/element';
import template from './template';

import { BioButtonsProps, BioButtonsState, BioButtonsMethods } from './defines';



class BioButtons extends Component< BioButtonsProps, BioButtonsState > {
    static componentName = 'bio-buttons';

    static attributes = [
        'title',
        'modifier'
    ];

    public methods: BioButtonsMethods = {

    };

    connectedCallback() {
        this.registerEventListeners();
    }

    registerEventListeners() {
        this.addEventListener('click', (e: Event) => {
            e.preventDefault();
            window.open(this.props.title);
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
        }
    }

    render() {
        return template(this.html, { ...this.props, ...this.state, ...this.methods }, this.createStyle);
    }
}

export default BioButtons;
