import Component from "@biotope/element";
import template from "./template";

import {
	BioGoogleTrackingStatusProps,
	BioGoogleTrackingStatusState,
	BioGoogleTrackingStatusMethods
} from "./defines";

class BioGoogleTrackingStatus extends Component<BioGoogleTrackingStatusProps, BioGoogleTrackingStatusState> {
	static componentName = "bio-google-tracking-status";

	static attributes = [];

	public methods: BioGoogleTrackingStatusMethods = {};

	created() {
		super.created();

        const cookies = document.cookie.split(';');
        cookies.forEach((cookie: string) => {
            if (cookie.includes('cookie_consent')) {
                const d = cookie.split('=');
                if (d[1] === 'true') {
                    this.setState({
                        status: 'active'
                    })
                } else {
                    this.setState({
                        status: 'inactive'
                    })
                }
            }
        })

		this.addEventListener("google.tracking.disabled", () => {
            this.setState({
                status: 'inactive'
            })
        });
        
		this.addEventListener("google.tracking.enabled", () => {
            this.setState({
                status: 'active'
            })
        });
	}

	get defaultState() {
		return {
			status: "undecided"
		};
	}

	get defaultProps() {
		return {};
	}

	render() {
		return template(this.html, { ...this.props, ...this.state, ...this.methods }, this.createStyle);
	}
}

export default BioGoogleTrackingStatus;
