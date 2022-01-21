import {useContext, useEffect, useState} from "react";
import ListDataContext from "../../../../context/ListDataContext";
import {FiSend} from "react-icons/fi";
import Button from "../../../Button";
import Card from "../../Card";

function TaskForm() {
    const {createTask, toUpdate, updateTask} = useContext(ListDataContext);

    let username = 'vivalanouk';
    const [view, setView] = useState(0);
    const [type, setType] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [done, isDone] = useState(false);
    const [deadline, setDeadline] = useState(null);

    const handleTypeChange = (e) => {
        let value = e.target.value;
        if (value === 0) {
            setView(2)
        } else if (value === 1) {
            setView(7)
        } else if (value === 3) {
            setView(30)
        }
        setType(value);
    }
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }
    const handleDoneChange = (e) => {
        isDone(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let newTask = {
            type: 'TODO',
            title,
            description,
            done,
            deadline,
        }

        if (toUpdate.edit === true) {
            console.log('submit update', newTask);
            updateTask(toUpdate.item.id, newTask)
        } else {
            console.log('submit create', newTask);
            createTask(newTask);
        }
    }
    return <Card>
        <form onSubmit={handleSubmit} id={'task-form'}>
            <input type='text'
                   id='title'
                   placeholder={'Wat wordt je volgende taak?'}
                   value= {title}
                   onChange={handleTitleChange}
            />
            <Button type='submit' version='send'>
                <FiSend/>
            </Button>
        </form>
    </Card>
}

export default TaskForm;