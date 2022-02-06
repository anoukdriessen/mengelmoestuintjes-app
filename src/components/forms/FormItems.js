import './forms.css'
import {Link} from "react-router-dom";
import {useState} from "react";
import {
    FiArrowDown,
    FiArrowLeft,
    FiArrowRight, FiArrowUp, FiCalendar, FiCheck,
    FiEdit,
    FiLock,
    FiUpload,
    FiUserCheck,
    GiInvisible,
    GiSave,
    GiStabbedNote
} from "react-icons/all";
import {FiEye, FiEyeOff, FiMail, FiSend, FiType, FiUser} from "react-icons/fi";
import {GiNotebook} from "react-icons/gi";
import {SquareRootGarden} from "../../helpers/smallcontent";
import {getToday} from "../../helpers/functions";

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
            required={true}
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
    // console.log('isPrivate', isPrivate)
    return <div className={'inputField'}>
        { isPrivate ? <GiInvisible/> : <FiUpload/> }
        <select id='published' name='published' onChange={handleChange}>
            <option value='private'>Privé</option>
            <option value='public'>Openbaar</option>
        </select>
    </div>
}

export function SimpleTextField({icon, item, name, placeHolder, onChange, isRequired, max, tooLong, nameLength, onMouse}) {
    return <InputFieldWithIcon icon={icon}>
        <input
            id={name}
            type='text'
            value={item}
            placeholder={placeHolder}
            onChange={onChange}
            autoComplete='off'
            required={isRequired}
            maxLength={max}
            onMouseMove={onMouse}
            onTouchMove={onMouse}
        />
        <span className={`count-input ${tooLong ? 'error' : ''}`}>
            {tooLong && `maximaal ${nameLength} tekens bereikt`}
        </span>
    </InputFieldWithIcon>
}

export function SimpleTextArea({icon, item, name, placeHolder, onChange, isRequired, max, onMouse}) {
    return <InputFieldWithIcon icon={icon}>
        <textarea
            id={name}
            value={item}
            placeholder={placeHolder}
            onChange={onChange}
            required={isRequired}
            maxLength={max}
            onMouseMove={onMouse}
            onTouchMove={onMouse}
        />
        {/*<span className={`count-input ${tooLong ? 'error' : ''}`}>*/}
        {/*    {tooLong && `maximaal ${nameLength} tekens bereikt`}*/}
        {/*</span>*/}
    </InputFieldWithIcon>
}

export function InputXAndYField({x, y, placeHolderX, placeHolderY, onChange, isRequired, count, onMouse}) {
    const size = 15;
    return <div className='inputField numbers'>
        <div className={'numberField'}>
            <FiArrowLeft size={size}/>
            <input
                id={'x'}
                type='number'
                value={x}
                placeholder={placeHolderX}
                onChange={onChange}
                autoComplete='off'
                required={isRequired}
                onMouseMove={onMouse}
                onTouchMove={onMouse}
            />
            <FiArrowRight size={size}/>
        </div>
        <div className={'numberField'}>
            <FiArrowUp size={size}/>
            <input
                id={'y'}
                type='number'
                value={y}
                placeholder={placeHolderY}
                onChange={onChange}
                autoComplete='off'
                required={isRequired}
                onMouseMove={onMouse}
                onTouchMove={onMouse}
            />
            <FiArrowDown size={size}/>
        </div>
        <div className={'numberField'}>
        <SquareRootGarden count={count}/>
        </div>
    </div>
}

export function SimpleDateInput({value, handleChange}){
    return <InputFieldWithIcon icon={<FiCalendar/>}>
        <input
            id='deadline'
            type='date'
            value={value}
            onChange={handleChange}
            min={getToday()}
        />
    </InputFieldWithIcon>
}


export function BtnSubmit({type, message}) {
    return <button type={"submit"} className='btn btn-form'>
        { type === 'save' && <GiSave/>}
        { type === 'send' && <FiSend/>}
        {message}
    </button>
}

export function Message({check, message}) {
    return <span className={`form-message inputField ${ check ? 'success' : ''}`}>
                { check ? <FiCheck/> : message }
    </span>
}
