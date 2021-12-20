import './styles/Footer.css';
import { NavLink } from "react-router-dom";
import { getAllPages } from "../assets/data";
import { MdLogout as Logout } from "react-icons/md";


function NavItem( props ) {
    const linkTo = props.url;
    const icon = props.icon;

    // nav item to show when user is not loggedIn
    if (!props.isLoggedIn) {
        return <li><NavLink to={linkTo}>{icon}</NavLink></li>
        // return <> { !props.isLoggedIn && <li><NavLink to={linkTo}>{icon}</NavLink></li> } </>

    }
    // nav item to show when user is loggedIn
    if (props.isLoggedIn) {
        return <li><NavLink to={linkTo}>{icon}</NavLink></li>
        // return <> { props.isLoggedIn && <li><NavLink to={linkTo}>{icon}</NavLink></li> } </>
    }

    // nav item to show when user is moderator
    if (props.isLoggedIn && props.isMod) {
        return <li><NavLink to={linkTo}>{icon}</NavLink></li>
        // return <> { props.isLoggedIn && props.isMod && <li><NavLink to={linkTo}>{icon}</NavLink></li> } </>
    }

    // normal nav item
    return <li><NavLink to={linkTo}>{icon}</NavLink></li>
}

function BottomNavigation(props) {
    const pages = getAllPages();

    let isLoggedIn = props.isLoggedIn;     // check if user is loggedIn
    let isMod = props.isMod;               // check if user is moderator

    // url / icon / check login / check mod
    const navItems = [
        [ pages[7].url, pages[7].icon, isLoggedIn ],
        [ pages[0].url, <Logout/>, isLoggedIn ],
        [ pages[0].url, pages[0].icon,],
        [ pages[2].url, pages[2].icon,],
        [ pages[8].url, pages[8].icon,  isLoggedIn ],
        [ pages[9].url, pages[9].icon,  isLoggedIn ],
        [ pages[10].url, pages[10].icon, isLoggedIn ],
        [ pages[12].url, pages[12].icon, isLoggedIn ],
        [ pages[6].url, pages[6].icon,  isLoggedIn, isMod ],
    ];

    return <nav>
        <div className='menu-toggle'>
            <input type='checkbox' id='toggle'/>
            <label htmlFor="toggle">
                <span className="hamburger-menu">
                    <span className="hamburger-bar" id='active'/>
                </span>
            </label>

            <ul>
                { navItems.map( ( item, key ) => {
                    return <NavItem
                        id = { key }
                        url = { item.slice(0,1)[0] }
                        icon = { item.slice(1,2)[0] }
                        isLoggedIn = { item.slice(2,3)[0] }
                        isMod = { item.slice(3,4)[0] }
                    />;
                })}
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
        <span id='copyright'>
            © { year }, design by
            <a href='https://www.anoukdriessen.nl'>
                Anouk Driessen
            </a>
        </span>
    </div>;
}

export default Footer;