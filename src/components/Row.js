import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { findIndex } from 'lodash';

import Container from './Container';

import { panelSetActiveRecord } from '../actions/panels';

class Row extends Component {
    handleOnClick(record) {
        this.props.dispatch(
            panelSetActiveRecord(
                this.props.side, record.get('title')
            )
        );
    }

    render() {
        let record = this.props.record;
        return (
            <Container
                className={ record.get('dir') ? this.props.className + ' dir' : this.props.className }
                onClick={ () => { this.handleOnClick(record) } }
            >
                <div className="column_title">
                    { record.get('isSelected') ? '*' : '' }
                    { record.get('title') }
                </div>
                <div className="column_size">
                    { record.get('size') }
                </div>
            </Container>
        );
    }
}

export default connect( () => ({}) )(Row);