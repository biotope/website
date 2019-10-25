import Component from '@biotope/element';
import template from './template';

import { BioCookieBannerProps, BioCookieBannerState, BioCookieBannerMethods } from './defines';
import BioButton from '../BioButton/BioButton';



class BioCookieBanner extends Component< BioCookieBannerProps, BioCookieBannerState > {
    static componentName = 'bio-cookie-banner';

    static attributes = [

    ];

    static dependencies = [
        BioButton as typeof Component
    ];

    public methods: BioCookieBannerMethods = {

        handleAccept: () => {
            document.dispatchEvent(new CustomEvent('cookies.accept'));
            this.methods.hideBanner();
        },
        
        handleDecline: () => {
            document.dispatchEvent(new CustomEvent('cookies.decline'));
            this.methods.hideBanner();
        },

        hideBanner: () => {
            this.setState({
                hidden: true
            })
        }

    };

    created() {
        super.created();
        this.classList.remove('hiddenOnLoad');
        if (document.cookie.indexOf("cookie_consent") != -1) {
            this.setState({
                hidden: true
            })
        }
        this.addEventListener('cookiebanner.open', (e: CustomEvent) => {
            this.setState({
                hidden: false
            })
        })
    }
   
    get defaultState() {
        return {
            hidden: false
        }
    }
  
    get defaultProps() {
        return {

        }
    }

    render() {
        return template(this.html, { ...this.props, ...this.state, ...this.methods }, this.createStyle);
    }
}

export default BioCookieBanner;
