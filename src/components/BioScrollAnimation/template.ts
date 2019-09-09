import * as styles from './styles.scss';

interface BioScrollAnimationTemplateData {
}

export default (render: Function, data: BioScrollAnimationTemplateData) => {
    return render`
        <style>${styles.toString()}</style>
        <div class="animation-wrapper">
			<div class="animation-container"></div>
			<div class="scroll-trigger"></div>
		</div>
    `;
}
