import {useContext, useState} from "react";
import Card from "../../listitems/Card";
import TasksDataContext from "../../../context/TasksDataContext";
import {AuthDataContext} from "../../../context/AuthDataContext";
import {refreshPage} from "../../../helpers/functions";
import {GiSave} from "react-icons/all";

function GardenTaskForm(){
    const {auth} = useContext(AuthDataContext)
    const {addNewTask} = useContext(TasksDataContext)
    const [task, setTask] = useState('');
    const handleSaveTask = () => {
        let newTask = {
            type: 'GARDENING',
            title: task,
        }
        addNewTask(auth.user, newTask);
        refreshPage();
    }
    const handleChange = (e) => {
        console.log(e.target.value)
        setTask(e.target.value)
    }

    return <Card className='add-garden-note'>
        <textarea
               id='title'
               placeholder={'Wat wordt je volgende taak?'}
               value={task}
               onChange={handleChange}
               maxLength={255}
        />
        <button className='submit-save' onClick={handleSaveTask}><GiSave/></button>
    </Card>
}

export default GardenTaskForm;