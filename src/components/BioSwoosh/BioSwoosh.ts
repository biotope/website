import Component from '@biotope/element';
import template from './template';

import { BioSwooshProps } from './defines';



class BioSwoosh extends Component< BioSwooshProps, null > {
    static componentName = 'bio-swoosh';

    static attributes = [
		'color',
		'direction',
		{name: 'height', converter: (value) => parseInt(value) },
		{name: 'shift', converter: (value) => parseInt(value) },
    ];
  
    get defaultProps() {
        return {
			direction: 'up',
			color: 'white',
			height: 100,
			shift: 0
        }
    }

    render() {
        return template(this.html, { ...this.props }, this.createStyle);
    }
}

export default BioSwoosh;
