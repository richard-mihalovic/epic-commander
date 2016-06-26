import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { findIndex } from 'lodash';

import Container from './Container';
import Row from './Row';

import { panelLoadContent } from '../actions/panels';

class Panel extends Component {
    componentDidMount() {
        const side = this.props.side;
        const path = this.props.panels.getIn([side, 'activePath']);
        this.props.dispatch(
            panelLoadContent(side, path)
        );
    }

    componentDidUpdate() {
        if (this.props.activePanel !== this.props.side) return;

        let activePanelClass = '.panel_' + this.props.side;
        let activeRecordClass = '.panel_' + this.props.side + ' > .row-is-active';

        const activePanel = document.querySelector(activePanelClass);
        const activePanelHeight = activePanel.clientHeight;

        const activeElement = document.querySelector(activeRecordClass);
        const activeElementOffset = activeElement.offsetTop;
        const activeElementHeight = activeElement.clientHeight;
        const scrollbarOffset = activePanel.scrollTop;

        if (activeElementOffset - (activeElementHeight + 10) < scrollbarOffset) {
            activeElement.scrollIntoView(true);
        } else if (activeElementOffset > scrollbarOffset + activePanelHeight) {
            activeElement.scrollIntoView(false);
        }
    }

    render() {
        let side = this.props.side;
        let records = this.props.panels.get(side).get('records');
        let isPanelActive = this.props.activePanel === side ? true : false;

        let panelClassName = 'panel panel_' + side;

        if (this.props.zoomedPanel === '' || this.props.zoomedPanel === side) {
            return (
                <Container className={ panelClassName }>
                    { this.renderRows(records, side, isPanelActive) }
                </Container>
            );
        } else {
            return null;
        }
    }

    renderRows(records, side, isPanelActive) {
        let output = [];
        
        for(let record of records) {
            let isActive = record.get('isSelected');
            let className = 'row';

            if (isPanelActive && isActive) {
                className += ' row-is-active';
            } else if (!isPanelActive && isActive) {
                className += ' row-is-inactive';
            }

            output.push(
                <Row key={this.props.side + record.get('key') } className={className} side={side} record={record} />
            );
        }

        return output;
    }

    shouldComponentUpdate(nextProps, nextState) {
        let side = this.props.side;

        let oldZoomedPanel = this.props.zoomedPanel;
        let zoomedPanel = nextProps.zoomedPanel;
        if (oldZoomedPanel !== zoomedPanel) return true;

        let oldSettingShowHiddenFiles = this.props.panels.getIn([side, 'settings', 'showHiddenFiles']);
        let settingShowHiddenFiles = nextProps.panels.getIn([side, 'settings', 'showHiddenFiles']);
        if (oldSettingShowHiddenFiles !== settingShowHiddenFiles) return true;

        let oldActivePanel = this.props.activePanel;
        let activePanel = nextProps.activePanel;
        if (oldActivePanel !== activePanel) return true;

        let oldActiveRecord = this.props.panels.getIn([side, 'activeRecord']);
        let activeRecord = nextProps.panels.getIn([side, 'activeRecord']);
        if (oldActivePath !== activePath) return true;

        let oldActivePath = this.props.panels.getIn([side, 'activePath']);
        let activePath = nextProps.panels.getIn([side, 'activePath']);
        if (oldActiveRecord !== activeRecord) return true;

        return false;
    }
}

export default connect(
    (state) => ({
        activePanel: state.get('data').get('activePanel'),
        zoomedPanel: state.get('data').get('zoomedPanel'),
        panels: state.get('data').get('panels')
    })
)(Panel);