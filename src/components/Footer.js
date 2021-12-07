// import styling
import './styles/Footer.css';
import { NavLink } from "react-router-dom";
import { getAllPages } from "../assets/data";

import { MdLogout as Logout } from "react-icons/md";

function NavItem({ linkTo, icon }) {
    return <li><NavLink to={linkTo}>{icon}</NavLink></li>
}
function NavItemNotLoggedIn({ isLoggedIn, linkTo, icon }){
    return <>
        {!isLoggedIn && <li><NavLink to={linkTo}>{icon}</NavLink></li>}
    </>
}
function NavItemLoggedIn( { isLoggedIn, linkTo, icon } ){
    return <>
        { isLoggedIn && <li><NavLink to={linkTo}>{icon}</NavLink></li> }
    </>
}
function NavItemModerator( { isLoggedIn, isMod, linkTo, icon}){
    return <>
        { isLoggedIn && isMod && <li><NavLink to={linkTo}>{icon}</NavLink></li> }
    </>
}

function BottomNavigation(props) {
    const pages = getAllPages();
    // check if user is loggedin
    let isLoggedIn = props.isLoggedIn;
    // check if user is moderator
    let isMod = props.isMod;

    return <nav>
        <div className='menu-toggle'>
            <input type='checkbox' id='toggle'/>
            <label htmlFor="toggle">
                <span className="hamburger-menu">
                    <span className="hamburger-bar" id='active'/>
                </span>
            </label>

            <ul>
                <NavItemNotLoggedIn
                    isLoggedIn = { isLoggedIn }
                    linkTo = { pages[7].url }
                    icon = { pages[7].icon }
                />
                <NavItemLoggedIn
                    isLoggedIn = { isLoggedIn }
                    linkTo = { pages[0].url }
                    icon = { <Logout/> }
                />
                <NavItem
                    linkTo = { pages[0].url }
                    icon = { pages[0].icon }
                />
                <NavItem
                    linkTo = { pages[2].url }
                    icon = { pages[2].icon }
                />
                <NavItemLoggedIn
                    isLoggedIn = { isLoggedIn }
                    linkTo = { pages[8].url }
                    icon = { pages[8].icon }
                />
                <NavItemLoggedIn
                    isLoggedIn = { isLoggedIn }
                    linkTo = { pages[9].url }
                    icon = { pages[9].icon }
                />
                <NavItemLoggedIn
                    isLoggedIn = { isLoggedIn }
                    linkTo = { pages[10].url }
                    icon = { pages[10].icon }
                />
                <NavItemLoggedIn
                    isLoggedIn = { isLoggedIn }
                    linkTo = { pages[12].url }
                    icon = { pages[12].icon }
                />
                <NavItemModerator
                    isLoggedIn = { isLoggedIn }
                    isMod = { isMod }
                    linkTo = { pages[6].url }
                    icon = { pages[6].icon }
                />
            </ul>
        </div>
    </nav>
}

function Footer( { page, year, isLoggedIn, isMod } ) {

    return <div id="footer" className={ page.className }>
        <BottomNavigation
            isLoggedIn = { isLoggedIn }
            isMod = { isMod }
        />
        <span id='copyright'> © { year }, design by <a href='https://www.anoukdriessen.nl'>Anouk Driessen</a></span>
    </div>;
}

export default Footer;