import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import fs from 'fs-extra';

import Container from './../Container';
import Button from './elements/Button';

import { setWindowAction, WINDOW_ACTION_BROWSE } from './../../actions/window';
import { panelLoadContent, panelSetActiveRecord } from './../../actions/panels';

const BUTTON_DELETE = 'DELETE';
const BUTTON_CLOSE = 'CLOSE';
const BUTTONS = [ BUTTON_DELETE, BUTTON_CLOSE ];

class DeleteDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeButtonIdx: 0,
            activeButton: BUTTON_DELETE,

            collectingRecords: true,
            processingRecord: undefined,
            filesToDelete: 0,
            directoriesToDelete: 0
        };
    }

    componentDidMount() {
        document.getElementsByClassName('dialog')[0].focus();

        this.collectFiles([ this.props.activePath + '/' + this.props.activeRecord ]);
    }

    closeDialog() {
        this.props.dispatch( setWindowAction( WINDOW_ACTION_BROWSE ));        
    }

    deleteFiles() {
        // TODO: add support for selected files/records
        // this.props.dispatch(
        //     commandDeleteFiles(this.props.activePath, [this.props.activeRecord])
        // );

        //this.collectFiles([ this.props.activePath + '/' + this.props.activeRecord ]);

        this.closeDialog();
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

        switch(activeButton) {
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
        fs.walk(recordsToDelete[0])
        .on('data', (item) => {            
            if(item.path.endsWith('..')) return;

            const isDir = item.stats.isDirectory();
            countFiles += isDir ? 0 : 1;
            countDirs += isDir ? 1 : 0;
            
            records.push({
                path: item.path, isDir
            });

            this.setState(
                Object.assign({}, this.state, {
                    processingRecord: item.path,
                    filesToDelete: countFiles,
                    directoriesToDelete: countDirs
                })
            );          
        })
        .on('end', (files) => {
            
            // delete all files first
            for(let record of records.reverse()) {
                if (!record.isDir) {
                    fs.removeSync(record.path);
                }
            }

            // todo: remove all directories
            // fs.removeSync(record.path);

            this.props.dispatch(
                panelLoadContent(this.props.side, this.props.activePath)
            );
            // this.props.dispatch(
            //     panelSetActiveRecord(this.props.side, this.textInput.value)
            // );            
        });
    }  

    render() {
        const activeButton = this.state.activeButton;
        return (
            <Container className="dialog" hasFocus="1" onKeyDown={ (e) => this.processKey(e) }>
                <Container className="title">Delete file(s)</Container>
                <Container className="content">
                    { this.state.collectingRecords ? <p>Do you want to delete { this.state.filesToDelete } files and { this.state.directoriesToDelete } directories ? </p> : null }
                </Container>
                <Container className="buttons">

                    <Button
                        isSelected={ activeButton === BUTTON_CLOSE } 
                        onClick={ () => { this.closeDialog() } }
                    >{ BUTTON_CLOSE }</Button>

                    <Button 
                        isSelected={ activeButton === BUTTON_DELETE } 
                        onClick={ () => { this.deleteFiles() }}
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