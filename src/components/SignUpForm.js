import AuthContextProvider, {AuthDataContext} from "../context/AuthDataContext";
import Button from "./Button";
import {useContext, useState} from "react";
import axios from "axios";
import {FiEye, FiEyeOff, FiSend} from "react-icons/fi";
import {Link, useHistory} from "react-router-dom";
import {toast} from "react-toastify";

function SignUpForm() {
    const {auth, login} = useContext(AuthDataContext);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    })
    const {username, email, password} = FormData;
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
            const result = await axios.post(`https://localhost:8443/api/gebruikers`, {
                "username": `${formData.username}`,
                "password": `${formData.password}`,
                "email": `${formData.email}`,
                "enabled": true,
                "name": '',
                "birthday": null,
                "province": "HIDDEN"
            }, )
            const authenticate = await axios.post(`https://localhost:8443/authenticate`, {
                "username": `${formData.username}`,
                "password": `${formData.password}`
            })
            // console.log('jwt token', result.data.jwt);
            login(authenticate.data.jwt);
            history.push(`/profiel/${formData.username}`)
        } catch (e) {
            console.error(e);
            console.log(e.response)
            toast.error('Aanvraag onjuist')
        }
    }

    return <AuthContextProvider>
        <h2>In 4 stappen</h2>
        <h3>jouw mengelmoestuintje</h3>

        <form onSubmit={handleSubmit}>
            <Link to='/login'>Al een account? <span>Ga naar inloggen</span></Link>

            <input
                id='username'
                className='usernameInput'
                type='text'
                value={username}
                placeholder={'Gebruikersnaam'}
                onChange={onChange}
            />
            <input
                id='email'
                className='emailInput'
                type='email'
                value={email}
                placeholder={'Email'}
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
            <Button type='submit' version='send'><span>Maak een account aan </span><FiSend/></Button>
        </form>
    </AuthContextProvider>
}

export default SignUpForm;