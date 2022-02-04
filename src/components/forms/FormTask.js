import {useContext, useState} from "react";
import TasksDataContext from "../../context/TasksDataContext";
import {AuthDataContext} from "../../context/AuthDataContext";
import Form from "./Form";
import {SimpleTextArea} from "./FormItems";
import {GiSave} from "react-icons/all";
import {toast} from "react-toastify";
import {refreshPage} from "../../helpers/functions";

function FormTask({taskType}) {
    const { auth, getMessage } = useContext(AuthDataContext);
    const { createNewTask } = useContext(TasksDataContext);

    const [task, setTask] = useState('')
    const [thisTask, setThisTask] = useState({});

    const [isValid, setIsValid] = useState(false);

    const handleSubmit = async () => {
        if (task.length > 1) {
            let newTask = {
                type: taskType,
                title: task,
            }
            // console.log('create task', newTask)
            createNewTask(auth.user, newTask);
            getMessage('success', 'taak is geplaatst')
            toast.success('taak geplaatst');
            refreshPage();
        } else {
            getMessage('error', 'taak mag niet leeg zijn')
            // toast.error('taak mag niet leeg zijn')
        }
    }

    const handleChangeTask = (e) => {
        setTask(e.target.value);
    }

    // const handleChanges = (e) => {
    //     setThisTask({
    //         ...thisTask,
    //         [e.target.id]: e.target.value,
    //     });
    // }

    return <>
        <Form
            type={'primary'}
            onSumbit={handleSubmit}
            isDisabled={!isValid}
        >
            <SimpleTextArea
                iconSize={15}
                item={task}
                name={'title'}
                placeHolder={'Wat wordt je volgende taak?'}
                onChange={handleChangeTask}
                isRequired={true}
                max={255}
            />
            <button type={"button"} className='btn btn-form' onClick={handleSubmit}>
                <GiSave/>Opslaan
            </button>
        </Form>
    </>
}

export default FormTask;