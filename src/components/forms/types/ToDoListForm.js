import {FiCalendar, FiEdit, FiSave, FiSettings, GiChecklist, GiCheckMark, GiSave} from "react-icons/all";
import {useContext, useState} from "react";
import {
    getToday,
    getTomorrow,
    getUniqueId,
    refreshPage
} from "../../../helpers/functions";
import UserDataContext from "../../../context/UserDataContext";
import axios from "axios";
import {FiX} from "react-icons/fi";
import {InputFieldWithIcon} from "../FormItems";
import ToDoTaskList from "../../listitems/Tasks/ToDoTaskList";
import PostsDataContext from "../../../context/TasksDataContext";
import TasksDataContext from "../../../context/TasksDataContext";

function ToDoListForm({thisUser, showForm, toggleShowToDo, formActive}) {
    const { addNewTask, updateTask, fetchTaskById, deleteTask, finishTask } = useContext(TasksDataContext);
    const [length, setLength] = useState(0);
    const [update, setUpdate] = useState(false);
    const [toUpdate, setToUpdate] = useState(0);

    const [task, setTask] = useState({
        'type': 'TODO',
        'title': '',
        'done': false,
        'deadline': getToday()
    })
    const {title, deadline} = task;

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
            addNewTask(thisUser, task);
        } else {
            // update task
            try {
                updateTask(toUpdate, task);
            } catch (e) {
                console.error(e)
                console.log(e.response)
            }
            setToUpdate(0);
            setUpdate(false);
        }
        refreshPage();
    }
    const handleEdit = async (taskId) => {
        try {
            formActive(true);
            let taskToChange = await fetchTaskById(taskId);
            console.log(taskToChange)
            setTask({
                'type': 'TODO',
                'title': taskToChange.title,
                'done': false,
                'deadline': taskToChange.deadline
            })
            setToUpdate(taskId);
            setUpdate(true);
        } catch (e) {
            console.error(e);
            console.log(e.response);
        }
    }
    const handleDelete = async (taskId) => {
        console.log('delete', taskId);
        if (window.confirm(`Je staat op het punt de taak te verwijderen. Weet je het zeker?`)) {
            deleteTask(taskId);
        }
        refreshPage()
    }
    const handleFinished = async (e) => {
        let taskToFinish = await fetchTaskById(e.target.id);
        finishTask(taskToFinish, e.target.id);
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