import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import fs from 'fs-extra';
import FileUtils from './../../utils/FileUtils';

import Container from './../Container';
import Button from './elements/Button';

import { setWindowAction, WINDOW_ACTION_BROWSE } from './../../actions/window';
import { panelLoadContent, panelSetActiveRecord } from './../../actions/panels';

const BUTTON_DELETE = 'DELETE';
const BUTTON_CLOSE = 'CLOSE';
const BUTTONS = [BUTTON_DELETE, BUTTON_CLOSE];

const STATE_COLLECTING_RECORDS = 'collecting';
const STATE_WAITING_FOR_USER_INPUT = 'waiting';
const STATE_DELETING_RECORDS = 'deleting';

class DeleteDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeState: STATE_COLLECTING_RECORDS,

            activeButtonIdx: 0,
            activeButton: BUTTON_DELETE,

            processingRecord: undefined,

            recordsToDelete: [],
            filesToDeleteCount: 0,
            directoriesToDeleteCount: 0
        };
    }

    componentDidMount() {
        document.getElementsByClassName('dialog')[0].focus();

        this.collectFiles([this.props.activePath + FileUtils.separator() + this.props.activeRecord]);
    }

    closeDialog() {
        this.props.dispatch(setWindowAction(WINDOW_ACTION_BROWSE));
    }

    deleteFiles() {
        // TODO: add support for selected files/records

        let stateChanged = false;
        
        const records = this.state.recordsToDelete;

        // delete all files first
        for (let record of records.reverse()) {
            if (!record.isDir) {
                this.setState(
                    Object.assign({}, this.state, {
                        activeState: STATE_DELETING_RECORDS,
                        processingRecord: record.path
                    })
                );

                fs.removeSync(record.path);
            }
        }

        // delete all directories
        for (let record of records.reverse()) {
            if (record.isDir) {
                fs.removeSync(record.path);
            }
        }

        this.props.dispatch(
            panelLoadContent(this.props.side, this.props.activePath)
        );
        this.closeDialog();

        // this.props.dispatch(
        //     panelSetActiveRecord(this.props.side, this.textInput.value)
        // );            
    }

    processKey(e) {
        const code = e.code;
        if (code === 'Tab') {
            let activeButtonIdx = this.state.activeButtonIdx;

            activeButtonIdx += 1;
            activeButtonIdx = activeButtonIdx < BUTTONS.length ? activeButtonIdx : 0;

            const newState = {
                activeButtonIdx,
                activeButton: BUTTONS[activeButtonIdx]
            };

            this.setState(
                Object.assign({}, this.state, newState)
            );
            e.preventDefault();
        } else if (code === 'Enter') {
            this.processEnterKey();
            e.stopPropagation();
        }
    }

    processEnterKey() {
        const activeButton = this.state.activeButton;

        switch (activeButton) {
            case BUTTON_DELETE:
                this.deleteFiles();
                break;
            default:
                this.closeDialog();
        }
    }

    collectFiles(recordsToDelete) {
        let records = [];
        let countFiles = 0;
        let countDirs = 0;

        // todo: delete all selected files
        let recordToDelete = recordsToDelete[0];
        fs.walk(recordToDelete)
            .on('data', (item) => {
                if (item.path.endsWith('..')) return;

                const isDir = item.stats.isDirectory();
                countFiles += isDir ? 0 : 1;
                countDirs += isDir ? 1 : 0;

                records.push({
                    path: item.path, isDir
                });

                this.setState(
                    Object.assign({}, this.state, {
                        processingRecord: item.path,
                        filesToDeleteCount: countFiles,
                        directoriesToDeleteCount: countDirs
                    })
                );
            })
            .on('end', (files) => {
                this.setState(
                    Object.assign({}, this.state, {
                        activeState: STATE_WAITING_FOR_USER_INPUT,
                        recordsToDelete: records,
                        processingRecord: undefined
                    })
                );
            });
    }

    renderScreenActiveState() {
        const activeState = this.state.activeState;
        switch(activeState) {
            case STATE_COLLECTING_RECORDS:
            case STATE_WAITING_FOR_USER_INPUT:
                return <p style={{ width: '100%', textAlign: 'center' }}>Do you want to delete { this.state.filesToDeleteCount } files and { this.state.directoriesToDeleteCount } directories?</p>;            
            case STATE_DELETING_RECORDS:
                return <p style={{ width: '100%', textAlign: 'center' }}>Deleting: { this.state.processingRecord }</p>;
            default:
                return null;            
        }
    }

    render() {
        const activeButton = this.state.activeButton;
        const screen = this.renderScreenActiveState();
        return (
            <Container className="dialog" hasFocus="1" onKeyDown={ (e) => this.processKey(e) }>
                <Container className="title">Delete file(s) </Container>
                <Container className="content">{ screen }</Container>
                <Container className="buttons">

                    <Button
                        isSelected={ activeButton === BUTTON_CLOSE }
                        onClick={ () => { this.closeDialog() } }
                        >{ BUTTON_CLOSE }</Button>

                    <Button
                        isSelected={ activeButton === BUTTON_DELETE }
                        onClick={ () => { this.deleteFiles() } }
                        >{ BUTTON_DELETE }</Button>

                </Container>
            </Container>
        );
    }
}

export default connect(
    (state) => ({
        side: state.get('data').get('activePanel'),
        activePath: state.get('data').getIn(
            ['panels', state.get('data').get('activePanel'), 'activePath']
        ),
        activeRecord: state.get('data').getIn(
            ['panels', state.get('data').get('activePanel'), 'activeRecord']
        ),
    })
)(DeleteDialog);