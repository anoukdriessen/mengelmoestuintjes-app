import {FiEdit, FiEditGiSave, GiSave} from "react-icons/all";
import {useContext, useState} from "react";
import {
    getToday,
    refreshPage
} from "../../../helpers/functions";
import { SimpleDateInput, SimpleTextArea} from "../FormItems";
import ToDoTaskList from "../../listitems/Tasks/ToDoTaskList";
import TasksDataContext from "../../../context/TasksDataContext";
import {AuthDataContext} from "../../../context/AuthDataContext";
import Form from "../Form";

function ToDoListForm({showForm, toggleShowToDo, formActive}) {
    const { auth, giveUserXp } = useContext(AuthDataContext);

    const { toDo, createNewTask, updateTask, fetchTaskById, deleteTask, finishTask } = useContext(TasksDataContext);
    const [length, setLength] = useState(0);
    const [update, isUpdate] = useState(false);
    const [toUpdate, setToUpdate] = useState(0);

    const [task, setTask] = useState({
        'type': 'TODO',
        'title': '',
        'done': false,
        'deadline': getToday()
    })
    const {title, deadline} = task;

    const clearFields = () => {
        setTask({
            'type': 'TODO',
            'title': '',
            'done': false,
            'deadline': getToday()
        })
    }

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
        if (!update) { // add new task
            await createNewTask(auth.user, task);
            giveUserXp(10);
            clearFields();
        } else { // update task
            toDo.edit = false;
            toDo.item = task;
            await updateTask(toUpdate, task);
            isUpdate(false);
            clearFields();
        }
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
            isUpdate(true);
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
        {showForm && <Form
            type={'primary'}>

            <SimpleTextArea
                iconSize={15}
                item={title}
                name={'title'}
                placeHolder={'Wat wordt je volgende taak?'}
                onChange={handleChange}
                isRequired={true}
                max={255}
            />
            <span className={length > 254 ? 'too-long' : ''}>
                    {length > 254 && 'maximaal aantal tekens bereikt'}
            </span>
            <SimpleDateInput
                value={deadline}
                handleChange={handleChange}
            />
            <button type='button' className='submit-save' onClick={handleAddTask}>
                {update ? <FiEdit size={20}/> : <GiSave size={20}/>}
            </button>
        </Form>
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