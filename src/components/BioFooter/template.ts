import * as styles from './styles.scss';

import { BioFooterProps, BioFooterState, BioFooterMethods } from './defines';


export default (render: Function, data: BioFooterProps & BioFooterState & BioFooterMethods , createStyle: Function) => {
    return render`
        ${createStyle(styles)}
        <div class="inner-wrapper">
            Fill me
        </div>
    `;
}
