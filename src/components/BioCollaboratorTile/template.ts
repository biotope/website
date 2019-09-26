import * as styles from './styles.scss';

import { BioCollaboratorTileProps, BioCollaboratorTileState, BioCollaboratorTileMethods } from './defines';

export default (
	render: Function,
	data: BioCollaboratorTileProps & BioCollaboratorTileState & BioCollaboratorTileMethods,
	createStyle: Function
) => {
	return render`
        ${createStyle(styles)}
        <div class="wrapper">
            <img src="${data.imgsrc}" />
            <p>
                <slot></slot>
            </p>
        </div>
    `;
};
