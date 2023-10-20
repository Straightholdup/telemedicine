import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./store";
import ThemeContextWrapper from "./theme/ThemeWrapper";

ReactDOM.render(
  <React.StrictMode>
      <ThemeContextWrapper>
      <Provider store={store}>
          <App />
      </Provider>
      </ThemeContextWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
