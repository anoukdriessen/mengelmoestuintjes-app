import './styles/Button.css';
import {MdOutlineLogin, MdPersonPin} from "react-icons/md";
import {Link} from "react-router-dom";

import { getAllPages } from '../assets/data'
const pages = getAllPages();

function handleAction( { action, checkValue } ){
    // doe niets als action = 'user-login' || 'is-member'
        // user is not logged in, gebruiker gaat naar /registeren-en-login
        // user is logged in, gebruiker gaat naar /profile
}

function LoginAction() {
    return <Link to={pages[7].url}><MdOutlineLogin
        className = 'user-action login'
    /></Link>
}
function ProfileAction() {
    return <Link to={pages[8].url}><MdPersonPin
        className = 'user-action profile'
    /></Link>
}

function Action( { action, checkValue, showProfile } ) {
    // check if user is logged in (header action)
    if (action === 'user-login') {
        if (!checkValue) {
            return <LoginAction />;
        } else {
            if (showProfile) {
                return <ProfileAction/>;
            }
            return '';
        }
    }
    // check if user is a member (call to action)
    if (action === 'is-member') {
        if (!checkValue) {
            return <span className='lid-worden'>wordt lid</span>
        } else {
            return <span className='go-to-profile'>ga naar mijn profiel</span>
        }
    }

    return '';
}

function Button( { classStyle, type, action, checkValue, showProfile } ) {
    return <button
            className = { classStyle }
            type = { type }
            onClick={() => handleAction({ action, checkValue } )}
    >
        <Action
            action = { action }
            checkValue = { checkValue }
            showProfile = { showProfile }
        />
    </button>
}

export default Button;