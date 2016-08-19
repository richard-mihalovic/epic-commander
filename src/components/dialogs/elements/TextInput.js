import { h, Component } from 'preact';

export default class TextInput extends Component {
    constructor(props) {
        super(props);

        this.inputElement = undefined;
    }

    render() {
        return (<input ref={ element => this.inputElement = element } className="text_input" { ...this.props } /> );
    }

    getInputElement() {
        return this.inputElement;
    }

    getText() {
        return this.inputElement.value;
    }
}