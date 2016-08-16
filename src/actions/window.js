export const WINDOW_ACTION_SET = 'WINDOW_ACTION_SET';
export const WINDOW_CLOSE_MODAL = 'WINDOW_CLOSE_MODAL';

export const WINDOW_ACTION_BROWSE = 'browse';

export function setWindowAction(windowAction) {
    return { type: WINDOW_ACTION_SET, windowAction };
}