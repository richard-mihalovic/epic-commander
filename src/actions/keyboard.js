export const KEY_UP = 'KEY_UP';
export const KEY_DOWN = 'KEY_DOWN';
export const KEY_LEFT = 'KEY_LEFT';
export const KEY_RIGHT = 'KEY_RIGHT';
export const KEY_HOME = 'KEY_HOME';
export const KEY_END = 'KEY_END';
export const KEY_TAB = 'KEY_TAB';
export const KEY_ENTER = 'KEY_ENTER';
export const KEY_ESCAPE = 'KEY_ESCAPE';
export const KEY_H = 'KEY_H';
export const KEY_Z = 'KEY_Z';

export function keyPress(e) {
    let action = { type: 'unknown' };
    let key = e.code;

    if (key === 'ArrowUp') action.type = KEY_UP;
    else if (key === 'ArrowDown') action.type = KEY_DOWN;
    else if (key === 'ArrowLeft') action.type = KEY_LEFT;
    else if (key === 'ArrowRight') action.type = KEY_RIGHT;
    else if (key === 'Tab') action.type = KEY_TAB;
    else if (key === 'Enter') action.type = KEY_ENTER;
    else if (key === 'Escape') action.type = KEY_ESCAPE;
    else if (key === 'KeyH') action.type = KEY_H;
    else if (key === 'KeyZ') action.type = KEY_Z;

    if(action.type !== 'unknown') {
        e.preventDefault();
    }

    return action;
}