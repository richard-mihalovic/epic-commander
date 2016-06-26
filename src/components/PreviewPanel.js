import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { findIndex } from 'lodash';
import showdown from 'showdown';

import Container from './Container';
import Row from './Row';

import { panelLoadContent } from '../actions/panels';

import FileUtils from '../utils/FileUtils';

class PreviewPanel extends Component {
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
                    this.preview(previewPath, previewRecord, previewFullPath)
                }
            </Container>
        )
    }

    preview(previewPath, previewRecord, previewFullPath) {
        let [wasProcessed, element] = [undefined, undefined];

        [wasProcessed, element] = this.previewImage(previewFullPath);
        if (wasProcessed) return element;

        [wasProcessed, element] = this.previewAudio(previewFullPath);
        if (wasProcessed) return element;

        [wasProcessed, element] = this.previewFile(previewFullPath);
        if (wasProcessed) return element;

        return <div className="no_preview_available">No preview available.</div>
    }

    previewImage(filename) {
        if (/\.(jpe?g|png|gif|bmp)$/i.test(filename)) {
            return [true, (
                <img style={{ maxWidth: '100%' }} src={ 'file://' + filename } />
            )];
        }

        return [false, null];
    }

    previewFile(filename) {
        if (filename.endsWith('.md')) {
            const content = FileUtils.readFile(filename);
            let converter = new showdown.Converter();
            let html = converter.makeHtml(content);
            return [ true, <p style={{ padding: '1em', color: 'white' }} dangerouslySetInnerHTML={ { __html: html } } /> ];
        } else if (/\.(txt|srt)$/i.test(filename)) {
            const content = FileUtils.readFile(filename);
            return [true, (
                <p style={{ whiteSpace: 'pre', padding: '1em', color: 'white' }}>{ content }</p>
            )];
        }

        return [false, null];
    }

    previewAudio(filename) {
        if (/\.(mp3|ogg|wav)$/i.test(filename)) {
            let mediaType = '';

            if (filename.endsWith('.mp3')) {
                mediaType = 'audio/mpeg';
            } else if (filename.endsWith('.ogg')) {
                mediaType = 'audio/ogg';
            } else if (filename.endsWith('.wav')) {
                mediaType = 'audio/wav';
            }

            return [true, (
                <audio controls>
                    <source src={ 'file://' + filename } type={mediaType} />
                </audio>
            )];
        }

        return [false, null];
    }
}

export default connect(
    (state) => ({
        activePanel: state.get('data').get('activePanel'),
        previewPanel: state.get('data').get('previewPanel'),
        panels: state.get('data').get('panels')
    })
)(PreviewPanel);