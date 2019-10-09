import Component from '@biotope/element';
import template from './template';

import { BioCollaboratorTileProps, BioCollaboratorTileState, BioCollaboratorTileMethods } from './defines';

interface BioCollaboratorTile {
    wrapper: HTMLElement
}

class BioCollaboratorTile extends Component< BioCollaboratorTileProps, BioCollaboratorTileState > {
    static componentName = 'bio-collaborator-tile';

    static attributes = [
        'imgsrc',
        'type',
        'github'
    ];


    public methods: BioCollaboratorTileMethods = {
        mouseEnterHandle: () => {
            this.shadowRoot.querySelector('.wrapper').classList.add('hover')
        },
        
        mouseLeaveHandle: () => {
            this.shadowRoot.querySelector('.wrapper').classList.remove('hover')
        }
    };
   
    get defaultState() {
        return {

        }
    }
  
    get defaultProps() {
        return {
            imgsrc: '',
            type: '',
            github: ''
        }
    }

    render() {
        return template(this.html, { ...this.props, ...this.state, ...this.methods }, this.createStyle);
    }
}

export default BioCollaboratorTile;
