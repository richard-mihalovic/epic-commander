import React from 'react';
import { connect } from 'react-redux';
import { findIndex } from 'lodash';

import Container from './Container';
import Row from './Row';

import { panelLoadContent } from '../actions/panels';

class Panel extends React.Component {
    componentDidMount() {
        const side = this.props.side;
        this.props.dispatch(
            panelLoadContent(side, this.props.panels.getIn([side, 'activePath']))
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
        let panel = this.props.side;
        let records = this.props.panels.get(panel).get('records');
        let isPanelActive = this.props.activePanel === panel ? true : false;

        let panelClassName = 'panel panel_' + panel;

        if (this.props.zoomedPanel === '' || this.props.zoomedPanel === panel) {
            return (
                <Container className={ panelClassName }>
                    {
                        records.map((record) => {
                            let isActive = record.get('isSelected');
                            let className = 'row';

                            if (isPanelActive && isActive) {
                                className += ' row-is-active';
                            } else if (!isPanelActive && isActive) {
                                className += ' row-is-inactive';
                            }

                            return (
                                <Row key={this.props.side + record.get('key') } className={className} side={panel} record={record} />
                            );
                        })
                    }
                </Container>
            );
        } else {
            return null;
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        let side = this.props.side;

        let oldZoomedPanel = this.props.zoomedPanel;
        let zoomedPanel = nextProps.zoomedPanel;
        if (oldZoomedPanel !== zoomedPanel) return true;

        let oldSettingShowHiddenFiles = this.props.panels.getIn(['side', 'settings', 'showHiddenFiles']);
        let settingShowHiddenFiles = nextProps.panels.getIn(['side', 'settings', 'showHiddenFiles']);
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