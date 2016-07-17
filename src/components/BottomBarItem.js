import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import Container from './Container';

class BottomBarItem extends Component {
    render() {
        let className = 'bottom_bar_' + this.props.side;
        
        return (
            <Container className={ className }>
                { this.props.side === 'left' ?
                    this.props.activeRecordLeft : this.props.activeRecordRight
                }
            </Container>
        );
    }
}

export default connect(
    (state) => ({
        activeRecordLeft: state.get('data').getIn(['panels', 'left', 'activeRecord']),
        activeRecordRight: state.get('data').getIn(['panels', 'right', 'activeRecord'])
    })
)(BottomBarItem);