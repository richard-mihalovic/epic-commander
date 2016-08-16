import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import Container from './../Container';
import Button from './elements/Button';
import TextInput from './elements/TextInput';

import { setWindowAction, WINDOW_ACTION_BROWSE } from './../../actions/window';
import { commandCreateDirectory } from './../../actions/commands';

const BUTTON_CREATE = 'CREATE';
const BUTTON_CLOSE = 'CLOSE';
const BUTTONS = [ BUTTON_CREATE, BUTTON_CLOSE ];

class CreateDirectoryDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeButtonIdx: 0,
            activeButton: BUTTON_CREATE
        };
    }

    componentDidMount() {
        this.directoryElement.focus();
    }

    closeDialog() {
        this.directoryElement.value = '';
        this.props.dispatch( setWindowAction( WINDOW_ACTION_BROWSE ));        
    }

    createDirectory() {
        var directory = this.directoryElement.value;
        this.props.dispatch(
            commandCreateDirectory(this.props.path, directory)
        );

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
            e.preventDefault();
        }
    }

    processEnterKey() {
        const activeButton = this.state.activeButton;

        switch(activeButton) {
            case BUTTON_CREATE:
                this.createDirectory();
                break;
            default:
                this.closeDialog();
        }
    }

    render() {
        const activeButton = this.state.activeButton;
        return (
            <Container className="dialog" hasFocus="1" onKeyDown={ (e) => this.processKey(e) }>
                <Container className="title">Create directory</Container>
                <Container className="content">
                    <TextInput 
                        ref={ (elem) => { if(elem) { this.directoryElement = elem.getInputElement() }}}
                    />
                </Container>
                <Container className="buttons">
                    <Button
                        onClick={ () => { this.closeDialog() } }
                        type="normal"
                        isSelected={ activeButton === BUTTON_CLOSE } 
                    >{ BUTTON_CLOSE }</Button>

                    <Button
                        type="primary"
                        isSelected={ activeButton === BUTTON_CREATE }                     
                    >{ BUTTON_CREATE }</Button>
                </Container>
            </Container>
        );
    }
}

export default connect(
    (state) => ({
        path: state.get('data').getIn(
            ['panels', state.get('data').get('activePanel'), 'activePath']
        )
    })
)(CreateDirectoryDialog);