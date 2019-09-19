import * as styles from './styles.scss';
import {BioScrollAnimationMethods, BioScrollAnimationProps, BioScrollAnimationState} from "./defines";

interface BioScrollAnimationTemplateData {
}

export default (render: Function, data: BioScrollAnimationProps & BioScrollAnimationState & BioScrollAnimationMethods , createStyle: Function) => {
	return render`
        ${createStyle(styles)}
        <div class="animation-wrapper">
			<div class="animation-container"></div>
			<div class="scroll-trigger"></div>
			<ul class="slide-controls"></ul>
		</div>
    `;
}
