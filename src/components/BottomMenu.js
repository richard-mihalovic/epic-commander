import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { homedir } from 'os';

import BottomMenuItem from './BottomMenuItem';
import Container from './Container';

export default class BottomMenu extends Component {
    render() {        
        return (
            <Container className="bottom_menu">
                <BottomMenuItem keyLabel="F1" title="Help" onClick={ () => { alert('f1') } } />
                <BottomMenuItem keyLabel="F2" title="Rename" />
                <BottomMenuItem keyLabel="F3" title="View" />
                <BottomMenuItem keyLabel="F4" title="NoOp" />
                <BottomMenuItem keyLabel="F5" title="Copy" />
                <BottomMenuItem keyLabel="F6" title="Move" />
                <BottomMenuItem keyLabel="F7" title="MkDir" />
                <BottomMenuItem keyLabel="F8" title="Delete" />
                <BottomMenuItem keyLabel="F9" title="NoOp" />
                <BottomMenuItem keyLabel="F10" title="NoOp" />
            </Container>
        );
    }
}