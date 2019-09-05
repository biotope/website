import * as styles from './styles.scss';

import {
	BioHeadlineProps,
	BioHeadlineState,
	BioHeadlineMethods
} from './defines';
import Component from '@biotope/element';

export default (
	render: Function,
	data: BioHeadlineProps & BioHeadlineState & BioHeadlineMethods,
	createStyle: Function
) => {
	let content;
	switch (data.power) {
		case 1:
			content = Component.wire()`<h1><slot></slot></h1>`;
			break;
		case 2:
			content = Component.wire()`<h2><slot></slot></h2>`;
			break;
		case 3:
			content = Component.wire()`<h3><slot></slot></h3>`;
			break;
		case 4:
			content = Component.wire()`<h4><slot></slot></h4>`;
			break;
		case 5:
			content = Component.wire()`<h5><slot></slot></h5>`;
			break;
		default:
			break;
	}
	return render`
        ${createStyle(styles)}
        ${content}
    `;
};
