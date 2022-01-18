import React, {useState} from 'react';
import './components/ComponentsStyling.css';
// routing
import {
    Switch,
    Route,
} from 'react-router-dom';

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Garden from "./pages/Garden";
import Mengelmoes from "./pages/Mengelmoes";
import TermsAndPrivacy from "./pages/TermsAndPrivacy";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Contact from "./pages/Contact";

function App() {
    return <>
        <Route exact path={'/'}>
                    <Home
                        title = "Mengelmoestuintjes"
                        page = {'/'}
                    />
                </Route>
                <Route path={'/registreren'}>
                    <SignUp
                        title = "in 4 stappen jouw tuintje"
                        page={'/registreren'}
                    />
                </Route>
                <Route path={'/login'}>
                    <SignIn
                        title = "SignIn"
                        page={'/login'}
                    />
                </Route>
                <Route path={'profiel/tuintje/:id'}>
                    <Garden
                        title="Naam van tuintje"
                        page = {'/tuintje'}
                    />
                </Route>
                <Route path={'/profiel/:id'}>
                    <Profile
                        title="Naam van gebruiker"
                        page = {'/profiel'}
                    />
                </Route>
                <Route path={'profiel/dashboard'}>
                    <Dashboard
                        title="Naam van gebruiker"
                        page = {'/profiel'}
                    />
                </Route>
                <Route path={'/mengelmoes'}>
                    <Mengelmoes/>
                </Route>
                <Route path='/terms-and-privacy'>
                    <TermsAndPrivacy />
                </Route>
                <Route path='/terms-and-privacy'>
                    <Contact />
                </Route>
                <Route path='/404'>
                    <NotFound/>
                </Route>
        <ToastContainer/>
    </>;
}

export default App;