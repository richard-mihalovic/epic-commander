import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import Container from './Container';
import Panel from './Panel';
import PreviewPanel from './PreviewPanel';

class Window extends Component {
    render() {
        const side = this.props.activePanel;
        const previewPanel = this.props.previewPanel;

        return (
            <Container className="window">
                { previewPanel === 'left' ? <PreviewPanel /> : <Panel side="left" /> }
                <Container className="panel-separator" />
                { previewPanel === 'right' ? <PreviewPanel /> : <Panel side="right" /> } 
            </Container>
        );
    }
}

export default connect(
    (state) => ({
        activePanel: state.get('data').get('activePanel'),
        previewPanel: state.get('data').get('previewPanel')
    })
)(Window);