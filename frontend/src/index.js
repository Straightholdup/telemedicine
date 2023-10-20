import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import {Provider} from "react-redux";
import {store} from "./app/store";
import ThemeContextWrapper from "./app/theme/ThemeWrapper";

ReactDOM.render(
    <React.StrictMode>
        <ThemeContextWrapper>
            <Provider store={store}>
                <App/>
            </Provider>
        </ThemeContextWrapper>
    </React.StrictMode>,
    document.getElementById('root')
);
