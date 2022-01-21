import React, {useContext, useState} from 'react';
import './components/ComponentsStyling.css';
// routing
import {
    Switch,
    Route, Redirect,
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
import {AuthDataContext} from "./context/AuthDataContext";

function App() {
    const { auth } = useContext(AuthDataContext)
    console.log('in app', auth)
    return <>
        <Switch>

        <Route exact path={'/'}> <Home page = {'/'}/> </Route>

        <Route path={'/login'}><SignIn page={'/login'}/></Route>

        <Route path={'/registreren'}><SignUp page={'/registreren'}/></Route>

        <Route path={'profiel/tuintje/:id'}>
            <Garden page = {'/tuintje'}/>
        </Route>

        <Route path={'/profiel/:id'}>
            <Profile page = {'/profiel'}/>
        </Route>

        <Route path={'profiel/dashboard'}>
            <Dashboard page = {'/profiel'}
            />
        </Route>

        <Route path={'/mengelmoes'}><Mengelmoes/></Route>

        <Route path='/terms-and-privacy'><TermsAndPrivacy /></Route>

        <Route path='/contact'><Contact /></Route>

        <Route path='/404'><NotFound/></Route>
        <Route path='/*'><NotFound/></Route>
        </Switch>

        <ToastContainer/>
    </>;
}

export default App;