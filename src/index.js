import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch} from 'react-router-dom';

// global styling
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthContextProvider from "./context/AuthDataContext";
import UserDataContextProvider from "./context/UserDataContext";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <AuthContextProvider>
                    <App />
            </AuthContextProvider>
        </Router>
    </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
