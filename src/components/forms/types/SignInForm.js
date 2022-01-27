import '../forms.css'
import AuthContextProvider, {AuthDataContext} from "../../../context/AuthDataContext";
import Button from "../../Button";
import {useContext, useState} from "react";
import axios from "axios";
import {FiEye, FiEyeOff, FiSend, FiUser} from "react-icons/fi";
import {Link, Redirect, useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import {Action, InputFieldWithIcon, Password, SubmitBtn, Username} from "../FormItems";
import {FiLock} from "react-icons/all";
import {refreshPage} from "../../../helpers/functions";

function SignInForm() {
    const {login} = useContext(AuthDataContext);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })
    const {username, password} = FormData;
        const iconSize = 20;

        const onChange = (e) => {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: e.target.value,
            }));
        }

        const handleSubmit = async (e) => {
            console.log('submit')
            e.preventDefault();
            let username = formData.username.toLowerCase();
            try {
                const result = await axios.post(`https://localhost:8443/authenticate`, {
                    "username": `${username}`,
                    "password": `${formData.password}`
                })
                console.log('jwt token', result.data.jwt);
                login(result.data.jwt);
            } catch (e) {
                toast.error('Gebruiker niet herkend, controleer je Gebruikersnaam en Wachtwoord en probeer opnieuw')
            }
        }
        return <>
            <form onSubmit={handleSubmit} id='sign-in'>
                <Action
                    linkTo='/registreren'
                    linkTitle='Nieuwe gebruiker?'
                    showOnHover='Ga naar registreren >>>'
                />

                <Username
                    iconSize={iconSize}
                    username={username}
                    onChange={onChange}
                />

                <Password
                    iconSize={iconSize}
                    showPassword={showPassword}
                    password={password}
                    onChange={onChange}
                    setShowPassword={setShowPassword}
                />

                <Action
                    linkTo='/wachtwoord-vergeten'
                    linkTitle='wachtwoord vergeten?'
                    showOnHover='>>>'
                />

                <SubmitBtn> Login </SubmitBtn>
            </form>
        </>
}

export default SignInForm;