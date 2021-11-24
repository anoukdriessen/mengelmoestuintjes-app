import React from 'react';
import './App.css';

// pages
import Home from './pages/Home';
import About from './pages/About';
import RegisterLogin from './pages/RegisterLogin';
import Profile from './pages/Profile';

// routing
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

function App() {
    // lijst met alle pagina's
    const pages = ['home', 'about-us'];

    // de datum van vandaag
    const today = new Date();

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home
                        current = { pages[0] }
                        nextPage = { pages[1] }
                        today = { today }
                        isLoggedIn = { true }
                    />
                </Route>

                <Route path="/about-us">
                    <About />
                </Route>

                <Route path="/register-and-login">
                    <RegisterLogin />
                </Route>

                <Route path="/profile">
                    <Profile />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;