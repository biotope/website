import Component from '@biotope/element';
import template from './template';

import { BioGithubCornerProps, BioGithubCornerState, BioGithubCornerMethods } from './defines';



class BioGithubCorner extends Component< BioGithubCornerProps, BioGithubCornerState > {
    static componentName = 'bio-github-corner';

    static attributes = [
        'href'
    ];

    public methods: BioGithubCornerMethods = {

    };

    connectedCallback() {
        console.log('connected');
        this.registerEventListeners();
    }

    registerEventListeners() {
        this.addEventListener('click', (e: Event) => {
            e.preventDefault();
            window.open(this.props.href);
        })
    }

   
    get defaultState() {
        return {

        }
    }
  
    get defaultProps() {
        return {
            href: ''
        }
    }

    render() {
        return template(this.html, { ...this.props, ...this.state, ...this.methods }, this.createStyle);
    }
}

export default BioGithubCorner;
