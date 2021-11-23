import React from 'react';

// components

// pages
import LandingPage from "./pages/Home";

// router
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

// global styling for Application
import './App.css';

function App() {


    return (
        <Router>
            <div id='container'>
                <Switch>
                    <Route exact path="/">
                        <LandingPage />
                    </Route>
                </Switch>
            </div>
        </Router>
  );
}

export default App;

//          <Container />
/**
 *
 *               <Route path="/gaatjes">
 <CavitiesPage />
 </Route>
 <Route path="/afspraak-maken">
 <AppointmentsPage />
 </Route>
 <Route path="/tanden-bleken">
 <WhiteningPage />
 */