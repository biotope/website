import * as styles from './styles.scss';
import classNames from 'classnames';

import { BioCookieBannerProps, BioCookieBannerState, BioCookieBannerMethods } from './defines';


export default (render: Function, data: BioCookieBannerProps & BioCookieBannerState & BioCookieBannerMethods , createStyle: Function) => {
    const classes = classNames('wrapper', {'hidden': data.hidden});
    return render`
        ${createStyle(styles)}
        <div class="${classes}">
            <div class="wrapper-inner">
                <slot></slot>
                <div class="buttons">
                    <bio-button onclick="${data.handleAccept}" class="accept" modifier="white compact" title="Accept"></bio-button>
                    <bio-button onclick="${data.handleDecline}" class="decline" modifier="white compact" title="Decline"></bio-button>
                </div>
            </div>
        </div>
    `;
}
