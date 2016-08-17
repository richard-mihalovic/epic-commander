import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import Container from './../Container';
import Button from './elements/Button';
import TextInput from './elements/TextInput';

import FileUtils from './../../utils/FileUtils';

import { setWindowAction, WINDOW_ACTION_BROWSE } from './../../actions/window';
import { panelLoadContent, panelSetActiveRecord } from './../../actions/panels';

const BUTTON_RENAME = 'RENAME';
const BUTTON_CLOSE = 'CLOSE';
const BUTTONS = [ BUTTON_RENAME, BUTTON_CLOSE ];

class RenameDialog extends Component {
    constructor(props) {
        super(props);

        this.textInput = undefined;

        this.state = {
            activeButtonIdx: 0,
            activeButton: BUTTON_RENAME
        };
    }

    componentDidMount() {
        if(this.textInput) {
            this.textInput.focus();
        }
    }

    closeDialog() {
        this.props.dispatch( setWindowAction( WINDOW_ACTION_BROWSE ));        
    }

    rename() {
        const renameFrom = this.props.activePath + FileUtils.separator() + this.props.activeRecord;
        const renameTo = this.props.activePath + FileUtils.separator() + this.textInput.value;

        const operationWasSuccessful = FileUtils.rename(renameFrom, renameTo);
        if(operationWasSuccessful) {
            this.props.dispatch(
                panelLoadContent(this.props.side, this.props.activePath)
            );
            this.props.dispatch(
                panelSetActiveRecord(this.props.side, this.textInput.value)
            );

            this.closeDialog();
        } else { /* TODO: show error message */ }
    }

    processKey(e) {
        const code = e.code;
        if (code === 'Tab') {
            e.preventDefault();

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
        } else if (code === 'Enter') {
            this.processEnterKey();
            e.stopPropagation();
        }
    }

    processEnterKey() {
        const activeButton = this.state.activeButton;

        switch(activeButton) {
            case BUTTON_RENAME:
                this.rename();
                break;
            default:
                this.closeDialog();
        }
    }    

    render() {
        const activeButton = this.state.activeButton;
        return (
            <Container className="dialog" onKeyDown={ (e) => this.processKey(e) }>
                <Container className="title">Rename</Container>
                
                <Container className="content">
                    <TextInput 
                        value={ this.props.activeRecord } 
                        ref={ (input) => { input ? this.textInput = input.getInputElement() : null }}
                    />
                </Container>

                <Container className="buttons">
                    <Button
                        isSelected={ activeButton === BUTTON_CLOSE } 
                        onClick={ () => { this.closeDialog() } }
                    >{ BUTTON_CLOSE }</Button>

                    <Button 
                        isSelected={ activeButton === BUTTON_RENAME } 
                        onClick={ () => { this.rename() }}
                    >{ BUTTON_RENAME }</Button>
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
)(RenameDialog);