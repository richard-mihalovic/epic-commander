import { h, Component } from 'preact';
import { Provider } from 'preact-redux';

import createStore from '../stores/store';

import AddressBar from './AddressBar';
import BottomBar from './BottomBar';
import BottomMenu from './BottomMenu';
import Container from './Container';
import Modal from './Modal';
import Window from './Window';

import { keyPress } from '../actions/keyboard';

let store = createStore();

document.addEventListener('keydown', (e) => {
    let isModalActive = store.getState().getIn(['data', 'action']) !== 'browse';
    store.dispatch(keyPress(e, isModalActive)); 
});

export default class App extends Component {
    render() {
        return (
            <Provider store={ store }>
                <Container className="container">
                    <AddressBar />
                    <Window />
                    <BottomBar />
                    <BottomMenu />
                    <Modal />
                </Container>
            </Provider>
        );
    }
}
