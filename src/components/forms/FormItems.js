import './forms.css'
import {Link} from "react-router-dom";
import {useState} from "react";
import {FiLock} from "react-icons/all";

export function Action({linkTo, linkTitle, showOnHover}){
    const [actionHovered, toggleActionHovered] = useState(false);

    return <div id='action'
         onMouseEnter={e => {toggleActionHovered(true)}}
         onMouseLeave={e => {toggleActionHovered(false)}}>
        <Link to={linkTo}>{linkTitle} <strong>{ actionHovered && showOnHover}</strong></Link>
    </div>
}

export function InputFieldWithIcon({icon, children }) {
    return <div className='inputField'>
        {icon} { children }
    </div>
}

export function SingleCheckBox({type, id, value}) {
    let termsAndPrivacy = type === 'tap';

    return <div className='inputField checkbox'>
        { termsAndPrivacy && <> <label htmlFor="tap">
            Door een account aan te maken ga je akkoord met onze <Link to='/terms-and-privacy'>Terms & Privacy</Link>,
            heb je hier vragen over neem dan <Link to='/contact'>Contact</Link> met ons op</label>
            <input type="checkbox" id={id} name="accepted" value={value} required/> </>
        }
    </div>
}
