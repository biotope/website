import Component from '@biotope/element';
import template from './template';

import { BioCollaboratorTileProps, BioCollaboratorTileState, BioCollaboratorTileMethods } from './defines';



class BioCollaboratorTile extends Component< BioCollaboratorTileProps, BioCollaboratorTileState > {
    static componentName = 'bio-collaborator-tile';

    static attributes = [
        'imgsrc',
        'type'
    ];

    public methods: BioCollaboratorTileMethods = {

    };
   
    get defaultState() {
        return {

        }
    }
  
    get defaultProps() {
        return {
            imgsrc: '',
            type: ''
        }
    }

    render() {
        return template(this.html, { ...this.props, ...this.state, ...this.methods }, this.createStyle);
    }
}

export default BioCollaboratorTile;
