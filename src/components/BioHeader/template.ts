import * as styles from './styles.scss';

import { BioHeaderProps, BioHeaderState, BioHeaderMethods } from './defines';


export default (render: Function, data: BioHeaderProps & BioHeaderState & BioHeaderMethods , createStyle: Function) => {
    return render`
        ${createStyle(styles)}
        <div class="inner-wrapper">
            Fill me
        </div>
    `;
}
