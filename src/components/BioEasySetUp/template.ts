import * as styles from './styles.scss';
import classNames from 'classnames';

import { BioEasySetUpProps, BioEasySetUpState, BioEasySetUpMethods } from './defines';


export default (render: Function, data: BioEasySetUpProps & BioEasySetUpState & BioEasySetUpMethods , createStyle: Function) => {
    const classes = classNames('easy-setup-wrapper', data.position);

    return render`
        ${createStyle(styles)}
        <div class=${classes}>
            <img src="${data.imgsrc}" />
            <div class="text-wrapper">
				<h4>${data.headline}</h4>
				<p>${data.text}</p>
				<code>${data.code}</code>
            </div>
        </div>
    `;
}
