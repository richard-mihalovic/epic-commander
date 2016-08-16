import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { homedir } from 'os';

import BottomMenuItem from './BottomMenuItem';
import Container from './Container';

export default class BottomMenu extends Component {
    render() {        
        return (
            <Container className="bottom_menu">
                <BottomMenuItem keyLabel="F1" title="Empty" onClick={ () => { alert('f1') } } />
                <BottomMenuItem keyLabel="F2" title="Rename" />
                <BottomMenuItem keyLabel="F3" title="Empty" />
                <BottomMenuItem keyLabel="F4" title="Empty" />
                <BottomMenuItem keyLabel="F5" title="Empty" />
                <BottomMenuItem keyLabel="F6" title="Empty" />
                <BottomMenuItem keyLabel="F7" title="MkDir" />
                <BottomMenuItem keyLabel="F8" title="Delete" />
                <BottomMenuItem keyLabel="F9" title="Empty" />
                <BottomMenuItem keyLabel="F10" title="Empty" />
            </Container>
        );
    }
}