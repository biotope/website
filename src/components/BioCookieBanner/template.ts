import * as styles from './styles.scss';
import classNames from 'classnames';

import { BioCookieBannerProps, BioCookieBannerState, BioCookieBannerMethods } from './defines';


export default (render: Function, data: BioCookieBannerProps & BioCookieBannerState & BioCookieBannerMethods , createStyle: Function) => {
    const classes = classNames('wrapper', {'hidden': data.hidden});
    return render`
        ${createStyle(styles)}
        <div class="${classes}">
            <div class="wrapper-inner">
                <p>Diese Webseite verwendet Cookies, damit Sie alle Funktionen optimal nutzen können. Mit ihrem nächsten Klick auf der Website stimmen Sie der Cookie-Nutzung zu. </p>
                <div class="buttons">
                    <bio-button onclick="${data.handleAccept}" class="accept" modifier="whiteText blue" title="Accept"></bio-button>
                    <bio-button onclick="${data.handleDecline}" class="decline" modifier="whiteText blue" title="Decline"></bio-button>
                </div>
            </div>
        </div>
    `;
}
