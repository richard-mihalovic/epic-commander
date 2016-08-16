import { h, Component } from 'preact';

export default class Container extends Component {
    render() {
        let hasFocus = this.props.hasFocus;

        return (
            hasFocus ? 
            <div { ...this.props } tabIndex="-1" >{ this.props.children }</div> 
            : 
            <div { ...this.props }>{ this.props.children }</div>
        ); 
    }
}