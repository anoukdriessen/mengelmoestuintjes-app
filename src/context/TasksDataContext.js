import {createContext, useContext, useEffect, useState} from "react";
import {AuthDataContext} from "./AuthDataContext";
import axios from "axios";
import {getToday, getTomorrow} from "../helpers/functions";

export const TasksDataContext = createContext({});

export const TasksDataContextProvider = ({ children }) => {
    const { auth } = useContext(AuthDataContext)
    const [isLoading, setIsLoading] = useState();

    // TO DO
    const [toDoTasks, setToDoTasks] = useState([]);

    // GARDENING
    const [toDoGardening, setToDoGardening] = useState([]);



    useEffect(() => {
        fetchToDoTasks()
    }, [])


    // CREATE
    const addNewTask = async (thisUser, task) => {
        try {
            await axios.post(`https://localhost:8443/api/taken?username=${thisUser.username}`,
                task,
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

    const getExpiredTasks = () => {
        let expired = [];
        let count = 0;
        toDoTasks.map((task) => {
            if (task.deadline < getToday()) {
                // get to do expired
                expired[count] = task;
                count++;
            }
        });
        return expired;
    }

    const getTodayTasks = () => {
        let today = [];
        let count = 0;
        toDoTasks.map((task) => {
            if (task.deadline === getToday()) {
                // get to do expired
                today[count] = task;
                count++;
            }
        });
        return today;
    }

    const getTomorrowTasks = () => {
        let tomorrow = [];
        let count = 0;
        toDoTasks.map((task) => {
            if (task.deadline === getTomorrow()) {
                // get to do expired
                tomorrow[count] = task;
                count++;
            }
        });
        return tomorrow;
    }

    const getSoonTasks = () => {
        let soon = [];
        let count = 0;
        toDoTasks.map((task) => {
            if (task.deadline > getTomorrow()) {
                // get to do expired
                soon[count] = task;
                count++;
            }
        });
        return soon;
    }

    // UPDATE
    const updateTask = async (toUpdate, task) => {
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
        addNewTask,
        fetchTaskById,
        toDoTasks,
        getExpiredTasks,
        getTodayTasks,
        getTomorrowTasks,
        getSoonTasks,
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