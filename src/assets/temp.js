import {useState} from "react";
import Cards from "../components/Cards";
import CallToAction from "../components/CallToAction";

const [numberOfQuotes, setNumberOfQuotes] = useState(0);
const [quote, setQuote] = useState("");
const [author, setAuhtor] = useState("");

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

//
// // quotes
// axios("https://localhost:8443/api/quotes")
//     .then((response) => {
//         setNumberOfQuotes(response.data.length);
//         // console.log(numberOfQuotes)
//     }).catch((er) => {
//     console.error("Error occurred fetching random quote: ", er);
//     setError(er);
// });
// axios("https://localhost:8443/api/quotes/random")
//     .then((response) => {
//         // console.log(response.data)
//         setQuote(response.data.text);
//         setAuhtor(response.data.author);
//     }).catch((er) => {
//     console.error("Error occurred fetching random quote: ", er);
//     setError("" + er);
// });
//
// // gebruikers
// axios("https://localhost:8443/api/gebruikers")
//     .then((response) => {
//             setNumberOfUsers(response.data.length);
//     }).catch((er) => {
//     console.error("Error occurred fetching random quote: ", er);
//     setError("" + er);
// });
//

//
// axios("https://localhost:8443/api/gebruikers/vivalanouk/authorities")
//     .then((response) => {
//         let roles = response.data;
//         let out = "";
//         for (let i = 0; i < roles.length; i++) {
//             out += roles[i].authority + "//"
//         }
//         setUserRoles(out);
//     }).catch((er) => {
//     console.error("Error occurred fetching random quote: ", er);
//     setError(er);
// });
//
// axios("https://localhost:8443/api/gebruikers/provincies")
//     .then((response) => {
//         let provincies = "";
//         for (let i = 0; i < response.data.length; i++) {
//             provincies += response.data[i].toLowerCase() + " ";
//         }
//         setAllProvinces(provincies);
//     }).catch((er) => {
//     console.error("Error occurred fetching random quote: ", er);
//     setError(er);
// });
//
// axios("https://localhost:8443/api/gebruikers/vivalanouk/xp")
//     .then((response) => {
//         // console.log(response.data);
//         setXp(response.data);
//     }).catch((er) => {
//     console.error("Error occurred fetching random quote: ", er);
//     setError(er);
// });
//
// axios("https://localhost:8443/api/gebruikers/birthdays")
//     .then((response) => {
//         setBirthday(response.data[0].username);
//     }).catch((er) => {
//     console.error("Error occurred fetching random quote: ", er);
//     setError(er);
// });
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

// function UserRoles( {roles} ) {
//     let arr = String(roles);
//     arr = arr.split("//");
//     return <>
//         <ul>
//             <li><code>
//                 {arr[0]} {arr[1]}
//             </code></li>
//             <li><code>{arr[2]} {arr[3]}</code></li>
//         </ul>
//     </>
// }
// function Provincies( {provincies} ) {
//     // let arr = String(provincies.toUpperCase());
//     // arr = arr.split(" ");
//     return <>
//         <ul>
//             <li><code>
//                 {arr[0]} {arr[1]} {arr[2]} {arr[3]} {arr[4]} {arr[5]} {arr[6]}
//             </code></li>
//             <li><code>
//                 {arr[7]} {arr[8]} {arr[9]} {arr[10]} {arr[11]} {arr[12]}
//             </code></li>
//         </ul>
//     </>
// }


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