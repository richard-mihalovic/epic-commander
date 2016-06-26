import { h, Component } from 'preact';
import { Provider } from 'preact-redux';

import createStore from '../stores/store';

import Container from './Container';
import Window from './Window';

import { keyPress } from '../actions/keyboard';

let store = createStore();

document.addEventListener('keydown', (e) => { store.dispatch(keyPress(e)); });

export default class App extends Component {    
    render() {
        return (
            <Provider store={ store }>
                <Container className="container">
                    <Window />
                </Container>
            </Provider>
        )
    }
}