import React from 'react';
import { connect } from 'react-redux';

export default class Container extends React.Component {
    render() {
        return (
            <div
                className={this.props.className}
                onClick={ (e) => { this.props.onClick ? this.props.onClick() : () => {}; e.preventDefault(); } }
            >
                {this.props.children}
            </div>
        );
    }
}