import React from 'react';
import './styles/ComponentsStyling.css';
import {
    Switch,
    Route,
} from 'react-router-dom';
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import SingleGarden from "./pages/Gardens/SingleGarden";
import TermsAndPrivacy from "./pages/TermsAndPrivacy";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import SinglePost from "./pages/Posts/SinglePost";
import Posts from "./pages/Posts/Posts";
import Gardens from "./pages/Gardens/Gardens";
import Plants from "./pages/Plants/Plants";
import {SinglePlant} from "./pages/Plants/SinglePlant";

function App() {
    // const { auth } = useContext(AuthDataContext)
    // console.log('in app', auth)
    return <>
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

            <Route path={'/dashboard'}>
                <Dashboard/>
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
    </>;
}

export default App;