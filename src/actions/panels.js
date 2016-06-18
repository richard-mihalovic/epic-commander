export const PANEL_LOAD_CONTENT = 'PANEL_LOAD_CONTENT';
export const PANEL_SET_ACTIVE_RECORD = 'PANEL_SET_ACTIVE_RECORD';
export const PANEL_MOVE_TO_LAST_RECORD = 'PANEL_MOVE_TO_LAST_RECORD';

export function panelLoadContent(side, path) {
    return {
        type: PANEL_LOAD_CONTENT,
        path, side
    }
}

export function panelSetActiveRecord(side, title) {
    return {
        type: PANEL_SET_ACTIVE_RECORD,
        side, title
    }
}