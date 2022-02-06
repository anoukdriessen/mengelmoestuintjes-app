import {FiCheckSquare, FiSquare} from "react-icons/all";
import {useContext, useState} from "react";
import TasksDataContext from "../../../context/TasksDataContext";
import {AuthDataContext} from "../../../context/AuthDataContext";

export function GardenToDo({item}) {
    const { auth } = useContext(AuthDataContext);
    const { deleteTask } = useContext(TasksDataContext)
    const [isDone, toggleIsDone] = useState(item.done);

    const handleFinished = async (itemId) => {
        // console.log('finish task', itemId);
        if (item.owner === auth.user.username) {
            deleteTask(itemId);
        }
    }

    if (!item) {
        return <div key={item.id} className='garden-todo'>
            <FiSquare size={20}/>
        </div>
    } else {
        return <div key={item.id} className={`garden-todo ${isDone ? 'finished' : ''}`}
                    onClick={(e) => {
                        toggleIsDone((prevState => !prevState));
                        handleFinished(item.id);
                    }
                    }>
            {isDone ? <FiCheckSquare size={20}/> : <FiSquare size={20}/>}
            <span className='title'>{item.title}</span>
        </div>
    }
}

function GardenTaskList({tasks, owner}) {
    let count = 0;
    return <>
        {
            tasks &&
                tasks.map((task) => {
                    // console.log(task)
                    if (task.type === 'GARDENING') {
                        if (task.owner === owner) {
                            if (count < 3) {
                                count++;
                                return <GardenToDo key={task.id} item={task}/>
                            }
                        }
                    }
            })
        }
    </>
}

export default GardenTaskList;