import Component from '@biotope/element';
import template from './template';

import { BioEasySetUpProps, BioEasySetUpState, BioEasySetUpMethods } from './defines';

class BioEasySetUp extends Component< BioEasySetUpProps, BioEasySetUpState > {
    static componentName = 'bio-easy-set-up';

    static attributes = [
        'imgsrc',
        'position',
        'headline',
        'text',
        'code'
    ];

	public methods: BioEasySetUpMethods = {
		copyCode: () => {
			var textArea = document.createElement("textarea");
			textArea.value = this.props.code;
			textArea.style.position = "fixed"; //avoid scrolling to bottom
			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();

			try {
                const successful = document.execCommand("copy");
                if (successful) {
                    this.setState({
                        copyText: '*Copied*'
                    })
                }
			} catch (err) {
				console.error("Couldn't copy code snippet: ", err);
			}

			document.body.removeChild(textArea);
		}
    };
    
    created() {
        super.created();

        this.shadowRoot.querySelector('.copy-code').addEventListener('mouseleave', (e: Event) => {
            setTimeout(() => {
                this.setState({
                    copyText: 'Copy'
                })
            }, 500);
        })
    }

	get defaultState() {
		return {
            copyText: 'Copy'
        };
	}
  
    get defaultProps() {
        return {
            imgsrc: '',
            position: '',
            headline: '',
            text: '',
            code: ''
        }
    }

    render() {
        return template(this.html, { ...this.props, ...this.state, ...this.methods }, this.createStyle);
    }
}

export default BioEasySetUp;
