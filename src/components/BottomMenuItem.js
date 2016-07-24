import { h, Component } from 'preact';

import Container from './Container';

export default class BottomMenuItem extends Component {
    render() {
        return (
            <Container className="bottom_menu_item" onClick={ this.props.onClick }>
                <span className="key">{this.props.keyLabel}</span> 
                <span className="label">{ this.props.title }</span>
            </Container>
        );
    }
}