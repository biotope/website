/**
 *  ## DEFINE ALL INTERFACES FOR BioCookieBanner
 **/

/**
 * Props
 */
 interface BioCookieBannerProps {

 }

/**
 * State
 */
 interface BioCookieBannerState {
	hidden: Boolean;
 }

/**
 * Methods
 */
 interface BioCookieBannerMethods {
	handleAccept: Function;
	hideBanner: Function;
	handleDecline: Function;
 }


export {
    BioCookieBannerProps,
	BioCookieBannerState,
	BioCookieBannerMethods
}