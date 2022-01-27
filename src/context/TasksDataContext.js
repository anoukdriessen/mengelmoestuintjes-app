import {createContext, useContext, useEffect, useState} from "react";
import {AuthDataContext} from "./AuthDataContext";
import axios from "axios";

export const TasksDataContext = createContext({});

export const TasksDataContextProvider = ({ children }) => {
    const { auth } = useContext(AuthDataContext)
    const [isLoading, setIsLoading] = useState();

    // TO DO
    const [toDoTasks, setToDoTasks] = useState([]);
    const [top3Today, setTop3Today] = useState([]);
    const [toDoExpired, setToDoExpired] = useState([]);
    const [toDoToday, setToDoToday] = useState([]);
    const [toDoTomorrow, setToDoTomorrow] = useState([]);
    const [toDoSoon, setToDoSoon] = useState([])

    // GARDENING
    useEffect(() => {
        fetchToDoTasks()
    }, [])

    const fetchToDoTasks = async () => {
        setIsLoading(true);
        try {
            if (auth.isAuth) {
                const response = await axios.get(`https://localhost:8443/api/gebruikers/${auth.user.username}/taken/TODO`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                console.log('fetch to do', response);
                setToDoTasks(response.data);
                setIsLoading(false);
            }
        } catch (e) {
            console.error(e)
            console.log(e.response)
        }
    }

    const contextData = {
        toDoTasks,
    }

    return <TasksDataContext.Provider
        value={contextData}
    >
        { isLoading
            ? <p>Loading...</p>
            : children
        }
    </TasksDataContext.Provider>
}

export default TasksDataContext;