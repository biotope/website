import * as styles from './styles.scss';

import { BioButtonsProps, BioButtonsState, BioButtonsMethods } from './defines';


export default (render: Function, data: BioButtonsProps & BioButtonsState & BioButtonsMethods , createStyle: Function) => {

    return render`
        ${createStyle(styles)}
        <button class="${data.modifier}">${data.title}</button>
    `;
}
