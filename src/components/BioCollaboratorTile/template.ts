import * as styles from "./styles.scss";
import Component from "@biotope/element";

import {
	BioCollaboratorTileProps,
	BioCollaboratorTileState,
	BioCollaboratorTileMethods
} from "./defines";

export default (
	render: Function,
	data: BioCollaboratorTileProps &
		BioCollaboratorTileState &
		BioCollaboratorTileMethods,
	createStyle: Function
) => {
	return render`
        ${createStyle(styles)}
        <div class="wrapper" onmouseenter=${
			data.mouseEnterHandle
		} onmouseleave=${data.mouseLeaveHandle}>
            <div class="img-wrapper">
                <img src="${data.imgsrc}" />
            </div>
            <p>
                <slot></slot>
            </p>
            ${
				data.github
					? Component.wire()`<div class="hover-layer">
                <!-- <a href="${data.github}"><span class="gh-link">GitHub</span></a> -->
            <div>`
					: ""
			}
            
        </div>
    `;
};
