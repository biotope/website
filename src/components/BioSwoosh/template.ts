import * as styles from './styles.scss';
import { BioSwooshProps } from './defines';


export default (render: Function, data: BioSwooshProps , createStyle: Function) => {

	const createDynamicStyles = (data: BioSwooshProps) => {
		return `<style>
			:host {
				height: ${data.height}px;
				margin-top: -${data.height}px;
			}
			bio-swoosh {
				height: ${data.height}px;
				margin-top: -${data.height}px;
			}		
			:host([direction='down']) {
				margin-top: 0;
				margin-bottom: -${data.height}px;
				transform: rotate(180deg);
			}
			bio-swoosh[direction='down'] {
				margin-top: 0;
				margin-bottom: -${data.height}px;
				transform: rotate(180deg);
			}
		</style>`;
	};

	const createSvg = (data: BioSwooshProps) => {
		const elementHeight = data.height;
		const fillColor = data.color || '';
		const translateOffset = 'translate(' + (data.offsetX || -576) + ' 0)';

		return `<svg viewBox="0 0 1920 256" preserveAspectRatio="xMidYMin slice" height="${elementHeight}">
		    <path d="M0,1.1168V410H3072V0.4C2580.7872,127.6832,2065.6128,195.4208,1534.6176,195.4208,1004.6464,195.4208,490.3936,127.9392,0,1.1168,Z" 
		    fill="${fillColor}" 
		    transform="${translateOffset}" />
		</svg>`
	};

    return render`
		${createStyle(styles)}
		${{ html : createDynamicStyles(data) }}
		${{ html : createSvg(data) }}
    `;
}
