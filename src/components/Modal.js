import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import Container from './Container';
import CreateDirectoryDialog from './dialogs/CreateDirectoryDialog';
import DeleteDialog from './dialogs/DeleteDialog';
import RenameDialog from './dialogs/RenameDialog';

class Modal extends Component {
    render() {
        const action = this.props.action;
                
        let dialog = null;
        switch (action) {
            case 'command-create-directory':
                dialog = <CreateDirectoryDialog />;
                break;
            case 'command-delete':
                dialog = <DeleteDialog/>
                break;
            case 'command-rename':
                dialog = <RenameDialog />;
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