import {BsQuestionLg} from 'react-icons/bs'
import {GiMushroomHouse} from 'react-icons/gi'
import {FiLogIn as Login, FiUser as User} from "react-icons/fi";
import {Link, NavLink} from "react-router-dom";
import {useState} from "react";

function MyNavLink({icon, link, className} ) {
    return <NavLink className={className} to={link} activeClassName={'active'}>
        {icon}
    </NavLink>
}

function IconNavLink( {link, size} ) {
    const [loggedIn, isLoggedIn] = useState(true);

    switch (link) {
        case '/terms-and-privacy':
            return <MyNavLink
                icon={<BsQuestionLg size={size}/>}
                link={link}>
            </MyNavLink>
        case '/':
            return <MyNavLink
                icon={<GiMushroomHouse size={size}/>}
                link={link}>
            </MyNavLink>
        case '/login':
            if (!loggedIn) {
                return <MyNavLink
                    className={'top-right'}
                    icon={<Login size={size}/>}
                    link={link}>
                </MyNavLink>
            }
            return null;
    }

    // console.log(link)
    // console.log(link.indexOf('/profile'))

    if (link.indexOf('profile') !== 1) {
        if (loggedIn) {
            return <MyNavLink
                className={'top-right'}
                icon={<User size={size}/>}
                link={link}>
            </MyNavLink>
        }
        return <></>
    }

    return <></>
}

export default IconNavLink;