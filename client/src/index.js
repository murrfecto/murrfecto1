import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Modal from "react-modal";
import {Provider} from "react-redux";
import {store} from './store/index'

Modal.setAppElement('#root');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);

