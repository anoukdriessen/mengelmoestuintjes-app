import './styles/BottomNav.css'
import {NavLink} from "react-router-dom";

// data
import {getAllPages} from "../assets/data";

// icons
import  {
    IoHome as HomeIcon,
    IoLeaf as AboutIcon,
} from "react-icons/io5";

const pages = getAllPages();

export function Icon( props ) {
    // if ( props.page === pages[0] ) {
    //     return <HomeIcon
    //         className = { props.className }
    //     />
    // }
    // if ( props.page === pages[1] ) {
    //     props.className += ' mirrored'
    //     return <AboutIcon
    //         className = { props.className }
    //     />
    // }
    // return 'no icon for ' + props.page.title;
    return '';
}

function BottomNav ( props ) {
    // homepage
    if (props.page === pages[0]) {
        return <nav
            id='bottom-nav'
            className='homepage-nav'
        >
            <div id="hamburger-icon" onClick='toggleMenu()'>
                <span />
                <span />
                <span />
            </div>
            {/*<input className='hamburger-menu' type='checkbox' checked="checked"/>*/}
            {/*<label htmlFor='hamburger-menu'></label>*/}
            <ul>
                <li className='nav-link'>
                    <NavLink to='/'>
                        <Icon
                            page = { props.page }
                            className = 'nav-icon'
                        />
                    </NavLink>
                </li>
            </ul>
        </nav>
    }
    return <>
        <nav id='bottom-nav'>
            <label htmlFor='hamburger-menu'>
                <input checked='checked' className='hamburger-menu' type='checkbox'/>
            </label>
            <ul>
                <NavLink to='/'>
                    <Icon
                        page = { props.page }
                        className = 'nav-icon'
                    />
                </NavLink>
            </ul>
        </nav>
    </>
}

export default BottomNav;