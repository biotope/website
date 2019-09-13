import * as styles from './styles.scss';
import classNames from 'classnames';

import { BioResourceProps, BioResourceState, BioResourceMethods } from './defines';

export default (render: Function, data: BioResourceProps & BioResourceState & BioResourceMethods , createStyle: Function) => {
    const classes = classNames('wrapper', data.imageBorderColor, data.border);
    
    return render`
        ${createStyle(styles)}
        <div class=${classes}>
            <div class="wrapper__imageWrapper">
                <img src="${data.imgsrc}" />
            </div>
            <slot></slot>
        </div>
    `;
}