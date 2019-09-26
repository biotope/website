import * as styles from './styles.scss';
import { BioSwooshProps } from './defines';


export default (render: Function, data: BioSwooshProps , createStyle: Function) => {

	let margin = 'margin-top:' + - data.height + 'px';
	let rotate = '';

	if (data.direction === 'down') {
		margin = 'margin-bottom: ' + - data.height + 'px';
		rotate = 'transform: rotate(180deg);'
	}

	const createDynamicStyles = (data: BioSwooshProps) => `
		<style>
			bio-swoosh {
				height: ${data.height}px;
				${margin};
				${rotate};
			}
			:host {
				height: ${data.height}px;
				${margin};
				${rotate};
			}
			bio-swoosh svg path {
				fill: ${data.color};
				transform: translateX(${data.shift || -30}%);
			}
			:host svg path {
				fill: ${data.color};
				transform: translateX(${data.shift || -30}%);
			}
		</style>
		`;

    return render`
		${createStyle(styles)}
		${{ html : createDynamicStyles(data) }}
		<svg viewBox="0 0 1920 256" preserveAspectRatio="xMidYMin slice">
			<path d="M0,1.1168V410H3072V0.4C2580.7872,127.6832,2065.6128,195.4208,1534.6176,195.4208,1004.6464,195.4208,490.3936,127.9392,0,1.1168,Z" />
		</svg>
    `;
}
