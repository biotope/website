import * as styles from './styles.scss';
import classNames from 'classnames';

import { BioCookieBannerProps, BioCookieBannerState, BioCookieBannerMethods } from './defines';


export default (render: Function, data: BioCookieBannerProps & BioCookieBannerState & BioCookieBannerMethods , createStyle: Function) => {
    const classes = classNames('wrapper', {'hidden': data.hidden});
    return render`
        ${createStyle(styles)}
        <div class="${classes}">
            <div class="wrapper-inner">
                <p>We use cookies so that we can offer you the best possible website experience. These are cookies which are used solely for anonymous statistical purposes to help us improve the user experience on the website. You are free to decide whether you would like to permit these cookies. Further information can be found in our Privacy Policy.</p>
                <div class="buttons">
                    <bio-button onclick="${data.handleAccept}" class="accept" modifier="white" title="Accept"></bio-button>
                    <bio-button onclick="${data.handleDecline}" class="decline" modifier="white" title="Decline"></bio-button>
                </div>
            </div>
        </div>
    `;
}
