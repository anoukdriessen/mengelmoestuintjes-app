import './styles/Footer.css';
import { NavLink } from "react-router-dom";
import { getAllPages } from "../../assets/data";
import { MdLogout as Logout } from "react-icons/md";
import {useState} from "react";


function NavItem( props ) {
    const linkTo = props.url;
    const icon = props.icon;

    if (props.condition) {
        return <li>
            <NavLink to={linkTo}>
            <span className='nav-icon'>
                <span className='nav-icon'>
                    {icon}
                </span>
            </span>
            </NavLink>
        </li>;
    }
    return <></>
}

function BottomNavigation(props) {
    const pages = getAllPages();

    let isLoggedIn = props.isLoggedIn;     // check if user is loggedIn
    let isMod = props.isMod;               // check if user is moderator

    const navItems = [
        { "url": pages[7].url, "icon": pages[7].icon,   "condition": !isLoggedIn,           "title": "Login" },
        { "url": pages[0].url, "icon": <Logout/>,       "condition": isLoggedIn,            "title": "Logout" },
        { "url": pages[0].url, "icon": pages[0].icon,   "condition": true,                  "title": "Home" },
        { "url": pages[2].url, "icon": pages[2].icon,   "condition": true,                  "title": "Database"  },
        {"url": pages[8].url, "icon": pages[8].icon,    "condition": isLoggedIn,            "title": "Profiel" },
        { "url": pages[6].url, "icon": pages[6].icon,   "condition": isLoggedIn && isMod,   "title": "Dashboard" },
        { "url": pages[12].url, "icon": pages[12].icon, "condition": isLoggedIn,            "title": "Favorieten" },
    ]

    return <nav>
        <input type='checkbox' id='toggle'/>
        <label htmlFor="toggle">
            <span className='hamburger'>
                <span className='hamburger-bar' id='active'/>
            </span>
        </label>
        <ul id='menu'>
            { navItems.map( (item, key) => {
                return <NavItem key = { key }
                    url = { item.url }
                    icon = { item.icon }
                    isLoggedIn = { isLoggedIn }
                    isMod = { isMod }
                    condition = { item.condition }
                    title = { item.title }
                />
            })}
        </ul>
    </nav>
}


function Footer( props ) {
    return <footer>
        <BottomNavigation
            isLoggedIn = { props.isLoggedIn }
            isMod = { props.isMod }
        />
    </footer>;
}

export default Footer;