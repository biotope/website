import * as styles from "./styles.scss";
import Component from "@biotope/element";

import { BioCollaboratorTileProps, BioCollaboratorTileState, BioCollaboratorTileMethods } from "./defines";

export default (
	render: Function,
	data: BioCollaboratorTileProps & BioCollaboratorTileState & BioCollaboratorTileMethods,
	createStyle: Function
) => {
	return render`
        ${createStyle(styles)}
        <div class="wrapper">
            <div class="img-wrapper">
				<div class="info">
					<a target="_blank" rel="noopener noreferrer" href="${data.github}">
						<svg viewBox="0 0 482.8 482.8">
							<g>
								<g>
									<path d="M255.2,209.3c-5.3,5.3-5.3,13.8,0,19.1c21.9,21.9,21.9,57.5,0,79.4l-115,115c-21.9,21.9-57.5,21.9-79.4,0l-17.3-17.3
										c-21.9-21.9-21.9-57.5,0-79.4l115-115c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-115,115C8.7,322.7,0,343.6,0,365.8
										c0,22.2,8.6,43.1,24.4,58.8l17.3,17.3c16.2,16.2,37.5,24.3,58.8,24.3s42.6-8.1,58.8-24.3l115-115c32.4-32.4,32.4-85.2,0-117.6
										C269.1,204,260.5,204,255.2,209.3z"/>
									<path d="M458.5,58.2l-17.3-17.3c-32.4-32.4-85.2-32.4-117.6,0l-115,115c-32.4,32.4-32.4,85.2,0,117.6c5.3,5.3,13.8,5.3,19.1,0
										s5.3-13.8,0-19.1c-21.9-21.9-21.9-57.5,0-79.4l115-115c21.9-21.9,57.5-21.9,79.4,0l17.3,17.3c21.9,21.9,21.9,57.5,0,79.4l-115,115
										c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l115-115c15.7-15.7,24.4-36.6,24.4-58.8
										C482.8,94.8,474.2,73.9,458.5,58.2z"/>
								</g>
							</g>
						</svg>
						GitHub
					</a>
				</div>
                <img src="${data.imgsrc}" />
            </div>
            <p>
                <slot></slot>
            </p>
        </div>
    `;
};
