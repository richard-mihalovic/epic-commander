import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import Container from './Container';
import CreateDirectoryDialog from './modals/CreateDirectoryDialog';
import DeleteFilesDialog from './modals/DeleteFilesDialog';

class Modal extends Component {
    render() {
        const action = this.props.action;
                
        let dialog = null;
        switch (action) {
            case 'createDirectory':
                dialog = <CreateDirectoryDialog />;
                break;
            case 'deleteFiles':
                dialog = <DeleteFilesDialog />;
                break;
        }

        return (
            <Container>
                { dialog ? 
                    <Container id="modal" className="modal">
                            { dialog }
                    </Container> 
                    : 
                    null 
                }
            </Container>
        );
    }
}

export default connect(
    (state) => ({
        action: state.get('data').get('action')
    })
)(Modal);