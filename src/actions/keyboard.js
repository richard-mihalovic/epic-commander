import { WINDOW_CLOSE_MODAL } from './window';

export const KEY_UP = 'KEY_UP';
export const KEY_DOWN = 'KEY_DOWN';
export const KEY_LEFT = 'KEY_LEFT';
export const KEY_RIGHT = 'KEY_RIGHT';
export const KEY_HOME = 'KEY_HOME';
export const KEY_END = 'KEY_END';
export const KEY_TAB = 'KEY_TAB';
export const KEY_ENTER = 'KEY_ENTER';
export const KEY_ESCAPE = 'KEY_ESCAPE';
export const KEY_SPACE = 'KEY_SPACE';
export const KEY_H = 'KEY_H';
export const KEY_P = 'KEY_P';
export const KEY_Z = 'KEY_Z';
export const KEY_F1 = 'KEY_F1';
export const KEY_F2 = 'KEY_F2';
export const KEY_F3 = 'KEY_F3';
export const KEY_F4 = 'KEY_F4';
export const KEY_F5 = 'KEY_F5';
export const KEY_F6 = 'KEY_F6';
export const KEY_F7 = 'KEY_F7';
export const KEY_F8 = 'KEY_F8';
export const KEY_F9 = 'KEY_F9';
export const KEY_F10 = 'KEY_F10';

export function keyPress(e, isModalActive) {
    let action = { type: 'unknown' };
    let key = e.code;

    if(isModalActive) { 
        if (key === 'Escape') action.type = WINDOW_CLOSE_MODAL;
        return action;
    }

    if (key === 'ArrowUp') action.type = KEY_UP;
    else if (key === 'ArrowDown') action.type = KEY_DOWN;
    else if (key === 'ArrowLeft') action.type = KEY_LEFT;
    else if (key === 'ArrowRight') action.type = KEY_RIGHT;
    else if (key === 'Tab') action.type = KEY_TAB;
    else if (key === 'Enter') action.type = KEY_ENTER;
    else if (key === 'Escape') action.type = KEY_ESCAPE;
    else if (key === 'Space') action.type = KEY_SPACE;
    else if (key === 'KeyH') action.type = KEY_H;
    else if (key === 'KeyP') action.type = KEY_P;
    else if (key === 'KeyZ') action.type = KEY_Z;
    else if (key === 'F1') action.type = KEY_F1;
    else if (key === 'F2') action.type = KEY_F2;
    else if (key === 'F3') action.type = KEY_F3;
    else if (key === 'F4') action.type = KEY_F4;
    else if (key === 'F5') action.type = KEY_F5;
    else if (key === 'F6') action.type = KEY_F6;
    else if (key === 'F7') action.type = KEY_F7;
    else if (key === 'F8') action.type = KEY_F8;
    else if (key === 'F9') action.type = KEY_F9;
    else if (key === 'F10') action.type = KEY_F10;

    if(action.type !== 'unknown') {
        e.preventDefault();
    }

    return action;
}
