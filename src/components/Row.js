import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { findIndex } from 'lodash';

import Container from './Container';

import { panelLoadContent, panelSetActiveRecord } from '../actions/panels';
import { KEY_ENTER } from './../actions/keyboard';

class Row extends Component {
    handleClick(record) {
        this.props.dispatch(
            panelSetActiveRecord(
                this.props.side, record.get('title')
            )
        );
    }

    handleDoubleClick(record) {
        if(record.get('dir')) {
            this.props.dispatch(
                { type: KEY_ENTER }
            );
        }
    }

    render() {
        let record = this.props.record;
        let containerClassName = record.get('dir') ? this.props.className + ' dir' : this.props.className;
        containerClassName += record.get('isSelected') ? ' selected' : '';
        return (
            <Container
                className={ containerClassName }
                onClick={ () => { this.handleClick(record) }}
                onDblClick={ () => { this.handleDoubleClick(record) }}
            >
                <div className="column_title">
                    { record.get('title') }
                </div>
                <div className="column_size">
                    { record.get('size') }
                </div>
            </Container>
        );
    }
}

export default connect( (state) => ({}) )(Row);