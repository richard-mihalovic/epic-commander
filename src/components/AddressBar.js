import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { homedir } from 'os';

import AddressBarItem from './AddressBarItem';
import Container from './Container';

class AddressBar extends Component {
    render() {
        const zoomedPanel = this.props.zoomedPanel;
        const previewPanel = this.props.previewPanel;
        
        let addressLeft = this.props.addressLeft.replace(homedir(), '~');
        let addressRight = this.props.addressRight.replace(homedir(), '~');

        if (previewPanel === 'left') addressLeft = this.props.activeRecordRight;
        if (previewPanel === 'right') addressRight = this.props.activeRecordLeft;

        return (
            <Container className="address_bar">
                { zoomedPanel === '' || zoomedPanel === 'left' ?
                    <AddressBarItem side="left" address={ addressLeft } centerText={previewPanel === 'left'} /> : null
                }
                { zoomedPanel === '' ?
                    <Container className="panel-separator" /> : null
                }
                { zoomedPanel === '' || zoomedPanel === 'right' ?
                    <AddressBarItem side="right" address={ addressRight } centerText={previewPanel === 'right'} /> : null
                }
            </Container>
        );
    }
}

export default connect(
    (state) => ({
        previewPanel: state.get('data').get('previewPanel'),
        zoomedPanel: state.get('data').get('zoomedPanel'),
        addressLeft: state.get('data').getIn(['panels', 'left', 'activePath']),
        addressRight: state.get('data').getIn(['panels', 'right', 'activePath']),
        activeRecordLeft: state.get('data').getIn(['panels', 'left', 'activeRecord']),
        activeRecordRight: state.get('data').getIn(['panels', 'right', 'activeRecord'])
    })
)(AddressBar);