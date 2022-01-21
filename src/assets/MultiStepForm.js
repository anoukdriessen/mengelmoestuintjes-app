import React, {useState} from "react";
import Header from "../components/Header";
import {Link, useHistory} from "react-router-dom";
import {getProvinces} from "../pages/SignUp";

let user = {
    username: 'vivalanouk',
    email: 'info@anoukdriessen.nl',
    password: 'wachtwoord',
    garden: {
        name: '',
        x: 0,
        y: 0,
        size: 0,
        columns: [],
        rows: [],
    }
};

function handleSubmit( current ){
    console.log('clicked submit');
    // console.log(user);
}

function switchNotice(element){
    // remove the first item
    let current = element.classList[0];
    element.classList.remove(current)
    // add the oppisite of current
    element.classList.add(toggleValidation(current));
}
function toggleValidation(old){
    if (old === 'succes') {
        return 'error'
    }
    return 'succes'
}

function validate(label){
    if (label === 'gebruikersnaam') {
        let usernameBox = document.getElementById(label);
        let username = usernameBox.value;
        let messageBox = document.getElementById(label + '-message');

        // check if username does not exist
        // minimum 5 char / maximum 15
        let usernameNotUnique = false;
        let usernameTooShort = username.length <= 4;
        let usernameTooLong = username.length > 15;

        let classIsEmpty = usernameBox.classList[0];

        if (usernameTooShort || usernameTooLong) {
            if (!usernameBox.classList[0] === 'error') {
                switchNotice(usernameBox);
            }

            // console.log(usernameBox.classList[0])
            messageBox.innerText = 'gebruikersnaam moet tussen de 5 en 15 tekens bevatten'
        } else if (usernameNotUnique) {
            if (!usernameBox.classList[0] === 'error') {
                switchNotice(usernameBox);
            }
            // TODO vergelijk met DB
            messageBox.innerText = 'gebruikersnaam is al bezet'
        } else {
            // console.log(usernameBox.classList[0])
            if (!usernameBox.classList[0] === 'succes') {
                switchNotice(usernameBox);
            }
            messageBox.innerText = 'welkom @' + username;

            return username;
        }
    }
    if (label === 'wachtwoord') {
        let password = '';
        let passwordBox = document.getElementById(label);
        let pw = passwordBox.value;
        let messageBox = document.getElementById(label + '-message');
        let hasMinimalLength = password.length > 7;         // minimal length = 8
        // console.log('minimale lengte', hasMinimalLength);
        let containsNumber = hasNumber(password);           // minimal number = 1
        // console.log('bevat een nummer', containsNumber);
        let containsLowerCase = hasLowerCase(password);     // minimal lower case = 1
        // console.log('bevat een kleine letter', containsLowerCase);
        // minimal uppercase = 1
        let containsUpperCase = hasUpperCase(password);
        // console.log('bevat een hoofdletter', containsUpperCase);
        // minimal special = 1
        // TODO special char check

        // if (!hasMinimalLength) {
        //     messageBox.innerText = 'kies een wachtwoord van minimaal 8 tekens'
        // } else if (!containsNumber) {
        //     messageBox.innerText = 'voeg minimaal een nummer toe'
        // } else if (!containsLowerCase) {
        //     messageBox.innerText = 'voeg minimaal een kleine letter toe'
        // } else if (!containsUpperCase) {
        //     messageBox.innerText = 'voeg minimaal een hoofdletter toe'
        // } else {
        //     messageBox.innerText = 'je hebt een sterk wachtwoord gekozen'
        // }
        console.log(pw);
        return pw;
    }
    // else {
    //     // second password
    //     let passwordBox = document.getElementById(label);
    //     let pw = passwordBox.value;
    //     let messageBox = document.getElementById(label + '-message');
    //
    //     if (password !== pw) {
    //         messageBox.innerText = 'de wachtwoord velden zijn niet hetzelde'
    //     } else {
    //         console.log(password);
    //         return password;
    //     }
    // }

    let box = document.getElementById(label);
    let messageBox = document.getElementById(label + '-message');
    // console.log('box', box.value);
    // console.log('msg', messageBox);
    return messageBox;
}
function hasNumber(str) {
    return /\d/.test(str);
}
function hasLowerCase(str) {
    return str.toUpperCase() != str;
}
function hasUpperCase(str) {
    return str.toLowerCase() != str;
}
function hasSpecialChar(str) {
    let special_chars = [ '@', '#', '$', '%', '&', '*', '!', '(', ')', '+', '=', '-', '_' ]
    for (let c in special_chars) {
        if (str.contains(c) ) {
            // console.log(true)
        } else {
            // console.log(false)
        }
    }
}

function handleChange(label, user) {
    if (label === 'gebruikersnaam') {
        let username = validate(label);
        user.username = username;
        console.log('change gebruikersnaam', user.username);
    }
    if (label === 'wachtwoord' || label === 'wachtwoord2') {
        let password = validate(label);
        user.password = password;
        console.log('change password', user.password);
    }
    if (label === 'tuintje') {
        let garden = validate(label);
        user.garden = garden;
        console.log('change tuintje', user.garden);
    }
}

function handleTileClick(tile) {
    // console.log('geklikt op', tile)
    // TODO handle tile click

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
            onChange= { () => { handleChange(props.label, props.setMyObject) }}
        />
        <span id={props.label + '-message'}>{props.message}</span>
    </div>
}

function FormContent(props){
    let [size, setSize] = useState(user.garden.size);
    // console.log(props.formData)
    let title = props.formData.title;
    let subTitle = props.formData.subTitle;
    let tips = props.formData.security;

    let hasProvinces;
    if (props.formData.provinces) {
        hasProvinces = true
    }

    function getCurrentSize(){
        let thisSize = parseInt(document.getElementById('size-msg'));
        if (!thisSize) {
            thisSize = 0;
        }
        console.log(thisSize);
        return thisSize;
    }

    switch (props.type){
        case 'registreren1':
            let username = 'gebruikersnaam';
            let password = 'wachtwoord';
            let email = 'email';

            const usernameBlock = (
                <div className='input'>
                    <label htmlFor={username}>{username}</label>
                    <input id={username} type='text'
                           name={username}
                           onChange= { () => {
                               handleChange(username, user);
                           }}
                    />
                    <span id={username + '-message'}>kies een gebruikersnaam</span>
                </div>
            )
            const emailBlock = (
                <div className='input'>
                    <label htmlFor={email}>{email}</label>
                    <input id={email} type='text'
                           name={email}
                           onChange= { () => {
                               handleChange(email, user);
                           }}
                    />
                    <span id={{email} + '-message'}></span>
                </div>
            )
            const passwordBlock = (
                <div className='input'>
                    <label htmlFor={password}>{password}</label>
                    <input
                        type={'password'}
                        id={password}
                        name={password}
                        onChange = { () => {
                            handleChange(password, user)
                        }}
                    />
                    <label htmlFor={password}>herhaal {password}</label>
                    <input
                        type={'password'}
                        id={password + '2'}
                        name={password + '2'}
                        onChange = { () => {
                            handleChange((password + 2), user)
                        } }
                    />
                    <span id={password + '-message'}>'kies een wachtwoord'</span>
                </div>
            )
            return <>
                <ContentHeader
                    title={title}
                    subTitle={subTitle}
                    imageUrl={'https://images.unsplash.com/photo-1438109382753-8368e7e1e7cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'}
                />
                <span>Heb je al een account? <Link to='login'>Ga naar login</Link></span>
                {usernameBlock}
                {emailBlock}
                {passwordBlock}
                <p>{tips}</p>
                <p>Door een account aan te maken ga je akkoord met onze <Link to='terms-and-privacy'>Terms & Privacy</Link></p>
                <p>
                    Nog niet overtuigd?<br/>
                    {
                        // TODO download bestand via <a> ?
                    }
                    <a href='#' download>
                        Zie hier ons 12 maanden tuinieren plan (download pdf)
                    </a>
                </p>
            </>
        case 'registreren2':
            let progress = 0;
            let options = []

            let provinces = ['HIDDEN'];
            if (hasProvinces) {
                provinces = props.formData.provinces;
            }
            for (let province in provinces) {
                options[province] = provinces[province]
            }

            return <>
                <ContentHeader
                    title={title}
                    subTitle={subTitle}
                    imageUrl={'https://images.unsplash.com/photo-1438109382753-8368e7e1e7cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'}
                />
            <div id='user-credentials'>
                <p>{user.username}</p>
                <p>{user.password}</p>
                <span>email van gebruiker is: {user.email}</span>
            </div>
                <span>progress: {progress}%</span>

                <span className='checkbox'>
                    <input
                        type='checkbox'
                        id='mailing'
                        name='mailing'
                        value='wantsMailing'/>
                    <label htmlFor='mailing'>
                        {'voeg me toe aan de mailinglist'}
                    </label><br/>
                </span>
                <p>informatie mailinglist</p>
                <div id='birthday'>
                    <label htmlFor='birthday'>{'birthday'}</label>
                    <input
                        className={'birthday'}
                        type='date'
                        id={'birthday'}
                        name={'birthday'}
                    />
                    <p>preview van kaart gebruiker is jarig:</p>
                </div>

                {
                    // TODO laat gebruiker een profielfoto toevoegen
                }
                <div id='profile'>
                    <div id='profile-img'>
                        <img src='link/to/image' alt={'profile image' + user.username}/>
                        <p>voeg profielfoto toe</p>
                        <div className={'input-btn'}>
                        <input type='file'/>
                        <button type='button'>Opslaan</button>
                        </div>
                    </div>
                    <div id='profile-name'>
                        <label htmlFor='name'>{'naam'}</label>
                        <input
                            className={'name'}
                            type='text'
                            id={'name'}
                            name={'name'}
                        />
                    </div>
                    <div id='profile-province'>
                        <div>
                            <label htmlFor={'provincies'}>In welke provincie woon je?</label>
                            <select name={'provincies'} id={'provincies'}>
                                <option value={'HIDDEN'}>Maak een keuze</option>
                                {
                                    options.map((o) => {
                                        if (o !== "HIDDEN") {
                                            return <option key={o} value={o}>{o}</option>
                                        }
                                        return null
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
                {
                    // TODO toggle private / public
                }
                <p>preview van kaart gebruikers profiel</p>
            </>
        case 'registreren3':
            let garden = props.formData;
            let x = document.getElementById('gardenX');
            let y = document.getElementById('gardenY');
            const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            let thisGarden = {
                name: garden.name,
                rows: [],
                columns: []
            }

            // console.log("de rijen in de tuin",thisGarden.rows)
            // console.log("de kolommen in de tuin",thisGarden.columns)

            let label = 'tuintje';
            return <div id='garden'>
                    <label htmlFor={label}>{label}</label>
                    <input
                        type='text'
                        id={label+'naam'}
                        name={label}
                        onChange= { () => {
                            let name = document.getElementById('tuintjenaam').value;
                            let messageBox = document.getElementById('tuintjenaam-message');
                            let titleBox = document.getElementById('tuintjenaam-title');
                            user.garden.name = name;
                            messageBox.innerText = 'Tuintje @' + user.garden.name
                        }}
                    />
                <span id={label+'naam' + '-message'}>kies een naam voor je tuintje</span>

                <p>hoe kies ik een passende naam tips</p>
                    <div id='garden-stats'>
                        <div className={'input-btn'}>
                            <label htmlFor={'gardenX'}>X m<sup>2</sup> breed</label>
                            <input
                                type='number'
                                id={'gardenX'}
                                onChange={() => {
                                    let thisX = document.getElementById('gardenX').value;
                                    let thisY = document.getElementById('gardenY').value;
                                    if (thisX > 26) {
                                        x = 26; // maximum 26 on x
                                    } else {
                                        x = thisX;
                                    }
                                    user.garden.x = x;
                                    let box = document.getElementById('size-msg')
                                    box.innerText = '' +(thisX * thisY);
                                    // console.log('this x -> new size',user.garden.x, ( thisX * thisY ))
                                }}
                            />
                        </div>
                        <div className={'input-btn'}>
                            <label htmlFor={'gardenY'}>Y m<sup>2</sup> lang</label>
                            <input
                                type='number'
                                id={'gardenY'}
                                onChange={() => {
                                    let thisX = document.getElementById('gardenX').value;
                                    let thisY = document.getElementById('gardenY').value;
                                    user.garden.y = thisY;
                                    let box = document.getElementById('size-msg')
                                    box.innerText = '' +(thisX * thisY);
                                    // console.log('this y -> new size',user.garden.y, ( thisX * thisY))
                                }}
                            />
                        </div>
                        <p>
                            <span id={'size-msg'}>{getCurrentSize()}</span> vierkante meter tuin<br/>
                            Ieder veld is 1 m<sup>2</sup><br/>
                        </p>
                        <button type='button' onClick={() => {
                            user.garden.size = (user.garden.x * user.garden.y);
                            // console.log(user.garden.x + '*' + user.garden.y + '=', user.garden.size)
                            for (let i = 0; i < user.garden.x; i++) {
                                if (user.garden.y !== 0) { // y cannot be empty to have at least one row
                                    // for each row
                                    // console.log('row=',i+1);
                                    thisGarden.rows[i] = letters[i];

                                    for (let j = 0; j < user.garden.y; j++) {
                                        // for each row we add the amount of columns
                                        // console.log('adding column', j+1);
                                        thisGarden.columns[j] = j + 1;
                                    }
                                }
                            }
                            let preview = document.getElementById('garden-preview');
                            user.garden.columns = thisGarden.columns;
                            user.garden.rows = thisGarden.rows;
                            props.history.push('/tuintje/naam');
                        }}>Genereer tuintje</button>
                    </div>
                </div>
        case 'registreren4':
            return <>
            </>
    }
    return <span>content type not found</span>;
}

function MultiStepForm(props) {
    let history = useHistory();
    const[progress, setProgress] = useState(0);
    const[currentStep, setCurrentStep] = useState(1);
    const[formData, setFormData] = useState(null)

    if (!formData) {
        setFormData(props.formData);
    }

    let type = (props.type + currentStep)
    // console.log(document.getElementById('backlink').classList);
    return <div id='form'>
        <form id={type}>
            <FormContent
                type = {type}
                imageUrl = {props.imageUrl}
                formData = {props.formData[currentStep - 1]}
                history = {history}
            />
        </form>

        <div id='actions'>
            <button id='backlink' type='button'
                    onClick={() => {
                        if(currentStep !== 1) {
                            setCurrentStep(currentStep -1) }
                        if (currentStep < 2) {
                            document.getElementById('backlink').classList.add('hidden');
                        }
                    }}>

                Ga terug
            </button>

            {currentStep}

            <button type='button' form={type}
                    onClick={
                        () => {
                            handleSubmit(currentStep);
                            // console.log(currentStep + 1)
                            if ((currentStep+1) !== (formData.length + 1) ) {
                                setCurrentStep(currentStep +1)
                            }
                            if (currentStep > 1) {
                                document.getElementById('backlink').classList.remove('hidden');
                            }
                        }
                    }>
                Opslaan en verder gaan
            </button>
        </div>
    </div>
}

export default MultiStepForm;