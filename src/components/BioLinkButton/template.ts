import * as styles from './styles.scss';

import { BioLinkButtonProps, BioLinkButtonState, BioLinkButtonMethods } from './defines';


export default (render: Function, data: BioLinkButtonProps & BioLinkButtonState & BioLinkButtonMethods , createStyle: Function) => {
    return render`
        ${createStyle(styles)}
        <a href="${data.url}" class="${data.modifier}">${data.title}</a>
    `;
}
