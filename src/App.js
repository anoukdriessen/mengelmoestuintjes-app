import React, {useState} from 'react';

// all pages
import Home from './pages/Home';
import Info from './pages/Info';
import PlantDB from './pages/PlantDB';
import RegisterLogin from './pages/RegisterLogin';
import Profile from './pages/Profile';

// routing
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

// data
import { getAllPages } from './assets/data'

function App() {
    const pages = getAllPages();     // lijst met alle pagina's
    const today = new Date();        // de datum van vandaag

    const [ isUserLoggedIn, setUserLoggedIn ] = useState(false);

    return (
        <Router>
            <Switch>
                <Route exact path={pages[0].url}>
                    <Home
                        page = { pages[0] }
                        date = { today }
                        isLoggedIn = { isUserLoggedIn }
                        setLogin = { setUserLoggedIn }
                    />
                </Route>
                <Route path={pages[1].url}>
                    <Info
                        prevPage = { pages[0] }
                        current = { pages[1] }
                        nextPage = { pages[2] }
                        today = { today }
                        isLoggedIn = { isUserLoggedIn }
                    />
                </Route>
                <Route path={pages[2].url}>
                    <PlantDB
                        prevPage = { pages[1] }
                        current = { pages[2] }
                        nextPage = { pages[1] }
                    />
                </Route>
                <Route path={pages[3].url}>
                    <RegisterLogin
                        prevPage = { pages[0] }
                        current = { pages[3] }
                        nextPage = { pages[0] }
                        isLoggedIn = { isUserLoggedIn }
                    />
                </Route>

                <Route path={pages[4].url}>
                    <Profile />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;