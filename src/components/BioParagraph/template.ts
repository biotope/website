import * as styles from './styles.scss';

import { BioParagraphProps, BioParagraphState, BioParagraphMethods } from './defines';


export default (render: Function, data: BioParagraphProps & BioParagraphState & BioParagraphMethods , createStyle: Function) => {
    return render`
        ${createStyle(styles)}
        <p><slot></slot></p>
    `;
}
