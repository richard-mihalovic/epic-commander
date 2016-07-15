import { h, Component } from 'preact';

import Container from './Container';

export default class AddressBarItem extends Component {
    render() {
        let className = 'address_bar_' + this.props.side;
        
        if (this.props.centerText) {
            className += ' center_text';
        }

        return (
            <Container className={ className }>
                { this.props.address }
            </Container>
        );
    }
}