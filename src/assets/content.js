

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
    const [error, setError] = useState(0);
    const [text, setText] = useState();

    const [numberOfQuotes, setNumberOfQuotes] = useState(0);
    const [quote, setQuote] = useState("");
    const [author, setAuhtor] = useState("");

    const [numberOfUsers, setNumberOfUsers] = useState(0);
    const [allUsers, setAllUsers] = useState({});
    const [currentUsername, setCurrentUsername] = useState("");


    useEffect(() => {
        axios("https://localhost:8443/")
            .then((response) => {
                setText(response.data)
            }).catch((er) => {
            console.error("Error occurred fetching random quote: ", er);
            setError(er);
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
            setError(er);
        });

        // gebruikers
        axios("https://localhost:8443/api/gebruikers")
            .then((response) => {
                    setNumberOfUsers(response.data.length);
            }).catch((er) => {
            console.error("Error occurred fetching random quote: ", er);
            setError(er);
        });

        axios("https://localhost:8443/api/gebruikers/vivalanouk")
            .then((response) => {
                // console.log(response.data)
                setCurrentUsername(response.data.username);
            }).catch((er) => {
            console.error("Error occurred fetching random quote: ", er);
            setError(er);
        });

        let url = "https://localhost:8443/api/gebruikers/vivalanouk/authorities"
        axios(url)
            .then((response) => {
                let all = [ [response.data], '2'];
                console.log(all)
            }).catch((er) => {
            console.error("Error occurred fetching random quote: ", er);
            setError(er);
        });


        }, []);

    return <>
        <div id='api'>
            <h2>{text}</h2>
            <hr/>

            <div>
                <h3>Quotes</h3>
                <hr/>
                <p>Total quotes = {numberOfQuotes} </p>
                <hr/>
                <div>
                    <p> {author} - {quote}  </p>
                </div>
                <hr/>
            </div>

            <section>
                <h3>Gebruikers</h3>
                <hr/>
                <p>Total gebruikers = { numberOfUsers } <br/> current user = {currentUsername} </p>
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