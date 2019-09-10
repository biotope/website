import * as styles from './styles.scss';

import { BioSectionHeadlineProps, BioSectionHeadlineState, BioSectionHeadlineMethods } from './defines';


export default (render: Function, data: BioSectionHeadlineProps & BioSectionHeadlineState & BioSectionHeadlineMethods , createStyle: Function) => {
    return render`
        ${createStyle(styles)}
        <slot></slot>
    `;
}
