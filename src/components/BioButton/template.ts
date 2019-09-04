import * as styles from './index.scss';

import { BioButtonProps, BioButtonState, BioButtonMethods } from './defines';


export default (render: Function, data: BioButtonProps & BioButtonState & BioButtonMethods , createStyle: Function) => {
    return render`
        ${createStyle(styles)}
        <div>Fill me</div>
    `;
}
