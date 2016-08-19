import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import Container from './../Container';
import Button from './elements/Button';

import { setWindowAction, WINDOW_ACTION_BROWSE } from './../../actions/window';
import { commandDeleteFiles } from './../../actions/commands';

const BUTTON_DELETE = 'DELETE';
const BUTTON_CLOSE = 'CLOSE';
const BUTTONS = [ BUTTON_DELETE, BUTTON_CLOSE ];

class DeleteDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeButtonIdx: 0,
            activeButton: BUTTON_DELETE
        };
    }

    componentDidMount() {
        document.getElementsByClassName('dialog')[0].focus();
    }

    closeDialog() {
        this.props.dispatch( setWindowAction( WINDOW_ACTION_BROWSE ));        
    }

    deleteFiles() {
        // TODO: add support for selected files/records
        this.props.dispatch(
            commandDeleteFiles(this.props.activePath, [this.props.activeRecord])
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

    render() {
        const activeButton = this.state.activeButton;
        return (
            <Container className="dialog" hasFocus="1" onKeyDown={ (e) => this.processKey(e) }>
                <Container className="title">Delete file(s)</Container>
                <Container className="content">
                    <p style={{ flex: 1, textAlign: 'center', color: 'yellow', fontWeight: 'bold' }}>{ this.props.activeRecord }</p>
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
        activePath: state.get('data').getIn(
            ['panels', state.get('data').get('activePanel'), 'activePath']
        ),
        activeRecord: state.get('data').getIn(
            ['panels', state.get('data').get('activePanel'), 'activeRecord']
        ),
    })
)(DeleteDialog);