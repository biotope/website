import * as styles from './styles.scss';
import classNames from 'classnames';

import { BioEasySetUpProps, BioEasySetUpState, BioEasySetUpMethods } from './defines';


export default (render: Function, data: BioEasySetUpProps & BioEasySetUpState & BioEasySetUpMethods , createStyle: Function) => {
    const classes = classNames('wrapper', data.position);

    return render`
        ${createStyle(styles)}
        <div class=${classes}>
            <img src="${data.imgsrc}" />
            <slot></slot>
        </div>
    `;
}
