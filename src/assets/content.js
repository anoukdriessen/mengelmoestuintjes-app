

import {
    getAllPages,
} from "./data";
import Cards from "../components/Cards";
import CallToAction from "../components/CallToAction";
import {useEffect, useState} from "react";
import axios from "axios";
import MainContent from "../components/main/MainContent";
import Learning, {DeveloperDash, Hello, PostsFromUser, TasksFromUser, Users} from "./learning";

const pages = getAllPages();
const info = pages[1];

function HowTo( props ) {
    const [error, setError] = useState(0);                      // error message
    const [serverRunning, isServerRunning] = useState(true);    // see if the server is running // TODO /actuator
    const [title, setTitle] = useState();                                // welcome message

    const [numberOfUsers, setNumberOfUsers] = useState(0);      // count users
    const [current, setCurrent] = useState();                            // current user
    const [stats, setStats] = useState();                                // current user
    const [provinces, setProvinces] = useState(null);           // all provinces
    const [birthdays, setBirthdays] = useState(null);           // all usernames who have their birthday today
    const [authorities, setAuthorities] = useState(null);       // all authorities from current user

    const [sameLevel, setSameLevel] = useState(null);           // all with same level
    const [sameEmail, setSameEmail] = useState(null);           // all with same email
    const [sameProvince, setSameProvince] = useState(null);     // all from same province

    const [publicPosts, setPublicPosts] = useState(null);       // posts from user where published = TRUE
    const [privatePosts, setPrivatePosts] = useState(null);     // posts from user where published = FALSE

    const [tasks, setTasks] = useState(null);                   // tasks to do

    useEffect(() => {
        let baseUrl = 'https://localhost:8443/';

    // welkom
        axios(baseUrl)
            .then((response) => {
                // console.log(response.data)
                setTitle(response.data)
            })
            .catch((er) => {
            setError("" + er);
            console.error("Error occurred fetching welcome: ", er);
        });

    // USERS
        axios("https://localhost:8443/api/gebruikers")
            .then((response) => {
                setNumberOfUsers(response.data.length)
            })
            .catch((er) => {
            setError("" + er);
            console.error("Error occurred fetching all users: ", er);
        });

        // current user info
        axios("https://localhost:8443/api/gebruikers/itiskevin/info")
            .then((response) => {
                // console.log(response.data)
                setCurrent(response.data)
            })
            .catch((er) => {
            setError("" + er);
            console.error("Error occurred fetching current user: ", er);
        });
        // current user authorities
        axios("https://localhost:8443/api/gebruikers/itiskevin/authorities")
            .then((response) => {
                setAuthorities(response.data)
            })
            .catch((er) => {
                setError("" + er);
                console.error("Error occurred fetching current user authorities: ", er);
            });
        // current user stats
        axios("https://localhost:8443/api/gebruikers/itiskevin/xp")
            .then((response) => {
                // console.log(response.data)
                setStats(response.data)
            })
            .catch((er) => {
                setError("" + er);
                console.error("Error occurred fetching current user xp: ", er);
            });
        // all provincies
        axios("https://localhost:8443/api/gebruikers/provincies")
            .then((response) => {
                // console.log(response.data)
                setProvinces(response.data)
            })
            .catch((er) => {
                setError("" + er);
                console.error("Error occurred fetching provinces: ", er);
            });
        // who has its birthday today
        axios("https://localhost:8443/api/gebruikers/birthdays")
            .then((response) => {
                // console.log(response.data)
                setBirthdays(response.data)
            })
            .catch((er) => {
                setError("" + er);
                console.error("Error occurred fetching birthday people: ", er);
            });
        // all with specified lvl
        axios("https://localhost:8443/api/gebruikers?level=1")
            .then((response) => {
                // console.log(response.data)
                setSameLevel(response.data)
            })
            .catch((er) => {
                setError("" + er);
                console.error("Error occurred fetching users with same level: ", er);
            });
        // all with specified email
        axios("https://localhost:8443/api/gebruikers?email=mengelmoestuintjes.nl")
            .then((response) => {
                // console.log(response.data);
                setSameEmail(response.data);
            })
            .catch((er) => {
                setError("" + er);
                console.error("Error occurred fetching users with same email: ", er);
            });
        axios("https://localhost:8443/api/gebruikers?province=OVERIJSSEL")
            .then((response) => {
                // console.log(response.data);
                setSameProvince(response.data);
            })
            .catch((er) => {
                setError("" + er);
                console.error("Error occurred fetching users from same province: ", er);
            });
        // gepubliseerde berichten
        axios("https://localhost:8443/api/gebruikers/itiskevin/berichten?published=TRUE")
            .then((response) => {
                // console.log(response.data);
                setPublicPosts(response.data);
            })
            .catch((er) => {
                setError("" + er);
                console.error("Error occurred fetching public posts : ", er);
            });
        // prive berichten
        axios("https://localhost:8443/api/gebruikers/itiskevin/berichten?published=FALSE")
            .then((response) => {
                // console.log(response.data);
                setPrivatePosts(response.data);
            })
            .catch((er) => {
                setError("" + er);
                console.error("Error occurred fetching private posts: ", er);
            });
        // to do tasks
        axios("https://localhost:8443/api/gebruikers/gebruiker/taken/TODO")
            .then((response) => {
                // console.log(response.data);
                let tasks = [];
                for(let task in response.data) {
                    tasks[task] = response.data[task]
                    // console.log(response.data[task])
                }
                setTasks(tasks);
            })
            .catch((er) => {
                setError("" + er);
                console.error("Error occurred fetching to do tasks : ", er);
            });

        // axios("https://localhost:8443/api/")
        //     .then((response) => {
        //         // console.log(response.data);
        //
        //     })
        //     .catch((er) => {
        //         setError("" + er);
        //         console.error("Error occurred fetching : ", er);
        //     });

        }, []);

    return <>
        <div id='api'>

            <DeveloperDash
                isDeveloper = {true}
                isServerRunning = {serverRunning}
                error = {error}
            />

            <hr/>

            <Hello
                user={current}
                title={title}
            />

            <Users
                title = {"GEBRUIKERS"}
                count = {numberOfUsers}
                user = {current}
                stats = {stats}
                provinces = {provinces}
                birthdays = {birthdays}
                authorities = {authorities}
                withLevel = {sameLevel}
                withEmail = {sameEmail}
                fromProvince = {sameProvince}
            />
            <hr/>
            <h3>Public posts</h3>
            <PostsFromUser
                posts = {publicPosts}
            />
            <hr/>
            <h3>Private posts</h3>
            <PostsFromUser
                posts = {privatePosts}
            />
            <hr/>
            <h3>Taken van gebruiker</h3>
            <hr/>
            <h4>TODO</h4>
            <TasksFromUser
                tasks = {tasks}
            />

        </div>
    </>
}

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