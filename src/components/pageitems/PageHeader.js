import {FiMenu, FiUser, FiX} from 'react-icons/fi'
import React, {useContext, useState} from "react";
import AuthContextProvider, {AuthDataContext} from "../../context/AuthDataContext";
import {NavLink} from "react-router-dom";
import {GiBookshelf, GiMushroomHouse, GiWoodenSign} from "react-icons/gi";

function NavLinks({button}) {
    const {auth, logout} = useContext(AuthDataContext)
    const loggedIn = auth.isAuth;

    const pages = [
        { title: 'Home', icon: <GiMushroomHouse/>, link: '/' },
        { title: 'Tuintjes', icon: <GiWoodenSign/>, link: '/profiel/tuintjes' },
        { title: 'Academy', icon: <GiBookshelf/>, link: '/academy' },
    ]
    const privatePages = [
        { title: 'Dashboard', icon: <GiMushroomHouse/>, link: '/home' },
    ]
    return <nav>
        {button}
        <ul>
            {
                pages.map((page) => {
                    return <li>
                        <NavLink key={page.link} id={page.link} to={page.link} activeClassName='active-link'>
                            {page.icon} {page.title}
                        </NavLink>
                    </li>
                })
            }
            {loggedIn ? <li>
                <NavLink to={`/`} onClick={logout}>Uitloggen</NavLink>
            </li> : <li>
                <NavLink to={'/login'}>Inloggen</NavLink>
            </li>}
        </ul>
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
    return <>
        <AuthContextProvider>
        {
            <div id='page-navigation'>
                <div className='overlay'>
                    {menuBtn}
                    { showMenu && (
                        <div className='overlay-content'>
                                <NavLinks button={menuBtn}/>
                        </div>
                    )}
                </div>
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