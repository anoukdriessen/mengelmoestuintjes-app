import {createContext, useContext, useEffect, useState} from "react";
import {AuthDataContext} from "./AuthDataContext";
import axios from "axios";
import {getToday, getTomorrow} from "../helpers/functions";

export const TasksDataContext = createContext({});

export const TasksDataContextProvider = ({ children }) => {
    const { auth } = useContext(AuthDataContext)
    const [isLoading, setIsLoading] = useState();

    const [toDo, setToDo] = useState({
        item: {
            id: 0,
            type: '',
            title: '',
            done: false,
            deadline: getToday()
        },
        edit: false
    })

    // TO DO
    const [toDoTasks, setToDoTasks] = useState([]);

    // GARDENING
    const [toDoGardening, setToDoGardening] = useState([]);

    useEffect(() => {
        fetchToDoTasks()
    }, [toDo])

    // CREATE
    const createNewTask = async (thisUser, task) => {
        let newTask = {
            'type': task.type,
            'title': task.title,
            'done': false,
            'deadline': getToday(),
        }
        try {
            const result = await axios.post(`https://localhost:8443/api/taken?username=${thisUser.username}`,
                newTask,{
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
            console.log(result.data)
            setToDo(result.data)
            setToDoTasks([...toDoTasks, result.data]);
        } catch (e) {
            console.error(e);
            console.log(e.response);
        }
    }

    // READ
    const fetchTaskById = async (taskId) => {
        try {
            // find task by id
            const find = await axios.get(`https://localhost:8443/api/taken/${taskId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
            return find.data;
        } catch (e) {
            console.error(e)
            console.log(e.response)
        }
    }

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
                // console.log('fetch to do', response);
                setToDoTasks(response.data);
                setIsLoading(false);
            }
        } catch (e) {
            console.error(e)
            console.log(e.response)
        }
    }

    const fetchGardeningTasks = async () => {
        setIsLoading(true);
        try {
            if (auth.isAuth) {
                const response = await axios.get(`https://localhost:8443/api/gebruikers/${auth.user.username}/taken/GARDENING`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                // console.log('fetch to do', response);
                setToDoGardening(response.data);
                setIsLoading(false);
            }
        } catch (e) {
            console.error(e)
            console.log(e.response)
        }
    }


    // UPDATE
    const updateTask = async (toUpdate, task) => {
        setToDo({
            item: {
                id: toUpdate.id,
                type: toUpdate.type,
                title: toUpdate.text,
                done: toUpdate.done,
                deadline: toUpdate.deadline
            },
            edit: true,
        })
        try {
            const result = await axios.put(`https://localhost:8443/api/taken/${toUpdate}`,
                task,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
            console.log(result);
            setToDo({
                ...toDo,
                edit: false,
            })
        } catch (e) {
            console.error(e);
            console.log(e.response);
        }
    }

    const finishTask = async (taskToFinish, taskId) => {
        try {
            await axios.put(`https://localhost:8443/api/taken/${taskId}/${!taskToFinish.done}`,
                null,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
            // console.log(result)
        } catch (e) {
            console.error(e);
            console.log(e.response);
        }
    }

    // DELETE
    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`https://localhost:8443/api/taken/${taskId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
            // console.log(result)
        } catch (e) {
            console.error(e);
            console.log(e.response);
        }
    }

    const contextData = {
        toDo,
        createNewTask,
        fetchTaskById,
        toDoTasks,
        fetchGardeningTasks,
        toDoGardening,
        updateTask,
        finishTask,
        deleteTask,
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