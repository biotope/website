/**
 *  ## DEFINE ALL INTERFACES FOR BioScrollAnimation
 **/

/**
 * Props
 */
 interface BioScrollAnimationProps {
	animationDataPath: string
	slides?: number
	slideDuration?: number
	scrollLength?: number
	scrollFactor?: number
 }

/**
 * State
 */
 interface BioScrollAnimationState {
	currentSlide: number
	scrolling: boolean
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
