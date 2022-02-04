import React, {useContext} from 'react';
import './components/style/ComponentsStyling.css';
import {
    Switch,
    Route,
} from 'react-router-dom';

import Home from "./pages/Home";
import SignUp from "./pages/Static/SignUp";
import SignIn from "./pages/Static/SignIn";
import SingleGarden from "./pages/Gardens/SingleGarden";
import TermsAndPrivacy from "./pages/Static/TermsAndPrivacy";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Static/Dashboard";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Static/Contact";
import SinglePost from "./pages/Posts/SinglePost";
import Posts from "./pages/Posts/Posts";
import Gardens from "./pages/Gardens/Gardens";
import Plants from "./pages/Plants/Plants";

import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

import {AuthDataContext} from "./context/AuthDataContext";
import {SinglePlant} from "./pages/Plants/SinglePlant";
import Toaster from "./components/Toaster";

function App() {
    const { auth } = useContext(AuthDataContext)
    // console.log('in app', auth)
    return <>
        <Toaster/>

        <Switch>
            <Route exact path={'/'}>
                <Home/>
            </Route>

            <Route path={'/blog'}>
                <Posts/>
            </Route>

            <Route path={'/berichten/:id'}>
                <SinglePost/>
            </Route>

            <Route path={'/login'}>
                <SignIn/>
            </Route>

            <Route path={'/registreren'}>
                <SignUp/>
            </Route>

            <Route path={'/profiel/:id'}>
                <Profile/>
            </Route>

            <Route path={'/dashboard'}>
                <Dashboard/>
            </Route>

            <Route path={'/tuintjes'}>
                <Gardens/>
            </Route>

            <Route path={'/tuintje/:gardenid'}>
                <SingleGarden/>
            </Route>

            <Route path={'/planten'}>
                <Plants/>
            </Route>

            <Route path={'/plant/:id'}>
                <SinglePlant/>
            </Route>

            <Route path='/terms-and-privacy'>
                <TermsAndPrivacy />
            </Route>

            <Route path='/contact'>
                <Contact />
            </Route>

            <Route path='/404'><NotFound/></Route>
            <Route path='/*'><NotFound/></Route>
        </Switch>


        <ToastContainer/>
    </>;
}

export default App;