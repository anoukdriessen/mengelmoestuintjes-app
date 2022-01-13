import React, {useState} from "react";
import Header from "../components/Header";
import {Link} from "react-router-dom";


function handleSubmit( current ){
    console.log('clicked submit');
    // if (current === 1) {
    //     let gebruikersnaam = document.getElementById('input#gebruikersnaam').value;
    //     console.log(gebruikersnaam)
    // }
}

function handleChange(label) {
    if (label === 'gebruikersnaam') {
        let usernameBox = document.getElementById(label);
        let username = usernameBox.value;
        let messageBox = document.getElementById(label + '-message');
        // console.log(messageBox)

        // check if username does not exist
        // minimum 5 char / maximum 15
        let usernameNotUnique = false;
        let usernameTooShort = username.length <= 4;
        let usernameTooLong = username.length > 15;


        if (usernameTooShort || usernameTooLong) {
            messageBox.innerText = 'gebruikersnaam moet tussen de 5 en 15 tekens bevatten'
        } else if (usernameNotUnique) {
            // TODO vergelijk met DB
            usernameBox.classList.remove('success')
            usernameBox.classList.add('error')
            messageBox.innerText = 'gebruikersnaam is al bezet'
        } else {
            usernameBox.classList.remove('error')
            usernameBox.classList.add('success')
            messageBox.innerText = 'welkom @' + username;
        }

    }
}

function ContentHeader(props) {
    let title = props.title;
    title = title.toUpperCase();

    return <>
        <img className={'header-img'}
             src={props.imageUrl}
             alt={'image for ' + props.title}/>
        <h2>{title}<br/>{props.subTitle}</h2>
        <hr/>
    </>
}

function InputTextField(props) {
    if (props.type === 'password') {
        return <div className='input'>
            <label className={props.className} htmlFor={props.label}>{props.label}</label>
            <input
                type={props.type}
                id={props.label}
                name={props.label}
            />
            <label className={props.className} htmlFor={props.label}>herhaal {props.label}</label>
            <input
                type={props.type}
                id={props.label + '2'}
                name={props.label + '2'}
            />
            <span id={props.label + '-message'}>{props.message}</span>
            <p>{props.securityTips}</p>
        </div>
    }

    return <div className='input'>
        <label className={props.className} htmlFor={props.label}>{props.label}</label>
        <input
            className={props.className}
            type={props.type}
            id={props.label}
            name={props.label}
            onChange= { () => { handleChange(props.label) }}
        />
        <span id={props.label + '-message'}>{props.message}</span>
    </div>
}

function FormContent(props){
    // console.log(props.formData)
    let title = props.formData.title;
    let subTitle = props.formData.subTitle;
    switch (props.type){
        case 'registreren1':
            return <>
                <ContentHeader
                    title={title}
                    subTitle={subTitle}
                    imageUrl={'https://images.unsplash.com/photo-1438109382753-8368e7e1e7cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'}
                />
                <span>Heb je al een account? <Link to='login'>Ga naar login</Link></span>
                <InputTextField
                    label="gebruikersnaam"
                    type="text"
                    className={props.className}
                    securityTips={props.securityTips}
                    autoComplete = {'username'}
                />
                <InputTextField
                    label="email"
                    type="email"
                    autoComplete={'email'}
                />
                <InputTextField
                    label="wachtwoord"
                    type="password"
                    className={props.className}
                    securityTips={props.securityTips}/>
            </>
        case 'registreren2':
            return <>
                <ContentHeader
                    title={title}
                    subTitle={subTitle}
                    imageUrl={'https://images.unsplash.com/photo-1438109382753-8368e7e1e7cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'}
                />
                <span>Heb je al een account? <Link to='login'>Ga naar login</Link></span>
                <InputTextField
                    label="gebruikersnaam"
                    type="text"
                    className={props.className}
                    securityTips={props.securityTips}
                    autoComplete = {'username'}
                />
                <InputTextField
                    label="email"
                    type="email"
                    autoComplete={'email'}
                />
                <InputTextField
                    label="wachtwoord"
                    type="password"
                    className={props.className}
                    securityTips={props.securityTips}/>
            </>
        case 'registreren3':
            return <>
                <ContentHeader
                    title={title}
                    subTitle={subTitle}
                    imageUrl={'https://images.unsplash.com/photo-1438109382753-8368e7e1e7cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'}
                />
                <span>Heb je al een account? <Link to='login'>Ga naar login</Link></span>
                <InputTextField
                    label="gebruikersnaam"
                    type="text"
                    className={props.className}
                    securityTips={props.securityTips}
                    autoComplete = {'username'}
                />
                <InputTextField
                    label="email"
                    type="email"
                    autoComplete={'email'}
                />
                <InputTextField
                    label="wachtwoord"
                    type="password"
                    className={props.className}
                    securityTips={props.securityTips}/>
            </>
        case 'registreren4':
            return <>
                <ContentHeader
                    title={title}
                    subTitle={subTitle}
                    imageUrl={'https://images.unsplash.com/photo-1438109382753-8368e7e1e7cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'}
                />
                <span>Heb je al een account? <Link to='login'>Ga naar login</Link></span>
                <InputTextField
                    label="gebruikersnaam"
                    type="text"
                    className={props.className}
                    securityTips={props.securityTips}
                    autoComplete = {'username'}
                />
                <InputTextField
                    label="email"
                    type="email"
                    autoComplete={'email'}
                />
                <InputTextField
                    label="wachtwoord"
                    type="password"
                    className={props.className}
                    securityTips={props.securityTips}/>
            </>
    }
    return <span>content type not found</span>;
}

function MultiStepForm(props) {
    const[progress, setProgress] = useState(0);
    const[currentStep, setCurrentStep] = useState(1);
    const[formData, setFormData] = useState(null)

    if (!formData) {
        setFormData(props.formData);
    }

    let type = (props.type + currentStep)
    return <div id='form'>
        <form id={type}>
            <FormContent
                type = {type}
                imageUrl = {props.imageUrl}
                formData = {props.formData[currentStep - 1]}
            />
        </form>

        <div id='actions'>
            <button type='button'
                    onClick={() => { if(currentStep !== 1) { setCurrentStep(currentStep -1) }}}>
                Ga terug
            </button>

            {currentStep}

            <button type='button' form={type}
                    onClick={
                        () => {
                            handleSubmit(currentStep);
                            console.log(currentStep + 1)
                            if ((currentStep+1) !== (formData.length + 1) ) { setCurrentStep(currentStep +1) }
                        }
                    }>
                Opslaan en verder gaan
            </button>
        </div>
    </div>
}

export default MultiStepForm;