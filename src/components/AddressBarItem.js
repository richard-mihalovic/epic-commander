import { h, Component } from 'preact';

import Container from './Container';

export default class AddressBarItem extends Component {
    render() {
        const className = 'address_bar_' + this.props.side;
        return (
            <Container className={ className }>
                { this.props.address }
            </Container>
        );
    }
}