import React, {useState} from 'react';

import Header from "../components/Header";
import Footer from "../components/Footer";

import { FiCornerLeftDown as Arrow } from "react-icons/fi";
import {Link} from "react-router-dom";
import axios from "axios";
import MultiStepForm from "../assets/MultiStepForm";

// TODO username not / valid -> setUserMessage;
function getLink( isLoggedIn, user ) {
    let link = '/login';
    if (isLoggedIn && user) {
        link = '/profile/' + user.username;
    }
    return link;
}

function InputTextField(props) {
    if (props.type === 'password') {
        return <>
            <label className={props.className} htmlFor={props.label}>{props.label}</label>
            <input
                type={props.type}
                id={props.label}
                name={props.label}
                autoComplete={'new-password'}/>
            <input
                type={props.type}
                id={props.label + '2'}
                name={props.label + '2'}
                autoComplete={'new-password'}/>
            <br/>
            <span>{props.message}</span>
            <p>{props.securityTips}</p>
        </>
    }

    return <>
        <label className={props.className} htmlFor={props.label}>{props.label}</label>
        <input
            className={props.className}
            type={props.type}
            id={props.label}
            name={props.label}
            autoComplete={props.autoComplete}/>
        <br/>
        <span>{props.message}</span>
        <p>{props.securityTips}</p>
    </>
}

function Input(props) {
    if (props.usernameMsg) {
        return <InputTextField
            label="gebruikersnaam"
            type="text"
            className={props.className}
            message={props.usernameMsg}
            securityTips={props.securityTips}
            autoComplete = {'username'}
        />
    }
    if (props.passwordMsg) {
        return <InputTextField
                label="wachtwoord"
                type="password"
                className={props.className}
                message={props.passwordMsg}
                securityTips={props.securityTips}/>
    }
    if (props.emailMsg) {
        return <InputTextField
            label="email"
            type="email"
            message={props.emailMsg}
            autoComplete={'email'}
        />
    }
    if (props.birthdayMsg) {
        return <InputTextField
            label="verjaardag"
            type="date"
            message={props.birthdayMsg}
        />
    }
    if (props.checkbox) {
        return <span className='checkbox'>
            <input
                type='checkbox'
                id={props.name}
                name={props.name}
                value={props.thisValue}/>
            <label htmlFor={props.name}>
                {props.title}
            </label><br/>
        </span>
    }
    if (props.message && props.label) {
        return <InputTextField
            label={props.label}
            type="text"
            message={props.message}
        />
    }
    return null
}

function Form(props) {
    // TODO validatie
    //TODO onclick download 12 maanden tuinieren pdf
    if (props.type === 'registration') {
        return <form>

            <button
                onClick={props.handleClick} type='button' className='registerBtn'>
                Registreren
            </button>
            <p>
                Door een account aan te maken ga je akkoord met onze
                <Link to='terms-and-privacy'>Terms & Privacy</Link>
            </p><p>
                Nog niet overtuigd?<br/>
                <a href='#'>Zie hier ons 12 maanden tuinieren plan (download pdf)</a>
                <br/>
            </p>
        </form>
    }
    // TODO velden optioneel
    if (props.type === 'profile') {
        let options = []
        for (let province in props.propvinces) {
            // console.log(props.propvinces[province])
            options[province] = props.propvinces[province]
        }
        // options.map(o => console.log(o))
        // console.log(options)
        return <form>
            <span>email van gebruiker is: mail@mail.nl </span>
            <Input
                checkbox = {true}
                name = 'mailing'
                thisValue = 'wantsMailing'
                title = 'voeg me toe aan de mailinglist'
            />
            <p>informatie mailinglist</p>
            <hr/>
            <Input
                birthdayMsg = 'vul jouw geboortedatum in'
            />
            <p>informatie verjaardag</p>
            <Input
                label='naam'
                message='vul hier de naam in die we zichtbaar op je profiel mogen tonen'
            />
            <p>informatie voornaam</p>
            <img src='/path/to/profile-img/img.jpg' alt={'profielfoto'}/>
            <input type='file'/>
            <button type='button'>Opslaan</button>
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
        </form>
    }

    return <>unknown type</>
}

function handleTileClick(tile) {
    // console.log('geklikt op', tile)
    // TODO handle tile click

}

function Step( props ) {
    const [progress, setProgress] = useState(0);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    if ( props.type === 'step-1' ) {
        return <main>

            <Form
                type={'registration'}
                handleClick = {props.handleClick}
            />

        </main>
    }
    // TODO laat gebruiker een profielfoto toevoegen
    if (props.type === 'step-2') {
        return <main>
            <h2>Welkom @gebruikersnaam bij Mengelmoestuintjes</h2>
            <h3>Stap 2.<br/>Maak je profiel compleet</h3>
            <span>progress: {progress}%</span>
            <Form
                type={'profile'}
                handleClick = {props.handleClick}
                propvinces = {props.provinces}
            />
        </main>
    }

    if (props.type === 'step-3') {
        let size = (x*y);
        // console.log(size);

        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        let thisGarden = {
            rows: [],
            columns: []
        }
        for (let i = 0; i < x; i++) {
            if (y !== 0) { // y cannot be empty to have at least one row
                // for each row
                // console.log('row=',i+1);
                thisGarden.rows[i] = letters[i];

                for (let j = 0; j < y; j++) {
                    // for each row we add the amount of columns
                    // console.log('adding column', j+1);
                    thisGarden.columns[j] = j+1;
                }
            }
        }
        // console.log("de rijen in de tuin",thisGarden.rows)
        // console.log("de kolommen in de tuin",thisGarden.columns)

        return <main>
            <h2>Stap 3. Tijd voor je eerste tuintje</h2>

            <Input
                label='tuintje'
                message='vul hier de naam in van je tuintje'
            />

            <p>Informatie tuintje</p>
            <input type='number' value={x} id={'x'} onChange={() =>
            {
                let thisX = document.getElementById('x').value;
                if (thisX > 26) {
                    setX(26);
                } else {
                    setX(document.getElementById('x').value);
                }
            }}/>
            <input type='number' value={y} id={'y'} onChange={() =>
            {
                setY(document.getElementById('y').value);
            }}/>
            <div id='garden-select-box'>
                je tuin is {x} bij {y} = {x*y} vierkante meter
                { size!==0 && (
                    <>
                        <p>je tuin is niet leeg</p>
                        <div id='garden'>
                            <div id='rows'>
                                {
                                    thisGarden.columns.map((c) => {
                                        return <div className='row'>
                                            {
                                                thisGarden.rows.map((r) => {
                                                    let name = (r+c)
                                                    return <span className='tile' onClick={()=>{handleTileClick(name)}}>
                                                        {name}</span>
                                                })
                                            }
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </>
                )}
            </div>
            <button type='button'>Opslaan</button>
        </main>
    }

    if (props.type === 'step-4') {
        return <>
            <h2>Stap 4.<br/>Rondleiding</h2>
            <Link to={'/profile'}>Ga naar je profiel</Link>
            <p>informatie en links</p>
        </>
    }
    return null
}

function handleRegister() {
    console.log('clicked button step 1');
    // TODO handle registration
}
function handleSaveProfile() {
    console.log('clicked button step 2');
    // TODO handle save profile
}

function Info( props ) {
    const [provinces, setProvinces] = useState(null)
    const [userMessage, setUserMessage] = useState('kies een gebruikersnaam');
    const [step, setStep] = useState('step-1');

    let link = getLink( props.isloggedIn, props.user);

    async function getProvinces() {
        try {
            const result = await axios.get("https://localhost:8443/api/gebruikers/provincies");
            // console.log(result.data)
            return result.data;
        } catch (e) {
            console.error(e);
            console.log(e.response);
        }
    }

    if (provinces === null) {
        getProvinces().then(r => setProvinces(r) );
    }

    // MULTISTEP
    const thisFormData = [
        {
            title: 'Stap 1.',
            subTitle: 'Maak een Account',
        },
        {
            title: 'Stap 2.',
            subTitle: 'Maak een Profiel',
        },
        {
            title: 'Stap 3.',
            subTitle: 'Maak een Tuintje',
        },
        {
            title: 'Stap 4.',
            subTitle: 'Rondleiding',
        },
    ]


    return <>
        <div className='page-content'>
            <Header
                page = {'info'}
                link = {link}
                title = {props.title}
            />
            <Step
                type={step}
                message='kies een gebruikersnaam'
                handleClick={handleRegister}
            />
            <hr/>
            <Step
                type={'step-2'}
                handleClick={handleSaveProfile}
                provinces={provinces}
            />
            <hr/>
            <Step
                type={'step-3'}
            />
            <hr/>
            <Step
                type={'step-4'}
            />

            <MultiStepForm
                type='registreren'
                formData={thisFormData}
            />

        </div>

        <Footer
            callToAction = {'Ga naar stap 1'}
            linkTo = {'/stap-1'}
        />
    </>
}

export default Info;