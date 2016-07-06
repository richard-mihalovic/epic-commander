import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { homedir } from 'os';

import AddressBarItem from './AddressBarItem';
import Container from './Container';

class AddressBar extends Component {
    render() {
        const address_left = this.props.address_left.replace(homedir(), '~');
        const address_right = this.props.address_right.replace(homedir(), '~');
        return (
            <Container className="address_bar">
                <AddressBarItem side="left" address={ address_left } />
                <Container className="panel-separator" />
                <AddressBarItem side="right" address={ address_right } />
            </Container>
        );
    }
}

export default connect(
    (state) => ({
        address_left: state.get('data').getIn(['panels', 'left', 'activePath']),
        address_right: state.get('data').getIn(['panels', 'right', 'activePath'])
    })
)(AddressBar);