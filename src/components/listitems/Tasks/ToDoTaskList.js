import {getToday, getTomorrow, getUniqueId} from "../../../helpers/functions";
import {useContext,  useState} from "react";
import {FiEdit, FiSmile} from "react-icons/all";
import {FiX} from "react-icons/fi";
import TasksDataContext from "../../../context/TasksDataContext";
import ShowAndHide from "../ShowAndHide";

function ToDoTask({toggleShowForm, taskId, handleFinished, isDone, title, handleEdit, handleDelete, isExpired}) {
    const [taskIsDone, setTaskIsDone] = useState(isDone);
    return <div className={isExpired ? 'to-do-task expired' : 'to-do-task'}>
            <FiEdit className='link reversed'
                    onClick={() => {
                        toggleShowForm(true);
                        handleEdit(taskId);
                    }} size={20}/>
        <p
            id={taskId}
            key={getUniqueId()}
            onClick={(e) => {
                handleFinished(e);
                setTaskIsDone((prevState => !prevState));
            }}
            className={taskIsDone ? 'isDone' : ''}
        >
            {title}
        </p>
        <FiX className='link reversed' onClick={() => handleDelete(taskId)} size={20}/>
    </div>
}

function ToDoTaskList({showForm, handleEdit, handleDelete, handleFinished}) {
    const { toDoTasks } = useContext(TasksDataContext);

    let one = []
    let two = []
    let three = []

    const fetchTasks = () => {
        for (let task in toDoTasks) {
            let thisTask = toDoTasks[task]
            if (thisTask.deadline < getToday()) {
                one = [...one, thisTask]
            } else if (thisTask.deadline === getToday()) {
                one = [...one, thisTask]
            } else if (thisTask.deadline === getTomorrow()) {
                two = [...two, thisTask]
            } else {
                three = [...three, thisTask]
            }
        }
    }

    const [showToday, setShowToday] = useState(true);
    const [showTomorrow, setShowTomorrow] = useState(false);
    const [showSoon, setShowSoon] = useState(false);

    fetchTasks();
    const ToDoList = ({title, list, handleEdit, handleDelete, handleFinished, toggleShowForm}) => {
        return <>
            <h2 className='to-do-title'>TO DO {title}</h2>

            {
                list.length < 1
                    ? <div className='to-do-task none'>
                        { list.length < 1 && <>
                            <span className='message'><FiSmile size={20}/>geen taken voor vandaag</span>
                        </>}
                    </div>
                    : list.map((task) => {
                    return <ToDoTask
                        key={getUniqueId()}
                        taskId={task.id}
                        isDone={task.done}
                        title={task.title}
                        handleEdit={handleEdit(task.id)}
                        handleDelete={handleDelete(task.id)}
                        handleFinished={handleFinished(task.id)}
                        toggleShowForm={toggleShowForm}
                        isExpired={task.deadline < getToday()}
                    />
                })
            }

        </>
    }

    return <div className='to-do-container'>
        <ShowAndHide
            setOne={setShowToday}
            setTwo={setShowTomorrow}
            setThree={setShowSoon}
            one={showToday}
            two={showTomorrow}
            three={showSoon}
            titleOne={'vandaag'}
            titleTwo={'morgen'}
            titleThree={'toekomst'}
        />
        { showToday && <div className='to-do'>
            <ToDoList
                title={'VAnDaAG'}
                list={one}
                handleEdit={() => handleEdit}
                handleDelete={() => handleDelete}
                handleFinished={() => handleFinished}
                toggleShowForm={showForm}
            />
        </div>
        }{ showTomorrow && <div className='to-do'>
            <ToDoList
                title={'MORGEN'}
                list={two}
                handleEdit={() => handleEdit}
                handleDelete={() => handleDelete}
                handleFinished={() => handleFinished}
                toggleShowForm={showForm}
            />
        </div>
        }{ showSoon && <div className='to-do'>
            <ToDoList
                title={'toekomst'}
                list={three}
                handleEdit={() => handleEdit}
                handleDelete={() => handleDelete}
                handleFinished={() => handleFinished}
                toggleShowForm={showForm}
            />
        </div> }
    </div>
}

export default ToDoTaskList;