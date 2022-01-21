import {FiMenu, FiUser, FiX} from 'react-icons/fi'
import React, {useContext, useState} from "react";
import AuthContextProvider, {AuthDataContext} from "../../context/AuthDataContext";
import {NavLink} from "react-router-dom";
import {GiBookshelf, GiMushroomHouse, GiNotebook, GiWoodenSign} from "react-icons/gi";
import ListDataContext from "../../context/ListDataContext";



function NavLinks() {
    const {auth, logout} = useContext(AuthDataContext)
    const loggedIn = auth.isAuth;

    const pages = [
        { title: 'Home', icon: <GiMushroomHouse/>, link: '/' },
        { title: 'Profiel', icon: <FiUser/>, link: `/profiel/${auth.user.username}` },
        { title: 'Tuintjes', icon: <GiWoodenSign/>, link: '/profiel/tuintjes' },
        { title: 'Academy', icon: <GiBookshelf/>, link: '/academy' },
        { title: 'Blog', icon: <GiNotebook/>, link: '/blog' },
    ]
    const privatePages = [
        { title: 'Dashboard', icon: <GiMushroomHouse/>, link: '/home' },
    ]

    return <nav>
        <ul id='primary-nav'>
            {
                pages.map((page) => {
                    if (page.link === '/') {
                        return <li key={page.title}>
                            <NavLink activeClassName='active'  id={page.link} exact to={page.link}>
                                <span className='nav-icon'>{page.icon}</span>{page.title}
                            </NavLink>
                        </li>
                    } else if (page.title === 'Profiel') {
                        if (auth.isAuth) {
                            return <li key={page.title}>
                                <NavLink activeClassName='active'  id={page.link} exact to={page.link}>
                                    <span className='nav-icon'>{page.icon}</span>{page.title}
                                </NavLink>
                            </li>
                        }
                    } else {
                        return <li key={page.title}>
                            <NavLink activeClassName='active' id={page.link} to={page.link}>
                                <span className='nav-icon'>{page.icon}</span> {page.title}
                            </NavLink>
                        </li>
                    }
                })
            }
        </ul>

        <img src='https://images.unsplash.com/photo-1603729336521-9bff55419157?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' alt='bord in community garden'/>

        {loggedIn ? <ul id='secondary-nav'>
            <li>
                <NavLink activeClassName='active' to={`/`} onClick={logout}>Uitloggen</NavLink></li>
        </ul> : <ul id='secondary-nav'>
            <li>
                <NavLink activeClassName='active' to={'/login'}>Inloggen</NavLink>
                <NavLink activeClassName='active' to={'/registreren'}>Registreren</NavLink>
            </li>
        </ul>}
    </nav>
}

function ProfileLink(){
    const {auth} = useContext(AuthDataContext)
    const isLoggedIn = auth.isAuth;
    return <NavLink to={isLoggedIn ? `/profiel/${auth.user.username}` : `/login`}><FiUser id='profile'/></NavLink>
}

function Navigation({pageTitle}) {
    const [showMenu, toggleShowMenu] = useState(false);

    const menuBtn = (
        <span onClick={() => { toggleShowMenu((prevState) => !prevState)}}>
            { showMenu ? <FiX id='menu'/> : <FiMenu id='menu'/>}
        </span>
    )

    if (showMenu) {
        if (document.getElementById('post-cards') !== null) {
            document.getElementById('post-cards').style.zIndex = "-1";
        }
    } else {
        if (document.getElementById('post-cards') !== null) {
            document.getElementById('post-cards').style.zIndex = "0";
        }
    }
    return <>
        <AuthContextProvider>
        {
            <div id='page-navigation'>
                    {menuBtn}
                    { showMenu && (
                        <div className='overlay-content'>
                                <NavLinks/>
                        </div>
                    )}
            </div>
        }
            <h1 id='page-title'>{pageTitle}</h1>
            <ProfileLink/>
        </AuthContextProvider>
    </>
}

function PageHeader({title}) {
    return <div id='page-header'>
        <Navigation
            pageTitle = {title}
        />

    </div>
}

export default PageHeader;