import { PANEL_LOAD_CONTENT, PANEL_SET_ACTIVE_RECORD, PANEL_TOGGLE_SHOW_HIDDEN_FILES } from '../actions/panels';
import { KEY_UP, KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_HOME, KEY_END, KEY_TAB, KEY_ENTER, KEY_H, KEY_Z } from '../actions/keyboard';

import FileUtils from '../utils/FileUtils';

import Immutable from 'immutable';
import { homedir } from 'os';
import { resolve, sep as separtor } from 'path';

let initialState = Immutable.fromJS({
    activePanel: 'left',
    zoomedPanel: '',

    panels: {
        left: {
            activeRecord: undefined,
            activePath: homedir(),
            settings: { showHiddenFiles: false },
            records: []
        },
        right: {
            activeRecord: undefined,
            activePath: homedir(),
            settings: { showHiddenFiles: false },
            records: []
        }
    }
});

export default function (state = initialState, action) {
    console.log(action.type);

    switch (action.type) {
        case PANEL_LOAD_CONTENT:
            return panelLoadContent(state, action.side, action.path);

        case PANEL_SET_ACTIVE_RECORD:
            return setActiveRecord(state, action.side, action.title);

        case KEY_TAB:
            return switchPanel(state);

        case KEY_ENTER:
            return enterPanelRecord(state);

        case KEY_UP:
            return moveCursorUp(state);

        case KEY_DOWN:
            return moveCursorDown(state);

        case KEY_HOME, KEY_LEFT:
            return moveToFirstRecordInPanel(state);

        case KEY_END, KEY_RIGHT:
            return moveToLastRecordInPanel(state);

        case KEY_H:
            return toggleShowHiddenFiles(state);

        case KEY_Z:
            return togglePanelZoom(state);
    }
    return state;
}

function panelLoadContent(state, side, path, activeRecord) {
    let showHiddenFiles = state.getIn(['panels', 'side', 'settings', 'showHiddenFiles']);
    let records = Immutable.fromJS(
        FileUtils.scanPath(path, activeRecord, showHiddenFiles)
    );

    return state.setIn(
        ['panels', side, 'records'],
        records
    ).setIn(
        ['panels', side, 'activeRecord'],
        activeRecord ? activeRecord : records.first().get('title')
    );
}

function switchPanel(state) {
    let activePanel = state.get('activePanel') === 'left' ? 'right' : 'left';
    return state.set('activePanel', activePanel);
}

function toggleShowHiddenFiles(state) {
    const activePanel = state.get('activePanel');
    const activePath = state.getIn(['panels', activePanel, 'activePath']);

    const newState = state.setIn(
        ['panels', 'side', 'settings', 'showHiddenFiles'],
        !state.getIn(['panels', 'side', 'settings', 'showHiddenFiles'])
    );

    return panelLoadContent(newState, activePanel, activePath, undefined);
}

function togglePanelZoom(state) {
    const activePanel = state.get('activePanel');
    return state.set(
        'zoomedPanel',
        state.get('zoomedPanel') === '' ? activePanel : ''
    );
}

function moveCursorUp(state) {
    let side = state.get('activePanel');
    let activeRecord = state.getIn(['panels', side, 'activeRecord']);
    let records = state.getIn(['panels', side, 'records']);
    let index = records.findIndex((record) => record.get('title') === activeRecord);

    if (index <= 0) { return state; }

    let updatedRecords = records
        .set(index, records.get(index).set('isSelected', false))
        .set(index - 1, records.get(index - 1).set('isSelected', true));

    return state
        .setIn(['panels', side, 'records'], updatedRecords)
        .setIn(['panels', side, 'activeRecord'], records.get(index - 1).get('title'));
}

function moveCursorDown(state) {
    let side = state.get('activePanel');
    let activeRecord = state.getIn(['panels', side, 'activeRecord']);
    let records = state.getIn(['panels', side, 'records']);
    let index = records.findIndex((record) => record.get('title') === activeRecord);

    if (index >= records.size - 1) { return state; }

    let updatedRecords = records
        .set(index, records.get(index).set('isSelected', false))
        .set(index + 1, records.get(index + 1).set('isSelected', true));

    return state
        .setIn(['panels', side, 'records'], updatedRecords)
        .setIn(['panels', side, 'activeRecord'], records.get(index + 1).get('title'));
}

function moveToFirstRecordInPanel(state) {
    let activePanel = state.get('activePanel');
    let lastRecord = state.getIn(['panels', activePanel, 'records']).first().get('title');

    state.setIn(['activeRecord', activePanel], lastRecord);
    return setActiveRecord(state, activePanel, lastRecord);
}

function moveToLastRecordInPanel(state) {
    let activePanel = state.get('activePanel');
    let lastRecord = state.getIn(['panels', activePanel, 'records']).last().get('title');

    state.setIn(['records', activePanel, 'activeRecord'], lastRecord);
    return setActiveRecord(state, activePanel, lastRecord);
}

function setActiveRecord(state, activePanel, title) {
    let records = state.getIn(['panels', activePanel, 'records']);

    // TODO: optimize this
    let recordsProcessed = Immutable.List([]);
    for (let record of records) {
        recordsProcessed = recordsProcessed.push(
            record.set('isSelected', record.get('title') === title)
        );
    }

    return state
        .set('activePanel', activePanel)
        .setIn(['panels', activePanel, 'activeRecord'], title)
        .setIn(['panels', activePanel, 'records'], recordsProcessed);
}

function enterPanelRecord(state) {
    // check if activeRecord is directory
    const side = state.get('activePanel');
    let fullPath = state.getIn(['panels', side, 'activePath']) + separtor + state.getIn(['panels', side, 'activeRecord']);

    let presetActiveRecord = undefined;
    if(fullPath.endsWith('..')) {
        let record = fullPath.replace(separtor + '..', '');
        let idx = record.lastIndexOf(separtor);
        presetActiveRecord = record.substring(idx + 1, record.length);
    }

    fullPath = resolve(fullPath);

    let updatedState = state
        .setIn(['panels', side, 'activePath'], fullPath)
        .setIn(['panels', side, 'presetActiveRecord'], presetActiveRecord);

    return panelLoadContent(updatedState, side, fullPath, presetActiveRecord);
}