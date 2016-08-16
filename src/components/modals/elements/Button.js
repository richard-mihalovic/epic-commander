import { h, Component } from 'preact';

import Container from './../../Container';

export default class Button extends Component {
    render() {
        const type = this.props.type;
        const isSelected = this.props.isSelected;
        
        return (
            <Container 
                className={ 'button button_' + (type ? type : 'normal') + (isSelected ? ' button_selected' : '') }
                onClick={ this.props.onClick }
            >
                { this.props.children }
            </Container>
        );
    }
}