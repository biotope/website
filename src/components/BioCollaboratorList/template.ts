import * as styles from './styles.scss';

import { BioCollaboratorListProps, BioCollaboratorListState, BioCollaboratorListMethods } from './defines';
import Component from '@biotope/element';
import classNames from 'classnames';

export default (render: Function, data: BioCollaboratorListProps & BioCollaboratorListState & BioCollaboratorListMethods, createStyle: Function) => {

    const listsClasses = classNames('lists', `${data.activeType}`)

    return render`
        ${createStyle(styles)}
        <div class="wrapper">
            <div class="switch">
                <ul>
                    <li data-value="core" class="${data.activeType === 'core' && 'active'}">Core Group</li>
                    <li data-value="collab" class="${data.activeType === 'collab' && 'active'}">Collaborators</li>
                    <li data-value="vi" class="${data.activeType === 'vi' && 'active'}">Virtual Identity</li>
                </ul>
            </div>
            <div class=${listsClasses}>
                <slot></slot>
            </div>
        </div>
    `;
}
