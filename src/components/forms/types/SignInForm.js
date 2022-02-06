import '../../../styles/forms.css'
import  {AuthDataContext} from "../../../context/AuthDataContext";
import {useContext, useState} from "react";
import { FiSend} from "react-icons/fi";
import {Action, Password,  Username} from "../FormItems";
import Form from "../Form";

function SignInForm() {
    const { authenticate } = useContext(AuthDataContext);

    const [isValid, setIsValid] = useState();
    const [message, setMessage] = useState();
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
            e.preventDefault();
            // console.log('submitting', formData)
            let username = formData.username.toLowerCase();
            authenticate(username, formData.password, setMessage);
        }

        return <>
            <Form
                type={'primary'}
                isDisabled={!isValid}
            >
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

                { message }
                <button type={"submit"} className='btn btn-form' onClick={handleSubmit}>
                    <FiSend/>Login
                </button>
            </Form>
        </>
}

export default SignInForm;