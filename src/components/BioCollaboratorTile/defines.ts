/**
 *  ## DEFINE ALL INTERFACES FOR BioCollaboratorTile
 **/

/**
 * Props
 */
 interface BioCollaboratorTileProps {
	imgsrc: string;
	type: string;
	github: string;
 }

/**
 * State
 */
 interface BioCollaboratorTileState {

 }

/**
 * Methods
 */
 interface BioCollaboratorTileMethods {
	mouseEnterHandle: Function;
	mouseLeaveHandle: Function;
 }


export {
    BioCollaboratorTileProps,
	BioCollaboratorTileState,
	BioCollaboratorTileMethods
}