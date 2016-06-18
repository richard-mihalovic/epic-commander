import React from 'react';

import Container from './Container';
import Panel from './Panel';

export default class Window extends React.Component {
    render() {
        return (
            <Container className="window">
                <Panel side="left" />
                <Container className="panel-separator" />
                <Panel side="right" />
            </Container>
        )
    }
}