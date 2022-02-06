import {FiLogOut, FiMenu, FiTrello, FiUser, FiX} from 'react-icons/fi'
import React, {useContext, useState} from "react";
import AuthContextProvider, {AuthDataContext} from "../../context/AuthDataContext";
import {NavLink} from "react-router-dom";
import {GiBookshelf, GiDatabase, GiGraveFlowers, GiMushroomHouse, GiNotebook, GiWoodenSign} from "react-icons/gi";
import ListDataContext from "../../context/ListDataContext";
import {GiButterflyFlower, GiFlowerPot} from "react-icons/all";

export function MyNavLink(isExact, title, link, icon) {
    if(isExact) {
        return <li key={title}>
            <NavLink activeClassName='active'  id={link} exact to={link}>
                <span className='nav-icon'>{icon}</span>{title}
            </NavLink>
        </li>
    }
    return <li key={title}>
        <NavLink activeClassName='active'  id={link} exact to={link}>
            <span className='nav-icon'>{icon}</span>{title}
        </NavLink>
    </li>
}

function NavLinks() {
    const {auth, hasUserRole, logout} = useContext(AuthDataContext)
    const loggedIn = auth.isAuth;

    let pages = [
        { title: 'Home', icon: <GiMushroomHouse/>, link: '/' },
        { title: 'Planten', icon: <GiButterflyFlower/>, link: '/planten' },
        { title: 'Blog', icon: <GiNotebook/>, link: '/blog' },
    ]

    if (loggedIn) {
        pages = [...pages,
            { title: 'Profiel', icon: <FiUser/>, link: `/profiel/${auth.user.username}` },
            { title: 'Tuintjes', icon: <GiWoodenSign/>, link: '/tuintjes' }
        ]
    }

    if (hasUserRole("ROLE_MODERATOR")) {
        pages = [...pages,
            { title: 'Dashboard', icon: <FiTrello/>, link: '/dashboard' },
            { title: 'Academy', icon: <GiBookshelf/>, link: '/academy' },
        ]
    }

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
            {loggedIn ? <ul id='secondary-nav'>
                <li>
                    <NavLink activeClassName='active' to={`/`} onClick={logout}>Uitloggen</NavLink></li>
            </ul> : <ul id='secondary-nav'>
                <li>
                    <NavLink activeClassName='active' to={'/login'}>Inloggen</NavLink>
                    <NavLink activeClassName='active' to={'/registreren'}>Registreren</NavLink>
                </li>
            </ul>}
        </ul>
    </nav>
}

function ProfileLink(){
    const {auth} = useContext(AuthDataContext)
    const isLoggedIn = auth.isAuth;
    return <NavLink className='link' to={isLoggedIn ? `/profiel/${auth.user.username}` : `/login`}><FiUser className='link' id='profile'/></NavLink>
}

function Navigation({pageTitle}) {
    const [showMenu, toggleShowMenu] = useState(false);

    const menuBtn = (
        <span className='link' onClick={() => { toggleShowMenu((prevState) => !prevState)}}>
            { showMenu ? <FiX className='link' id='menu'/> : <FiMenu className='link' id='menu'/>}
        </span>
    )

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