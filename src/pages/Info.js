import React, {useState} from 'react';

import Header from "../assets/components/Header";
import {getLink} from "./Home";
import Footer from "../assets/components/Footer";

import { FiCornerLeftDown as Arrow } from "react-icons/fi";
import {Link} from "react-router-dom";

// TODO username not / valid -> setUserMessage;

function InputTextField(props) {
    if (props.type === 'password') {
        return <>
            <label className={props.className} htmlFor="{props.label}">{props.label}</label>
            <input
                className={props.className + ' left-bottom'}
                type={props.text}
                id={props.label}
                name={props.label}/>
            <input
                className={props.className + ' left-top'}
                type={props.text}
                id={props.label}
                name={props.label}/>
            <br/>
            <span>{props.message}</span>
            <p>{props.securityTips}</p>
        </>
    }
    return <>
        <label className={props.className} htmlFor="{props.label}">{props.label}</label>
        <input
            className={props.className}
            type={props.text}
            id={props.label}
            name={props.label}/>
        <br/>
        <span>{props.message}</span>
        <p>{props.securityTips}</p>
    </>
}
function Input(props) {
    console.log(props.className)
    if (props.usernameMessage) {
        return <InputTextField
            label="username"
            type="text"
            className={props.className}
            message={props.usernameMessage}
            securityTips={props.securityTips}/>
    }
    if (props.passwordMessage) {
        return <InputTextField
                label="wachtwoord"
                type="password"
                className={props.className}
                message={props.passwordMessage}
                securityTips={props.securityTips}/>
    }
    return null
}

function Form(props) {
    return <form action={props.action}>
        <Input className={'left'}
            usernameMessage = 'kies een gebruikersnaam'
        />
        <hr/>
        <Input className={'right'}
               passwordMessage = 'kies een wachtwoord'
               securityTips = 'tips voor wachtwoord'
        />
        <button
            onClick={props.handleClick} type='submit' className='registerBtn'>
            Registreren
        </button>
        <p>
            Door een account aan te maken ga je akkoord met onze
            <Link to='terms-and-privacy'>Terms & Privacy</Link>
            <hr/>
            Nog niet overtuigd?<br/>
            <a href='#'>Zie hier ons 12 maanden tuinieren plan (download pdf)</a>
            <br/>
        </p>
    </form>
}
function Step( {type}, {message}, {click}) {
    if ( type === 'step1' ) {
        return <main>
            <img className={'header-img'}
                 src='https://images.unsplash.com/photo-1438109382753-8368e7e1e7cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                 alt='mengelmoestuintjes'/>
            <h2>Stap 1.<br/>Maak een account</h2>
            <span>Heb je al een account? <Link to='registreren-login'>Ga naar login</Link></span>
            <Form
                action='/action.php'
                usernameMessage={message}
                handleClick={click}
            />

        </main>
    }
    return null
}

function Info( props ) {
    const [userMessage, setUserMessage] = useState('kies een gebruikersnaam');
    const [register, setRegister] = useState();

    let link = getLink( props.isLoggedIn, props.user)

    return <>
        <div className='page-content'>
            <Header
                page = {'info'}
                link = {link}
                title = {props.title}
            />
            <Step
                onClick={setRegister(true)}
                type='step1'
                message='kies een gebruikersnaam'
            />


        </div>

        <Footer
            callToAction = {'Ga naar stap 1'}
            linkTo = {'/stap-1'}
        />
    </>
}

export default Info;