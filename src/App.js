import React, {useState} from 'react';

// routing
import {
    Switch,
    Route,
} from 'react-router-dom';

import Home from "./pages/Home";

function App() {

    return (
            <Switch>
                <Route exact path={'/'}>
                    <Home
                        title = "Mengelmoestuintjes"
                        loggedIn = {true}
                        user = "vivalanouk"
                    />
                </Route>

            </Switch>
    );
}

export default App;