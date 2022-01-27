import './style/forms.css'
import {Link} from "react-router-dom";
import {useState} from "react";
import {FiEdit, FiLock, FiUpload, FiUserCheck, GiInvisible, GiSave, GiStabbedNote} from "react-icons/all";
import {FiEye, FiEyeOff, FiMail, FiSend, FiUser} from "react-icons/fi";
import {GiNotebook} from "react-icons/gi";

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

export function Username({iconSize, username, onChange}) {
    return <InputFieldWithIcon icon={<FiUser size={iconSize}/>}>
        <input
            id='username'
            type='text'
            value={username}
            placeholder={'Gebruikersnaam'}
            onChange={onChange}
            autoComplete='off'
            required
        />
    </InputFieldWithIcon>
}

export function Mail({iconSize, email, onChange}) {
    return <InputFieldWithIcon icon = {<FiMail size={iconSize} />}>
        <input
            id='email'
            type='email'
            value={email}
            placeholder={'Email'}
            onChange={onChange}
            autoComplete='off'
            required
        />
    </InputFieldWithIcon>
}

export function Password({iconSize, showPassword, password, onChange, setShowPassword}) {
    return <InputFieldWithIcon icon={<FiLock size={iconSize}/>}>
        <input
            id='password'
            type={showPassword ? 'text' : 'password'}
            value={password}
            placeholder={'Wachtwoord'}
            onChange={onChange}
            autoComplete='off'
            required
        />
        <span className='link show-hide' onClick={() => {
            setShowPassword((prevState) => !prevState)
        }}>
            {showPassword ? (<FiEye size={iconSize}/>) : (<FiEyeOff size={iconSize}/>)}
        </span>
    </InputFieldWithIcon>
}

export function DetailsInput({iconSize, inputId, type, value, placeholder, onChange, info, isrequired}){
    return <div className='details'>
        <InputFieldWithIcon icon = {<FiUserCheck size={iconSize} />}>
            <input
                id={inputId}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                autoComplete='off'
                required={isrequired}
            />
        </InputFieldWithIcon>
        <p>{info}</p>
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

export function PostCategory({type, handleChange}) {
    return <div>
        { type === 'NOTE' ? <GiStabbedNote/> : <GiNotebook/> }
        <select id='category' name='category' onChange={handleChange}>
            <option value='POST'>Bericht</option>
            <option value='NOTE'>Notitie</option>
        </select>
    </div>
}
export function PostVisibility({isPrivate, handleChange}) {
    console.log('isPrivate', isPrivate)
    return <div>
        { isPrivate ? <GiInvisible/> : <FiUpload/> }
        <select id='published' name='published' onChange={handleChange}>
            <option value='private'>Privé</option>
            <option value='public'>Openbaar</option>
        </select>
    </div>
}

export function SubmitBtn({update, children}) {
    return <button type='submit' className='btn submit-save'>
        {update ? <FiEdit size={20}/> : <GiSave size={20}/>}        {children}
    </button>
}
