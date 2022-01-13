import React, {useContext} from "react";
import { Link } from "react-router-dom";

function Login() {

    function handleClick() {
        console.log('click');
    }

    return <>
        hello
        <button type='button' onClick={handleClick}>Inloggen</button>
        <p>Heb je nog geen account? <Link to="/info">Registreer</Link> je dan eerst.</p>
    </>
}

export default Login;