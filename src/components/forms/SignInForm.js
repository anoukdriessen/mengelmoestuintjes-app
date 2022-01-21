import './forms.css'
import AuthContextProvider, {AuthDataContext} from "../../context/AuthDataContext";
import Button from "../Button";
import {useContext, useState} from "react";
import axios from "axios";
import {FiEye, FiEyeOff, FiSend, FiUser} from "react-icons/fi";
import {Link, useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import {Action, InputFieldWithIcon, Username} from "./FormItems";
import {FiLock} from "react-icons/all";

function SignInForm() {
    const {login} = useContext(AuthDataContext);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })
    const {username, password} = FormData;
    let history = useHistory();
    const iconSize = 20;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let username = formData.username.toLowerCase();
        try {
            const result = await axios.post(`https://localhost:8443/authenticate`, {
                "username": `${username}`,
                "password": `${formData.password}`
            })
            // console.log('jwt token', result.data.jwt);
            login(result.data.jwt);
            history.push(`/profiel/${formData.username}`)
        } catch (e) {
            // console.error(e);
            // console.log(e.response)
            toast.error('Gebruiker niet herkend, controleer je Gebruikersnaam en Wachtwoord en probeer opnieuw')
        }

    }
    return <>
        <h2>Welkom terug</h2>

        <form onSubmit={handleSubmit} id='sign-in'>
            <Action
                linkTo='/registreren'
                linkTitle='Nieuwe gebruiker?'
                showOnHover='Ga naar registreren >>>'
            />

            <InputFieldWithIcon icon = {<FiUser size={iconSize}/>}>
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
            <InputFieldWithIcon icon={<FiLock size={iconSize} />}>
                <input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    placeholder={'Wachtwoord'}
                    onChange={onChange}
                    autoComplete='off'
                    required
                />
                <span onClick={() => {setShowPassword((prevState) => !prevState)}}>
                    { showPassword ? ( <FiEye size={iconSize}/> ) : ( <FiEyeOff size={iconSize}/> ) }
                </span>
            </InputFieldWithIcon>

            <Action
                linkTo='/wachtwoord-vergeten'
                linkTitle='wachtwoord vergeten?'
                showOnHover='>>>'
            />

            <Button id='submit' type='submit' version='send' className='btn' >Login <FiSend size={iconSize}/></Button>
        </form>
    </>
}

export default SignInForm;