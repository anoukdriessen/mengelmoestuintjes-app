import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch} from 'react-router-dom';

// global styling
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <Router>
        <React.StrictMode>
            <Switch>
            <App />
            </Switch>
        </React.StrictMode>
    </Router>,
  document.getElementById('root')
);

reportWebVitals();
