import React, {useContext, useState} from 'react';
import './components/style/ComponentsStyling.css';
// routing
import {
    Switch,
    Route, Redirect,
} from 'react-router-dom';

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import SingleGarden from "./pages/SingleGarden";
import Mengelmoes from "./pages/Mengelmoes";
import TermsAndPrivacy from "./pages/TermsAndPrivacy";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Contact from "./pages/Contact";
import {AuthDataContext} from "./context/AuthDataContext";
import SinglePost from "./pages/SinglePost";
import {UserDataContextProvider} from "./context/UserDataContext";
import Posts from "./pages/Posts";
import Gardens from "./pages/Gardens";

function App() {
    const { auth } = useContext(AuthDataContext)
    // console.log('in app', auth)
    return <>
        <Switch>
            <Route exact path={'/'}><Home/></Route>

            <Route path={'/blog'}> <Posts/> </Route>
            <Route path={'/berichten/:id'}> <SinglePost/> </Route>

            <Route path={'/profiel/:id'}> <Profile/> </Route>
            <Route path={'/dashboard'}><Dashboard page/></Route>
            <Route path={'/tuintjes'}> <Gardens/> </Route>
            <Route path={'/tuintje/:gardenid'}><SingleGarden/></Route>

            <Route path='/terms-and-privacy'><TermsAndPrivacy /></Route>
            <Route path='/contact'><Contact /></Route>

            <Route path={'/login'}><SignIn page={'/login'}/></Route>
            <Route path={'/registreren'}><SignUp page={'/registreren'}/></Route>

            <Route path='/404'><NotFound/></Route>
            <Route path='/*'><NotFound/></Route>
        </Switch>

        <ToastContainer/>
    </>;
}

export default App;