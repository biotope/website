import * as styles from './styles.scss';
import classNames from 'classnames';

import { BioCookieBannerProps, BioCookieBannerState, BioCookieBannerMethods } from './defines';


export default (render: Function, data: BioCookieBannerProps & BioCookieBannerState & BioCookieBannerMethods , createStyle: Function) => {
    const classes = classNames('wrapper', {'hidden': data.hidden});
    return render`
        ${createStyle(styles)}
        <div class="${classes}">
            <div class="wrapper-inner">
                <p>We use cookies so that we can offer you the best possible website experience and see whether our marketing campaigns are effective. 
                    With Google Analytics (cookies expire in 24 months) we gain insights on how users interact with the website to better understand if 
                    their needs are met. With the LinkedIn Insight Tag (cookies expire in 24 months) we gain insights whether our marketing efforts are 
                    having the desired effect. You are free to decline these cookies, but we'd be happy if you let us use your anonymized data. Further 
                    information can be found in our Privacy Policy
                </p>
                <div class="buttons">
                    <bio-button onclick="${data.handleAccept}" class="accept" modifier="white" title="Accept"></bio-button>
                    <bio-button onclick="${data.handleDecline}" class="decline" modifier="white" title="Decline"></bio-button>
                </div>
            </div>
        </div>
    `;
}
