/**
 *  ## DEFINE ALL INTERFACES FOR BioScrollAnimation
 **/

/**
 * Props
 */
 interface BioScrollAnimationProps {
	animationDataPath: string
	slideDuration?: number
	scrollLength: number
 }

 interface BioScrollAnimationSlide {
 	title: string
	offset: number
 }

/**
 * State
 */
 interface BioScrollAnimationState {
	currentSlide: number
	slides: BioScrollAnimationSlide[]
	scrolling: boolean,
	touched: boolean
}

/**
 * Methods
 */
 interface BioScrollAnimationMethods {

 }


export {
    BioScrollAnimationProps,
	BioScrollAnimationState,
	BioScrollAnimationMethods
}
