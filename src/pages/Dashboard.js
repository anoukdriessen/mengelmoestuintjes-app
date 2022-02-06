import PageHeader from "../components/pageitems/PageHeader";
import {useContext, useState} from "react";
import {AuthDataContext} from "../context/AuthDataContext";
import PageContent from "../components/pageitems/PageContent";
import {QuoteDataContextProvider} from "../context/QuoteDataContext";
import DashboardTopic from "../components/pageitems/DashboardTopic";
import QuotesDashboard from "../components/listitems/Quotes/QuotesDashboard";
import UserAndRolesDashboard from "../components/listitems/Users/UserAndRolesDashboard";
import {UserDataContextProvider} from "../context/UserDataContext";
import {FiArrowRight} from "react-icons/all";

function Dashboard() {
    const { auth } = useContext(AuthDataContext);
    const [foundQuote, setFoundQuote] = useState({
        text: '',
        author: '',
    });
    let {text, author} = foundQuote;

    const [showPlants, toggleShowPlants] = useState(true);
    const [showUserAndRoles, toggleShowUserAndRoles] = useState(true);
    const [showQuotes, toggleShowQuotes] = useState(true);
    const [showNotes, toggleShowNotes] = useState(true);
    const [showBlog, toggleShowBlog] = useState(true);
    const [showAcademy, toggleShowAcademy] = useState(true);


    return <>
            <PageHeader title={auth.user.username}/>
            <PageContent>
                <span className={'link'}>
            <sup>scroll</sup><FiArrowRight size={23}/>
        </span>
                <div id='moderator-dashboard'>
                    <DashboardTopic
                        image={'https://images.unsplash.com/photo-1495908333425-29a1e0918c5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'}
                        imageAlt={'planten'}
                        title={'Planten DB'}
                        handleOnClick={() => toggleShowPlants((prevState => !prevState))}
                    >
                        { showPlants && <><h3 className={'writing'}>Coming Soon</h3></>}
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
                    {
                        showNotes && <><h3 className={'writing'}>Coming Soon</h3></>
                    }
                </DashboardTopic>
                    <DashboardTopic
                        image={'https://images.unsplash.com/photo-1642715614665-8e5534e7e427?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=557&q=80'}
                        imageAlt={'Blogberichten'}
                        title="Wat is jouw volgende verhaal?"
                        handleOnClick={() => toggleShowBlog((prevState => !prevState))}
                    >
                        {
                            showBlog && <><h3 className={'writing'}>Coming Soon</h3></>
                        }
                    </DashboardTopic>
                    <DashboardTopic
                        image={'https://images.unsplash.com/photo-1527525443983-6e60c75fff46?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=385&q=80'}
                        imageAlt={'de academy'}
                        title="Mengelmoestuintjes, de academy"
                        handleOnClick={() => toggleShowAcademy((prevState => !prevState))}
                        >
                        {
                            showAcademy && <><h3 className={'writing'}>Coming Soon</h3></>
                        }
                    </DashboardTopic>
                </div>


            </PageContent>

    </>
}

export default Dashboard;