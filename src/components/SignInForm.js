import AuthContextProvider, {AuthDataContext} from "../context/AuthDataContext";
import Button from "./Button";
import {useContext, useState} from "react";
import axios from "axios";
import {FiEye, FiEyeOff, FiSend} from "react-icons/fi";
import {Link, useHistory} from "react-router-dom";
import {toast} from "react-toastify";

function SignInForm() {
    const {auth, login} = useContext(AuthDataContext);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })
    const {username, password} = FormData;
    let history = useHistory();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(`https://localhost:8443/authenticate`, {
                "username": `${formData.username}`,
                "password": `${formData.password}`
            })
            // console.log('jwt token', result.data.jwt);
            login(result.data.jwt);
            history.push(`/profiel/${formData.username}`)
        } catch (e) {
            console.error(e);
            console.log(e.response)
            toast.error('Gebruiker niet herkend, controleer je gebruikersnaam en wachtwoord en probeer opnieuw')
        }

    }

    return <AuthContextProvider>
        <h2>Welkom terug</h2>

        <form onSubmit={handleSubmit}>
            <Link to='/registreren'>Nieuwe gebruiker? <span>Ga naar registreren</span></Link>

            <input
                id='username'
                className='usernameInput'
                type='text'
                value={username}
                placeholder={'Gebruikersnaam'}
                onChange={onChange}
            />
            <input
                id='password'
                className='passwordInput'
                type={showPassword ? 'text' : 'password'}
                value={password}
                placeholder={'Wachtwoord'}
                onChange={onChange}
            />
            <span onClick={() => {setShowPassword((prevState) => !prevState)}}>
            { showPassword ? ( <FiEye/> ) : ( <FiEyeOff/> ) }
            </span>
            <Link to='/wachtwoord-vergeten'>wachtwoord vergeten</Link>
            <Button type='submit' version='send'><span>Login </span><FiSend/></Button>
        </form>
    </AuthContextProvider>
}

export default SignInForm;