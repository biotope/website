/**
 *  ## DEFINE ALL INTERFACES FOR BioEasySetUp
 **/

/**
 * Props
 */
 interface BioEasySetUpProps {
	imgsrc: string;
	position?: string;
	headline: string;
	text: string;
	code: string;
 }

/**
 * State
 */
 interface BioEasySetUpState {
	copyText: string;
 }

/**
 * Methods
 */
 interface BioEasySetUpMethods {
	copyCode: Function
 }


export {
    BioEasySetUpProps,
	BioEasySetUpState,
	BioEasySetUpMethods
}
