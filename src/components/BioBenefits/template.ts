import * as styles from './styles.scss';

import { BioBenefitsProps, BioBenefitsState, BioBenefitsMethods } from './defines';


export default (render: Function, data: BioBenefitsProps & BioBenefitsState & BioBenefitsMethods , createStyle: Function) => {
    return render`
        ${createStyle(styles)}
        <div>Fill me</div>
    `;
}
