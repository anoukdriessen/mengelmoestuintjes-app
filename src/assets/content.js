

import {
    getAllPages,
} from "./data";
import Cards from "../components/Cards";
import CallToAction from "../components/CallToAction";
import {useEffect, useState} from "react";
import axios from "axios";
import MainContent from "../components/main/MainContent";

const pages = getAllPages();
const info = pages[1];

function HowTo( props ) {
    const [error, setError] = useState(0);  // error message
    const [serverRunning, isServerRunning] = useState(true);

    const [text, setText] = useState();              // welcome message


    const [numberOfQuotes, setNumberOfQuotes] = useState(0);
    const [quote, setQuote] = useState("");
    const [author, setAuhtor] = useState("");

    const [numberOfUsers, setNumberOfUsers] = useState(0);
    const [allUsers, setAllUsers] = useState({});
    const [currentUsername, setCurrentUsername] = useState("");
    const [userRoles, setUserRoles] = useState();
    const [allProvinces, setAllProvinces] = useState();
    const [xp, setXp] = useState();
    const [birthday, setBirthday] = useState([]);

    // function isServerRunning() {
        // axios("https://localhost:8443/actuator/health")
        //     .then((response) => {
        //         console.log(response.data);
        //         isServerRunning(response.data)
        //     }).catch((er) => {
        // setError("" + er);
        // console.error("Error occurred fetching random quote: ", er);
        // });
    // }

    // function getWelcome() {
        // see if server is running -> TODO for developer
        // isServerRunning(GET https://localhost:8443/actuator/health) -> show info "status": "UP"
        // axios("https://localhost:8443/actuator/health")
        //     .then((response) => {
        //         console.log(response.data.status)
        //     }).catch((er) => {
        //     setError("" + er);
        //     console.error("Error occurred fetching random quote: ", er);
        // });
    // }

    useEffect(() => {
        // getWelcome();

        axios("https://localhost:8443/")
            .then((response) => {
                setText(response.data)
            }).catch((er) => {
            setError("" + er);
            console.error("Error occurred fetching random quote: ", er);
        });

        // quotes
        axios("https://localhost:8443/api/quotes")
            .then((response) => {
                setNumberOfQuotes(response.data.length);
                // console.log(numberOfQuotes)
            }).catch((er) => {
            console.error("Error occurred fetching random quote: ", er);
            setError(er);
        });
        axios("https://localhost:8443/api/quotes/random")
            .then((response) => {
                // console.log(response.data)
                setQuote(response.data.text);
                setAuhtor(response.data.author);
            }).catch((er) => {
            console.error("Error occurred fetching random quote: ", er);
            setError("" + er);
        });

        // gebruikers
        axios("https://localhost:8443/api/gebruikers")
            .then((response) => {
                    setNumberOfUsers(response.data.length);
            }).catch((er) => {
            console.error("Error occurred fetching random quote: ", er);
            setError("" + er);
        });

        axios("https://localhost:8443/api/gebruikers/vivalanouk")
            .then((response) => {
                // console.log(response.data)
                setCurrentUsername(response.data.username);
            }).catch((er) => {
            console.error("Error occurred fetching random quote: ", er);
            setError(er);
        });

        axios("https://localhost:8443/api/gebruikers/vivalanouk/authorities")
            .then((response) => {
                let roles = response.data;
                let out = "";
                for (let i = 0; i < roles.length; i++) {
                    out += roles[i].authority + "//"
                }
                setUserRoles(out);
            }).catch((er) => {
            console.error("Error occurred fetching random quote: ", er);
            setError(er);
        });

        axios("https://localhost:8443/api/gebruikers/provincies")
            .then((response) => {
                let provincies = "";
                for (let i = 0; i < response.data.length; i++) {
                    provincies += response.data[i].toLowerCase() + " ";
                }
                setAllProvinces(provincies);
            }).catch((er) => {
            console.error("Error occurred fetching random quote: ", er);
            setError(er);
        });

        axios("https://localhost:8443/api/gebruikers/vivalanouk/xp")
            .then((response) => {
                // console.log(response.data);
                setXp(response.data);
            }).catch((er) => {
            console.error("Error occurred fetching random quote: ", er);
            setError(er);
        });

        axios("https://localhost:8443/api/gebruikers/birthdays")
            .then((response) => {
                setBirthday(response.data[0].username);
            }).catch((er) => {
            console.error("Error occurred fetching random quote: ", er);
            setError(er);
        });


        }, []);

    function Error( {error} ) {
        //TODO add role === developer
        let isDeveloper = true;
        if (isDeveloper) {
            if (error !== 0) {
                return <span>ERROR: {error} </span>
            } else {
                return <>
                    <span>NO ERRORS :-)</span><br/>
                </>
            }
        } else {
            return null
        }
    }
    function Welcome( props ) {
            if (props.serverRunning) {
                let title = props.text
                // const title = props.text.toUpperCase();

                let userIsDeveloper = true;
                if (userIsDeveloper) { //TODO userRole === developer
                    return <>
                        <Padding/>
                        <Error error={props.error}/>
                        <Padding/>
                        <span>STATUS [ UP ]</span>
                        <Padding/>
                        <h2>{title}</h2>
                    </>
                }
                // success
                return <>
                    <h2>{title}</h2>
                </>
            } else { // error on server side
                return <h2>API niet online</h2>
            }
    }
    function Padding( {size} ) {
        if (size) {
            return <hr className='m'/>
        } else {
            return <hr/>
        }
    }
    function TitleAndTotal( props ) {

        return <>
            <h3>{props.title}</h3>
            <Padding/>
            <p>Total {props.title} = {props.count} </p>
            <Padding/>
        </>
    }
    function Quote( props){
        return <>
            <div>
                <p> {props.author} </p>
                <p> {props.text} </p>
            </div>
            <Padding/>
        </>
    }

    // function Section( props ) {
    //     switch (props.isType) {
    //         case 0:
    //             return <>
    //                 <div>
    //                     <Content
    //                     title = {props.title}
    //                     count = {props.count}
    //                     author ={props.author}
    //                     text = {props.text}/>
    //                     <Padding/>
    //                 </div>
    //             </>
    //         case 1:
    //             return <>
    //                 <section>
    //                     <Content
    //                         title = {props.title}
    //                         count = {props.count}
    //                     />
    //                 </section>
    //             </>
    //         default:
    //             break;
    //     }
    //     return <></>
    // }

    function UserRoles( {roles} ) {
        let arr = String(roles);
        arr = arr.split("//");
        return <>
            <ul>
                <li><code>
                    {arr[0]} {arr[1]}
                </code></li>
                <li><code>{arr[2]} {arr[3]}</code></li>
            </ul>
        </>
    }
    function Provincies( {provincies} ) {
        let arr = String(provincies.toUpperCase());
        arr = arr.split(" ");
        return <>
            <ul>
                <li><code>
                    {arr[0]} {arr[1]} {arr[2]} {arr[3]} {arr[4]} {arr[5]} {arr[6]}
                </code></li>
                <li><code>
                    {arr[7]} {arr[8]} {arr[9]} {arr[10]} {arr[11]} {arr[12]}
                </code></li>
            </ul>
        </>
    }
    return <>
        <div id='api'>
            <Welcome
                error={error}
                serverRunning={serverRunning}
                text={text}/>

            <Padding/>

            <div>
                <TitleAndTotal
                    title = "QUOTES"
                    count = {numberOfQuotes}/>
                <Quote
                    author={author}
                    text={quote}/>
                <Padding/>
            </div>

            <Padding/>

            <section>
                <TitleAndTotal
                    title = "GEBRUIKERS"
                    count = {numberOfUsers}/>
                <Padding/>
                <UserRoles
                    roles = {userRoles}
                />
                <Padding/>
                <Provincies
                    provincies={allProvinces}/>

                <p>Gebruiker die vandaag jarig is: <span>@{birthday}</span></p>
            </section>

        </div>
    </>
}
// <Cards id='how-to'
//        items = { howTos }
//        styling = 'steps'
// />
// <p onClick={
//     () => {
//         console.log('clicked')
//         handleChange(2)
//     }} className='btn call-to-action'>
//     Lees verder
// </p>
function Gardening( { handleChange } ) {
    // card content
    const months = [
        {
            title: 'Januari',
            description: 'In deze maand...',
            todo: [
                '1',
                '2',
                '3',
                '4',
                '5',
                '1',
                '2',
                '3',
                '4',
                '5',
            ]
        },
        {
            title: 'Februari',
            description: 'In deze maand...',
            todo: [
                '1',
                '2',
                '3',
                '4',
                '5',
                '1',
                '2',
                '3',
                '4',
                '5',
                '1',
                '2',
                '3',
                '4',
                '5',
            ]
        },
        {
            title: 'Maart',
            description: 'In deze maand...',
            todo: [
                '1',
                '2',
                '3',
                '4',
                '5',
            ]
        },
        {
            title: 'April',
            description: 'In deze maand...',
            todo: [
                '1',
                '2',
                '3',
                '4',
                '5',
            ]
        },
        {
            title: 'Mei',
            description: 'In deze maand...',
            todo: [
                '1',
                '2',
                '3',
                '4',
                '5',
            ]
        },
        {
            title: 'Juni',
            description: 'In deze maand...',
            todo: [
                '1',
                '2',
                '3',
                '4',
                '5',
            ]
        },
        {
            title: 'Juli',
            description: 'In deze maand...',
            todo: [
                '1',
                '2',
                '3',
                '4',
                '5',
            ]
        },
        {
            title: 'Augustus',
            description: 'In deze maand...',
            todo: [
                '1',
                '2',
                '3',
                '4',
                '5',
            ]
        },
        {
            title: 'September',
            description: 'In deze maand...',
            todo: [
                '1',
                '2',
                '3',
                '4',
                '5',
            ]
        },
        {
            title: 'Oktober',
            description: 'In deze maand...',
            todo: [
                '1',
                '2',
                '3',
                '4',
                '5',
            ]
        },
        {
            title: 'November',
            description: 'In deze maand...',
            todo: [
                '1',
                '2',
                '3',
                '4',
                '5',
            ]
        },
        {
            title: 'December',
            description: 'In deze maand...',
            todo: [
                '1',
                '2',
                '3',
                '4',
                '5',
            ]
        },
    ]
    console.log(months)
    return <>
        <Cards id='gardening'
               items = { months }
               styling = 'months'
        />
        <CallToAction
            type = { 0 }
            title = 'Ik wil lid worden!'
            onClick = { () => console.log('hello')}
        />
        <CallToAction
            type = { 0 }
            title = 'Nog steeds niet overtuigd?'
            onClick = { () => handleChange(+1) }
        />
    </>
}

function Content( { step, handleChange } ) {
    switch (step) {
        case 1:
            // how to's
            return <HowTo
                handleChange = { handleChange }
            />
        case 2:
            // 12 maanden tuinieren
            return <Gardening
                handleChange = { handleChange }
            />
    }
}

export function InfoContent( props ) {
    const [ step, setStep ] = useState(1);

    return <>
        <main>
            <Content
                step = { step }
                handleChange = { setStep }
            />
        </main>
    </>
}