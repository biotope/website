import * as styles from './styles.scss';

import { BioButtonProps, BioButtonState, BioButtonMethods } from './defines';


export default (render: Function, data: BioButtonProps & BioButtonState & BioButtonMethods , createStyle: Function) => {

    return render`
        ${createStyle(styles)}
        <button class="${data.modifier}">${data.title}</button>
    `;
}
