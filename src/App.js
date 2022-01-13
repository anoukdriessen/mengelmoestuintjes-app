import React, {useState} from 'react';

// routing
import {
    Switch,
    Route,
} from 'react-router-dom';

import Home from "./pages/Home";
import Info from "./pages/Info";
import Login from "./pages/Login";



function App() {
    const [isLoggedIn, toggleIsLoggedIn] = useState(false);
    const [user, setUser] = useState({
        username: 'vivalanouk',
    });

    console.log('isloggedin =', isLoggedIn);
    console.log('my user', user);

    return (
            <Switch>
                <Route exact path={'/'}>
                    <Home
                        title = "Mengelmoestuintjes"
                        isloggedIn = {isLoggedIn}
                        user = {user}
                    />
                </Route>
                <Route path={'/registreren'}>
                    <Info
                        title = "in 4 stappen jouw tuintje"
                        isloggedIn = {isLoggedIn}
                        user = {user}
                    />
                </Route>
                <Route path={'/login'}>
                    <Login
                    />
                </Route>

            </Switch>
    );
}

export default App;