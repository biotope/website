import * as styles from './styles.scss';

import { BioGoogleTrackingStatusProps, BioGoogleTrackingStatusState, BioGoogleTrackingStatusMethods } from './defines';


export default (render: Function, data: BioGoogleTrackingStatusProps & BioGoogleTrackingStatusState & BioGoogleTrackingStatusMethods , createStyle: Function) => {
    const labels = {
        'active': 'Enabled',
        'undecided': 'You haven\'t decided yet so tracking is disabled',
        'inactive': 'Disabled' 
    }
    return render`
        ${createStyle(styles)}
        <div><strong>Google tracking status:</strong> <span class=${data.status}>${labels[data.status]}</span></div>
    `;
}
