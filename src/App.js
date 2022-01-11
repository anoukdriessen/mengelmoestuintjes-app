import React, {useState} from 'react';

// all pages
import Home from './pages/Home';
import Info from './pages/Info';
import PlantDB from './pages/PlantDB';
import RegisterLogin from './pages/RegisterLogin';
import Profile from './pages/Profile';

// routing
import {
    Switch,
    Route,
} from 'react-router-dom';


// data
import { getAllPages } from './assets/data'

function App() {
    const pages = getAllPages();     // lijst met alle pagina's
    const today = new Date();        // de datum van vandaag

    const [ isUserLoggedIn, setUserLoggedIn ] = useState(false);
    const [ isMod, setUserIsMod ] = useState(false);

    return (
            <Switch>
                <Route exact path={pages[0].url}>
                    <Home
                        isLoggedIn = { isUserLoggedIn }
                        isMod = { isMod }
                    />
                </Route>
                <Route path={pages[1].url}>
                    <Info
                        isLoggedIn = { isUserLoggedIn }
                        isMod = { isMod }
                    />
                </Route>
                <Route path={pages[2].url}>
                    <PlantDB
                        isLoggedIn = { isUserLoggedIn }
                        isMod = { isMod }
                    />
                </Route>
                <Route path={pages[3].url}>
                    <RegisterLogin
                        isLoggedIn = { isUserLoggedIn }
                        isMod = { isMod }
                    />
                </Route>
                <Route path={pages[4].url}>
                    <Profile
                        isLoggedIn = { isUserLoggedIn }
                        isMod = { isMod }
                    />
                </Route>
            </Switch>
    );
}

export default App;