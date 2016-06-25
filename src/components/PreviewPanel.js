import React from 'react';
import { connect } from 'react-redux';
import { findIndex } from 'lodash';

import Container from './Container';
import Row from './Row';

import { panelLoadContent } from '../actions/panels';

import FileUtils from '../utils/FileUtils';

class PreviewPanel extends React.Component {
    componentDidMount() {
    }

    render() {
        const side = this.props.activePanel;
        const previewPath = this.props.panels.getIn([side, 'activePath']);
        const previewRecord = this.props.panels.getIn([side, 'activeRecord']);
        const previewFullPath = previewPath + FileUtils.separator() + previewRecord;
        const previewIsDir = FileUtils.isDirectory(previewFullPath);

        return (
            <Container className="preview_panel">
                { previewIsDir ? 
                    <div className="no_preview_available">No preview available.</div> 
                    : 
                    this.previewImage(previewFullPath) 
                }
            </Container>
        )
    }

    previewImage(filename) {
        if(/\.(jpe?g|png|gif|bmp)$/i.test(filename)) {
            return (
                <img style={{ maxWidth: '100%' }} src={ 'file://' + filename } />
            )
        }
    }
}

export default connect(
    (state) => ({
        activePanel: state.get('data').get('activePanel'),
        previewPanel: state.get('data').get('previewPanel'),
        panels: state.get('data').get('panels')
    })
)(PreviewPanel);