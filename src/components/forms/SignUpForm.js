import './forms.css'
import {AuthDataContext} from "../../context/AuthDataContext";
import Button from "../Button";
import {useContext, useState} from "react";
import {FiEye, FiEyeOff, FiMail, FiSend, FiUser} from "react-icons/fi";
import {Link, useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import {Action, CheckBox, InputFieldWithIcon, SingleCheckBox} from "./FormItems";
import {FiLock} from "react-icons/all";
import {
    containsLowerCaseCharacter,
    containsSpecialChar,
    containsUpperCaseCharacter,
    isValidEmail, isValidPassword, isValidUsername
} from "../../helpers/functions";
import {UserDataContext} from "../../context/UserDataContext";
import axios from "axios";

function SignUpForm() {
    const { login } = useContext(AuthDataContext);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        accepted: false,
    })
    const [showPassword, setShowPassword] = useState(false);
    const {username, email, password, accepted} = FormData;

    const [usernameValid, isUsernameValid] = useState(false);
    const [passwordValid, isPasswordValid] = useState(false);
    const [emailValid, isEmailValid] = useState(false);

    let history = useHistory();
    const iconSize = 20;

    const onChange = (e) => {
        switch (e.target.id) {
            case 'username':
                if (isValidUsername(e.target.value)) {
                    isUsernameValid(true)
                } else { isUsernameValid(false) }
                break;
            case 'email':
                if(isValidEmail(e.target.value)){
                    isEmailValid(true)
                } else { isValidEmail(false) }
                // console.log('email', emailValid)
                break;
            case 'password':
                if (isValidPassword(e.target.value)) {
                    isPasswordValid(true)
                } else { isPasswordValid(false) }
                break;
        }
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let username = formData.username.toLowerCase();
        let email = formData.email.toLowerCase();

        try {
            const usernameExists = await axios.get(`https://localhost:8443/api/gebruikers/check/username/${username}`)
            // console.log('check username already taken',usernameExists.data)
            if (!usernameExists.data) {
                // username not taken
                try {
                    const emailExists = await axios.get(`https://localhost:8443/api/gebruikers/check/email/${email}`)
                    // console.log('check email already taken',emailExists.data)
                    if (!emailExists.data) {
                        // email not taken
                        let newUser = {
                            "username": `${username}`,
                            "password": `${formData.password}`,
                            "email": `${email}`,
                            "enabled": true,
                            "name": '',
                            "birthday": null,
                            "province": "HIDDEN"
                        }
                        try {
                            const result = await axios.post(`https://localhost:8443/api/gebruikers`, newUser)
                            console.log('result', result)
                            const authenticate = await axios.post(`https://localhost:8443/authenticate`, {
                                "username": `${username}`,
                                "password": `${formData.password}`
                            })
                            console.log('jwt token', authenticate);
                            login(authenticate.data.jwt);
                            history.push(`/profiel/${username}`)
                        } catch (e) {
                            console.error(e);
                            console.log(e.response)
                            toast.error('Er gaat iets mis, probeer het later opnieuw')
                        }
                    } else {
                        return toast.error("Email is al in gebruik, probeer je in te loggen ga dan naar de login pagina")
                    }
                } catch (e) {
                    console.error(e);
                    console.log(e.response);
                }
            } else {
                return toast.error("Gebruikersnaam is bezet, verander de gebruikersnaam en probeer opnieuw")
            }
        } catch (e) {
            console.error(e);
            console.log(e.response);
        }
    }

    return <>
        <h2>In 4 stappen</h2>
        <h3>jouw mengelmoestuintje</h3>

        <form onSubmit={handleSubmit} id='sign-up'>
            <Action
                linkTo='/login'
                linkTitle='Heb je al een account?'
                showOnHover='Ga naar inloggen >>>'
            />
            <InputFieldWithIcon icon = {<FiUser size={iconSize} />}>
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
            <InputFieldWithIcon icon = {<FiMail size={iconSize} />}>
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

            <SingleCheckBox type={'tap'} id={'terms'} value={accepted}/>

            <Button type='submit' version='send'><span>Maak een account aan </span><FiSend/></Button>
        </form>
    </>
}

export default SignUpForm;