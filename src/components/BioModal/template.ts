import * as styles from './styles.scss';
import classNames from 'classnames';

import { BioModalProps, BioModalState, BioModalMethods } from './defines';


export default (render: Function, data: BioModalProps & BioModalState & BioModalMethods , createStyle: Function) => {

    const classes = classNames('modal', {'open': data.open});

    return render`
        ${createStyle(styles)}
        <div class=${classes}>
            <div class="content">
                <button class="modal-close">
                    <img src="../_assets/closeButton.svg"/>
                </button>
                <slot></slot>
            </div>
            <div class="backdrop"></div>
        </div>
    `;
}
