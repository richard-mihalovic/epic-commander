import { h, Component } from 'preact';

export default class Container extends Component {
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