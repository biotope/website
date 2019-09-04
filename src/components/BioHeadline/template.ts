import * as styles from './styles.scss';

import { BioHeadlineProps, BioHeadlineState, BioHeadlineMethods } from './defines';


export default (render: Function, data: BioHeadlineProps & BioHeadlineState & BioHeadlineMethods , createStyle: Function) => {
    return render`
        ${createStyle(styles)}
        <h2>
            <slot></slot>
        </h2>
    `;
}
