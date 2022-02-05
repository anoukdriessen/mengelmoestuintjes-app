import '../forms.css'
import {AuthDataContext} from "../../../context/AuthDataContext";
import {useContext, useState} from "react";
import {FiSend} from "react-icons/fi";
import {useHistory} from "react-router-dom";
import {
    Action, BtnSubmit,
    Mail, Message,
    Password,
    SingleCheckBox, Submit,
    Username
} from "../FormItems";
import axios from "axios";
import Form from "../Form";
import {isValidEmail, isValidPassword, isValidUsername} from "../../../helpers/functions";
import {FiCheck, GiSave} from "react-icons/all";

function SignUpForm() {
    const { login, setError, error } = useContext(AuthDataContext);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        accepted: false,
    })
    const {username, email, password, accepted} = FormData;

    const [showPassword, setShowPassword] = useState(false);

    const [isValid, setIsValid] = useState(false);
    const [usernameValid, setUsernameValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);

    let history = useHistory();
    const iconSize = 20;

    const onChange = (e) => {
        setUsernameValid(false);
        setEmailValid(false);
        setPasswordValid(false);

        if (e.target.id === 'username') {
            if (isValidUsername(e.target.value)) {
                setUsernameValid(true)
            }
        } else if (e.target.id === 'email') {
            if (isValidEmail(e.target.value)) {
                setEmailValid(true);
            }
        } else {
            if (isValidPassword(e.target.value)) {
                setPasswordValid(true);
            }
        }

        if (usernameValid && emailValid && passwordValid) {
            setIsValid(true)
        }

        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }
    console.log('error', error)
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
                            // console.log('post new user', result.data);
                            let username = result.data.username;
                            const authenticate = await axios.post(`https://localhost:8443/authenticate`, {
                                "username": username,
                                "password": formData.password,
                            });
                            // console.log('jwt token', authenticate);
                            login(authenticate.data.jwt);
                        } catch (e) {
                            setError('Er gaat iets mis, probeer het later opnieuw');
                            console.error(e);
                            console.log(e.response)
                        }
                    } else {
                        setError('Email is al in gebruik, probeer je in te loggen? ga dan naar /login')
                    }
                } catch (e) {
                    console.error(e);
                    console.log(e.response);
                }
            } else {
                setError('Gebruikersnaam is al in gebruik, probeer je in te loggen? ga dan naar /login')
            }
        } catch (e) {
            console.error(e);
            console.log(e.response);
        }
    }

    return <>
        <Form
            type={'primary'}
            onSumbit={handleSubmit}
            isDisabled={!isValid}
        >
            <Action
                linkTo='/login'
                linkTitle='Heb je al een account?'
                showOnHover='Ga naar inloggen >>>'
            />
            <Username
                iconSize={iconSize}
                username={username}
                onChange={onChange}
            />
            <Message check={usernameValid} message={'gebruikersnaam moet tussen de 2 en 15 tekens bevatten en mag geen speciale tekens bevatten'}/>
            <Mail
                iconSize={iconSize}
                email={email}
                onChange={onChange}
            />
            <Message check={emailValid} message={'email wordt niet herkend'}/>
            <Password
                iconSize={iconSize}
                showPassword={showPassword}
                password={password}
                onChange={onChange}
                setShowPassword={setShowPassword}
            />
            <Message check={passwordValid} message={'wachtwoord moet minimaal 7 tekens bevatten, moet bestaan uit minimaal 1 letter, 1 hoofdletter en speciaal teken'}/>
            <SingleCheckBox
                type={'tap'}
                id={'terms'}
                value={accepted}
            />

            <button type={"submit"} className='btn btn-form'>
                <FiSend/>Maak een account
            </button>
        </Form>
    </>
}

export default SignUpForm;