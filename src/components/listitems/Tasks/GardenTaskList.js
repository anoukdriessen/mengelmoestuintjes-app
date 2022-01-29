import {FiCheckSquare, FiSquare} from "react-icons/all";
import {useContext, useState} from "react";
import TasksDataContext from "../../../context/TasksDataContext";
import {getUniqueId, refreshPage} from "../../../helpers/functions";
import ItemNotFound from "../ItemNotFound";
import {FiPlus} from "react-icons/fi";
import {AuthDataContext} from "../../../context/AuthDataContext";
import {toast} from "react-toastify";

export function GardenToDo({item}) {
    const { auth } = useContext(AuthDataContext);
    const { deleteTask } = useContext(TasksDataContext)
    const [isDone, toggleIsDone] = useState(item.done);

    const handleFinished = async (itemId) => {
        console.log('finish task', itemId);
        if (item.owner === auth.user.username) {
            deleteTask(itemId);
        } else {
            toast.error('Alleen de eigenaar kan de taak voltooien')
        }
    }
    if (!item) {
        return <div className='garden-todo'>
            <FiSquare size={20}/>
        </div>
    } else {
        return <div key={item.id} className={`garden-todo ${isDone ? 'finished' : ''}`}
                    onClick={(e) => {
                        handleFinished(item.id);
                        toggleIsDone((prevState => !prevState));
                    }
                    }>
            {isDone ? <FiCheckSquare size={20}/> : <FiSquare size={20}/>}
            <span className='title'>{item.title}</span>
        </div>
    }
}

function GardenTaskList({tasks, owner}) {
    let count = 0;
    // console.log('in garden to do list', tasks)
    // console.log('in garden to do list', owner)
    return <>
        {
            tasks &&
                tasks.map((task) => {
                    // console.log(task)
                    if (task.type === 'GARDENING') {
                        if (task.owner === owner) {
                            if (count < 3) {
                                count++;
                                return <GardenToDo key={getUniqueId()} item={task}/>
                            }
                        }
                    }
            })
        }
    </>
}

export default GardenTaskList;