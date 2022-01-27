import {FiCalendar, FiEdit, FiSave, FiSettings, GiChecklist, GiCheckMark, GiSave} from "react-icons/all";
import {useContext, useState} from "react";
import {
    convertToMyDateFormat,
    getNextIndex,
    getToday,
    getTomorrow,
    getUniqueId,
    refreshPage
} from "../../helpers/functions";
import UserDataContext from "../../context/UserDataContext";
import axios from "axios";
import {FiX} from "react-icons/fi";
import {InputFieldWithIcon} from "./FormItems";
import ToDoTaskList from "../listitems/Tasks/ToDoTaskList";
import PostsDataContext from "../../context/TasksDataContext";

function ToDoListForm({thisUser, showForm, toggleShowToDo, formActive}) {
    const {toDoTasks} = useContext(PostsDataContext);
    const [length, setLength] = useState(0);
    const [update, setUpdate] = useState(false);
    const [toUpdate, setToUpdate] = useState(0);

    const [task, setTask] = useState({
        'type': 'TODO',
        'title': '',
        'done': false,
        'deadline': getToday()
    })
    const {title, done, deadline} = task;

    const handleChange = (e) => {
        if (e.target.id === 'title') {
            setLength(e.target.value.length)
        }
        setTask((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }
    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!update) {
            // add new task
            try {
                const result = await axios.post(`https://localhost:8443/api/taken?username=${thisUser.username}`,
                    task,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                console.log(result)
            } catch (e) {
                console.error(e);
                console.log(e.response);
            }
        } else {
            // update task
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
                setToUpdate(0);
                setUpdate(false);
            } catch (e) {
                console.error(e);
                console.log(e.response);
            }

        }
        refreshPage()
    }
    const handleEdit = async (taskId) => {
        formActive(true);
        // console.log('edit');
        let taskToChange;
        try {
            // find task by id
            const find = await axios.get(`https://localhost:8443/api/taken/${taskId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
            taskToChange = find.data;
            setTask({
                'type': 'TODO',
                'title': taskToChange.title,
                'done': false,
                'deadline': taskToChange.deadline
            })
            setToUpdate(taskId);
            setUpdate(true);
            // console.log(taskToChange.done)
        } catch (e) {
            console.error(e)
            console.log(e.response)
        }
    }
    const handleDelete = async (taskId) => {
        console.log('delete', taskId);
        if (window.confirm(`Je staat op het punt de taak te verwijderen. Weet je het zeker?`)) {
            try {
                await axios.delete(`https://localhost:8443/api/taken/${taskId}`,
                    null,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                // console.log(result)
                refreshPage()
            } catch (e) {
                console.error(e);
                console.log(e.response);
            }
        }
    }
    const handleFinished = async (e) => {
        let taskToChange;
        try {
            // find task by id
            const find = await axios.get(`https://localhost:8443/api/taken/${e.target.id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
            taskToChange = find.data;
            // console.log(taskToChange.done)
        } catch (e) {
            console.error(e)
            console.log(e.response)
        }
        if (taskToChange.deadline < getToday()) {
            // task was expired
            await handleDelete(e.target.id);
        } else {
            try {
                const result = await axios.put(`https://localhost:8443/api/taken/${e.target.id}/${!taskToChange.done}`,
                    null,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                console.log(result)
            } catch (e) {
                console.error(e);
                console.log(e.response);
            }
        }
        refreshPage()
    }

    return <>
        {showForm && <form id='to-do-list' onSubmit={handleAddTask}>
            <InputFieldWithIcon icon={<GiCheckMark/>}>
                <textarea
                    id='title'
                    placeholder='Wat wordt je volgende taak?'
                    value={title}
                    onChange={handleChange}
                    autoFocus={true}
                    maxLength={255}
                />
            </InputFieldWithIcon>
            <span className={length > 254 ? 'too-long' : ''}>
                    {length > 254 && 'maximaal aantal tekens bereikt'}
            </span>
            <InputFieldWithIcon icon={<FiCalendar/>}>
                <input
                    id='deadline'
                    type='date'
                    value={deadline}
                    onChange={handleChange}
                />
            </InputFieldWithIcon>
            <button type='submit' className='submit-save'>
                {update ? <FiEdit size={20}/> : <GiSave size={20}/>}
            </button>
        </form>
        }
        <ToDoTaskList
            showForm={toggleShowToDo}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleFinished={handleFinished}
        />
    </>
}

export default ToDoListForm;