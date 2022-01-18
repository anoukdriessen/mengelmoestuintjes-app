import {ListDataProvider} from "../context/ListDataContext";
import QuotesList from "../components/listitems/Quotes/QuotesList";
import Header from "../components/Header";
import UsersList from "../components/listitems/Users/UsersList";
import TasksList from "../components/listitems/Users/Tasks/TasksList";

function Dashboard(props) {
    let user = {
        ...props.user,
        username: 'vivalanouk'
    }
    let title = 'Dashboard ' + user.username


    let topics = [
        {
            id: 0,
            title: 'taken',
            subpages: [
                'vandaag',
                'morgen',
                'deze maand'
            ],
            list: <TasksList type={0}/>,
        },
        {
            id: 1,
            title: 'quotes',
            list: <QuotesList />,
        },
        {
            id: 2,
            title: 'users',
            list: <UsersList />,
        },
        {
            id: 3,
            title: 'academy'
        },
        {
            id: 4,
            title: 'blog'
        },
        {
            id: 5,
            title: 'planten',
            subpages: [
                'bloemen',
                'groenten',
                'fruit',
                'kruiden'
            ]
        },
    ]
    // console.log(topics)

    let today = new Date().toDateString();
    return <ListDataProvider>
            <Header
                title={title}
                page={props.page}
                isLoggedIn={props.isLoggedIn}
                user = {user}
            />
            <div id='dashboard-nav'>
                <ul>
                {
                    topics.map((topic) => {
                        // console.log(topic.subpages)
                        return <li key={topic.title + topic.id}>
                            <a href={'#' + topic.title}>
                                #{topic.title}
                            </a>
                        </li>
                    })
                }
                    { today }
                </ul>
            </div>
        <div className={'dashboard-content'}>
            {
                topics.map((topic) => {
                    return <div key={topic.title + topic.id} id={topic.title}>
                        <h3>#{topic.title}</h3>
                        {topic.list}
                    </div>
                })
            }
        </div>

    </ListDataProvider>
}

export default Dashboard;