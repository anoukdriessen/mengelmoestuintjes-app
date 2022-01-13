import React, {useState} from 'react';

// routing
import {
    Switch,
    Route,
} from 'react-router-dom';

import Home from "./pages/Home";
import Info from "./pages/Info";

function App() {

    return (
            <Switch>
                <Route exact path={'/'}>
                    <Home
                        title = "Mengelmoestuintjes"
                        isloggedIn = {true}
                        user = "vivalanouk"
                    />
                </Route>
                <Route exact path={'/info'}>
                    <Info
                        title = "in 4 stappen jouw tuintje"
                        isloggedIn = {true}
                        user = "vivalanouk"
                    />
                </Route>

            </Switch>
    );
}

export default App;