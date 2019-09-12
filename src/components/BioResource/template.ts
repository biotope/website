import * as styles from './styles.scss';

import { BioResourceProps, BioResourceState, BioResourceMethods } from './defines';


export default (render: Function, data: BioResourceProps & BioResourceState & BioResourceMethods , createStyle: Function) => {
    return render`
        ${createStyle(styles)}
        <div class="wrapper">
            <div class="wrapper__imageWrapper">
                <img src="${data.imgsrc}" />
            </div>
            <slot></slot>
        </div>
    `;
}

