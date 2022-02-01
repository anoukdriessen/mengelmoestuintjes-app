import {ListDataProvider} from "../../context/ListDataContext";
import QuotesList from "../../components/listitems/Quotes/QuotesDashboard";
import UsersList from "../../components/listitems/Users/UsersList";
import TasksList from "../../components/listitems/Tasks/TasksList";
import PageHeader from "../../components/pageitems/PageHeader";
import {useContext, useEffect, useState} from "react";
import {AuthDataContext} from "../../context/AuthDataContext";
import PageContent from "../../components/pageitems/PageContent";
import axios from "axios";
import {toast} from "react-toastify";
import {InputFieldWithIcon, Username} from "../../components/forms/FormItems";
import {FiMinus, FiPlus, FiUser, FiX} from "react-icons/fi";
import {refreshPage} from "../../helpers/functions";
import QuoteDataContext, {QuoteDataContextProvider} from "../../context/QuoteDataContext";
import DashboardTopic from "../../components/pageitems/DashboardTopic";
import {BsFillChatLeftQuoteFill, BsFillChatQuoteFill} from "react-icons/all";
import QuoteItem from "../../components/listitems/Quotes/QuoteItem";
import QuotesDashboard from "../../components/listitems/Quotes/QuotesDashboard";
import UserAndRoles from "../../components/listitems/Users/UserAndRolesDashboard";
import UserAndRolesDashboard from "../../components/listitems/Users/UserAndRolesDashboard";
import {UserDataContextProvider} from "../../context/UserDataContext";

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

    const [showPlants, toggleShowPlants] = useState(false);
    const [showUserAndRoles, toggleShowUserAndRoles] = useState(false);
    const [showQuotes, toggleShowQuotes] = useState(false);
    const [showNotes, toggleShowNotes] = useState(false);
    const [showBlog, toggleShowBlog] = useState(false);
    const [showAcademy, toggleShowAcademy] = useState(false);

    let today = new Date().toDateString();

    return <>
            <PageHeader title={auth.user.username}/>
            <PageContent>
                <div id='moderator-dashboard'>
                    <DashboardTopic
                        image={'https://images.unsplash.com/photo-1495908333425-29a1e0918c5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'}
                        imageAlt={'planten'}
                        title={'Planten DB'}
                        handleOnClick={() => toggleShowPlants((prevState => !prevState))}
                    >
                        { showPlants && <>planten</>}
                    </DashboardTopic>
                <DashboardTopic
                    image={'https://images.unsplash.com/photo-1641951820920-c90394aef512?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'}
                    imageAlt={'teamwork'}
                    title={'Gebruikers en Rollen'}
                    handleOnClick={() => toggleShowUserAndRoles((prevState => !prevState))}
                >
                    <UserDataContextProvider>
                    {
                        showUserAndRoles &&  <UserAndRolesDashboard />
                    }
                    </UserDataContextProvider>
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
                <DashboardTopic
                    image={'https://images.unsplash.com/photo-1587612049655-c1030366a74a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'}
                    imageAlt={'Development Tasks'}
                    title="NOTE-TO-SELFPad's"
                    handleOnClick={() => toggleShowNotes((prevState => !prevState))}
                >
                {/*  TODO NOTE
                    + note achtergrond veranderen op basis van prio  */}
                    {
                        showNotes && <>notes</>
                    }
                </DashboardTopic>
                    <DashboardTopic
                        image={'https://images.unsplash.com/photo-1642715614665-8e5534e7e427?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=557&q=80'}
                        imageAlt={'Blogberichten'}
                        title="Wat is jouw volgende verhaal?"
                        handleOnClick={() => toggleShowBlog((prevState => !prevState))}
                    >
                        {/*
                          TODO BLOGPOSTS
                          */}
                        {
                            showBlog && <>blogposts</>
                        }
                    </DashboardTopic>
                    <DashboardTopic
                        image={'https://images.unsplash.com/photo-1527525443983-6e60c75fff46?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=385&q=80'}
                        imageAlt={'de academy'}
                        title="Mengelmoestuintjes, de academy"
                        handleOnClick={() => toggleShowAcademy((prevState => !prevState))}
                        >
                    {/*  TODO ACADEMY TOPICS / POSTS  */}
                        {
                            showAcademy && <>de academy</>
                        }
                    </DashboardTopic>
                </div>


            </PageContent>

    </>
}

export default Dashboard;