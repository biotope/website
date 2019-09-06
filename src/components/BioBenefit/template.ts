import * as styles from './styles.scss';

import { BioBenefitProps, BioBenefitState, BioBenefitMethods } from './defines';


export default (render: Function, data: BioBenefitProps & BioBenefitState & BioBenefitMethods , createStyle: Function) => {
    return render`
        ${createStyle(styles)}
        <div class="wrapper">
            <img src="${data.imgsrc}" />
            <h3>${data.title}</h3>
            <p><slot></slot></p>
        </div>
    `;
}
