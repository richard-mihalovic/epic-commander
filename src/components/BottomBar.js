import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { homedir } from 'os';

import BottomBarItem from './BottomBarItem';
import Container from './Container';

class BottomBar extends Component {
    render() {
        const zoomedPanel = this.props.zoomedPanel;
        const previewPanel = this.props.previewPanel;

        // don't display bottom bar in preview mode
        if (previewPanel !== '') {
            return null;
        }
        
        return (
            <Container className="bottom_bar">
                { zoomedPanel === '' || zoomedPanel === 'left' ?
                    <BottomBarItem side="left" /> : null
                }
                <Container className="panel-separator" />
                { zoomedPanel === '' || zoomedPanel === 'right' ?
                    <BottomBarItem side="right" /> : null
                }
            </Container>
        );
    }
}

export default connect(
    (state) => ({
        previewPanel: state.get('data').get('previewPanel'),
        zoomedPanel: state.get('data').get('zoomedPanel')
    })
)(BottomBar);