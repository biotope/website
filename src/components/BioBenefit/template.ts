import * as styles from './styles.scss';
import classNames from 'classnames';

import { BioBenefitProps, BioBenefitState, BioBenefitMethods } from './defines';


export default (render: Function, data: BioBenefitProps & BioBenefitState & BioBenefitMethods , createStyle: Function) => {
    const classes = classNames('wrapper', data.color);
    
    return render`
        ${createStyle(styles)}
        <div class=${classes}>
            <img src="${data.imgsrc}" />
            <h3>${data.title}</h3>
            <p><slot></slot></p>
        </div>
    `;
}
