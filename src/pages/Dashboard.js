import {ListDataProvider} from "../context/ListDataContext";
import QuotesList from "../components/listitems/Quotes/QuotesDashboard";
import UsersList from "../components/listitems/Users/UsersList";
import TasksList from "../components/listitems/Tasks/TasksList";
import PageHeader from "../components/pageitems/PageHeader";
import {useContext, useEffect, useState} from "react";
import {AuthDataContext} from "../context/AuthDataContext";
import PageContent from "../components/pageitems/PageContent";
import axios from "axios";
import {toast} from "react-toastify";
import {InputFieldWithIcon, Username} from "../components/forms/FormItems";
import {FiMinus, FiPlus, FiUser, FiX} from "react-icons/fi";
import {refreshPage} from "../helpers/functions";
import QuoteDataContext, {QuoteDataContextProvider} from "../context/QuoteDataContext";
import DashboardTopic from "../components/pageitems/DashboardTopic";
import {BsFillChatLeftQuoteFill, BsFillChatQuoteFill} from "react-icons/all";
import QuoteItem from "../components/listitems/Quotes/QuoteItem";
import QuotesDashboard from "../components/listitems/Quotes/QuotesDashboard";

function Dashboard() {
    const { auth, hasUserRole } = useContext(AuthDataContext);
    const { quotes } = useContext(QuoteDataContext);
    const [isMod, setIsMod] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const [showForm, setShowForm] = useState(false);
    const [foundUser, setFoundUser] = useState(null);
    const [foundQuote, setFoundQuote] = useState({
        text: '',
        author: '',
    });
    let {text, author} = foundQuote;

    const [showUserAndRoles, toggleShowUserAndRoles] = useState(false);
    const [showQuotes, toggleShowQuotes] = useState(false);

    let topics = [
        {
            id: 2,
            title: 'users',
            list: <UsersList />,
        },
    ]
    // console.log(topics)

    let today = new Date().toDateString();
    let theseQuotes = [];
    if(quotes) {
        theseQuotes = [...quotes]
    }

    const handleChange = (e) => {
        setFoundUser(e.target.value)
    }
    const handleFindUser = async (e) => {
        e.preventDefault();
        console.log('trying to find user with username', foundUser)
        if (auth.user.username === foundUser) {
            toast.error('Je kunt jezelf niet veranderen')
        } else {
            try {
                const result = await axios.get(`https://localhost:8443/api/gebruikers/${foundUser}/authorities`, {
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                // console.log(result.data)
                for (let authority in result.data) {
                    // console.log(result.data[authority].authority)
                    if (result.data[authority].authority === 'ROLE_MODERATOR') { setIsMod(true) }
                    if (result.data[authority].authority === 'ROLE_ADMIN') { setIsAdmin(true) }
                }
                setShowForm(true);
            } catch (e) {
                console.error(e);
                console.log(e.response);
                toast.error('gebruiker niet gevonden');
            }
        }
    }
    const handleAdd = async (role) => {
        if(window.confirm(`Je staat op het punt gebruiker ${foundUser} rechten te geven voor rol ${role.substr(5)} `)) {
            // console.log('changing role from user', role);
            try {
                const result = await axios.post(`https://localhost:8443/api/gebruikers/${foundUser}/authorities`,
                    {
                        "username": foundUser,
                        "authority": role
                    },
                    {
                        headers: {
                            "Content-Type": 'application/json',
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                console.log(result.data)
                refreshPage();
            } catch (e) {
                console.error(e)
                console.log(e.response)
            }
        }
    }
    const handleDelete = async (role) => {
        if (window.confirm(`Je staat op het punt de rechten van rol ${role.substr(5)} gebruiker ${foundUser} te verwijderen, weet je het zeker?`)) {
            console.log('changing role from user');
            try {
                const result = await axios.delete(`https://localhost:8443/api/gebruikers/${foundUser}/authorities/${role.substr(5)}`,
                    {
                        "username": foundUser,
                        "authority": role
                    },{
                        headers: {
                            "Content-Type": 'application/json',
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                console.log(result.data)
                refreshPage();
            } catch (e) {
                console.error(e)
                console.log(e.response)
            }
        }
    }
    const handleDeleteUser = async () => {
        if (window.confirm(`DANGER ZONE, weet je zeker dat je gebruiker ${foundUser} wilt verwijderen?`)) {
            try {
                const result = await axios.delete(`https://localhost:8443/api/gebruikers/${foundUser}`,{
                        headers: {
                            "Content-Type": 'application/json',
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                console.log(result.data)
                refreshPage();
            } catch (e) {
                console.error(e)
                console.log(e.response)
            }
        }
    }

    const handleSubmitQuote = async () => {

    }
    const handleChangeQuote = (e) => {
        console.log(e.target.id, e.target.value);
        setFoundQuote({
            ...foundQuote,
            [e.target.id]: e.target.value,
        })
    }
    const handleUpdateQuote = () => {

    }


    return <>
            <PageHeader title={auth.user.username}/>
            <PageContent>
                <div id='moderator-dashboard'>
                <DashboardTopic
                    image={'https://images.unsplash.com/photo-1641951820920-c90394aef512?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'}
                    imageAlt={'teamwork'}
                    title={'Gebruikers en Rollen'}
                    handleOnClick={() => toggleShowUserAndRoles((prevState => !prevState))}
                >
                    {
                        showUserAndRoles &&  <form id='user-and-roles' onSubmit={handleFindUser}>
                            <Username iconSize={20} username={foundUser} onChange={handleChange}/>
                            <button className='btn btn-call-to-action' type='submit' onClick={handleFindUser}>Vind gebruiker</button>
                            {
                                showForm && <>
                            <span>
                                { isMod
                                    ? <FiMinus onClick={() => handleDelete('ROLE_MODERATOR')}/>
                                    : <FiPlus onClick={() => handleAdd('ROLE_MODERATOR')}/>} MODERATOR</span>
                                    { hasUserRole('ROLE_ADMIN') && <><span>
                                        { isAdmin
                                            ? <FiMinus onClick={() => handleDelete('ROLE_ADMIN')}/>
                                            : <FiPlus onClick={() => handleAdd(('ROLE_ADMIN'))}/>} ADMIN</span>
                                        <span onClick={handleDeleteUser}><FiX/>VERWIJDER GEBRUIKER</span></>
                                    }
                                </>
                            }
                        </form>
                    }
                </DashboardTopic>
                <DashboardTopic
                    image={'https://images.unsplash.com/photo-1542908220-73cc48ad0af3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'}
                    imageAlt={'quote of the day'}
                    title="Quote's"
                    handleOnClick={() => toggleShowQuotes((prevState => !prevState))}
                >
                    <QuoteDataContextProvider>
                    {
                        showQuotes && <QuotesDashboard/>
                    }
                    </QuoteDataContextProvider>
                </DashboardTopic>

                </div>


            </PageContent>

    </>
}

export default Dashboard;