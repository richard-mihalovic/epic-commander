import React from 'react';
import { connect } from 'react-redux';
import { findIndex } from 'lodash';

import Container from './Container';

import { panelSetActiveRecord } from '../actions/panels';

class Row extends React.Component {
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
                onClick={ () => { this.handleOnClick(record); } }
            >
                <div className="column_title">
                    {record.get('title')}
                </div>
                <div className="column_size">{record.get('size')}</div>
            </Container>
        );
    }
}

export default connect()(Row);