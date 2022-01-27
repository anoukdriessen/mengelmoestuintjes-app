import {getToday, getTomorrow, getUniqueId} from "../../../helpers/functions";
import {useContext, useState} from "react";
import UserDataContext from "../../../context/UserDataContext";
import {FiEdit, FiSmile, GiChatBubble, GiCheckMark} from "react-icons/all";
import {FiEye, FiEyeOff, FiX} from "react-icons/fi";
import PostsDataContext from "../../../context/TasksDataContext";
import TasksDataContext from "../../../context/TasksDataContext";

function ShowAndHide({setShowToday, showToday, setShowTomorrow, showTomorrow, setShowSoon, showSoon}){
    const getElement = (setShow, show, title) => (
        <span onClick={() => setShow(prevState => !prevState)} className={show ? 'selected' : 'hidden'}>
                { show ? <FiEye size={17}/> : <FiEyeOff size={17}/> }
            { show ? `${title}` : `${title}` }
        </span>
    );
    return <div className='show-and-hide'>
        { getElement(setShowToday, showToday, 'Vandaag')}
        { getElement(setShowTomorrow, showTomorrow, 'Morgen')}
        { getElement(setShowSoon, showSoon, 'Toekomst')}
    </div>
}

function ToDoTask({toggleShowForm, taskId, handleFinished, isDone, title, handleEdit, handleDelete, isExpired}) {
    return <div className={isExpired ? 'to-do-task expired' : 'to-do-task'}>
            <FiEdit className='link reversed'
                    onClick={() => {
                        toggleShowForm(true);
                        handleEdit(taskId);
                    }} size={20}/>
        <p
            id={taskId}
            key={getUniqueId()}
            onClick={handleFinished}
            className={isDone ? 'isDone' : ''}
        >
            {title}
        </p>
        <FiX className='link reversed' onClick={() => handleDelete(taskId)} size={20}/>
    </div>
}

function ToDoTaskList({formActive, showForm, handleEdit, handleDelete, handleFinished}) {
    const {toDoTasks} = useContext(TasksDataContext);

    const [today, setToday] = useState(0)
    const [showToday, setShowToday] = useState(true);
    const [tomorrow, setTomorrow] = useState(0)
    const [showTomorrow, setShowTomorrow] = useState(false);
    const [soon, setSoon] = useState(0)
    const [showSoon, setShowSoon] = useState(false);

    console.log(toDoTasks)
    const ToDoList = ({title, toDoTasks, condition, handleEdit, handleDelete, handleFinished, toggleShowForm, setCount}) => {
        let count = 0;
        return <>
            <h2 className='to-do-title'>TO DO {title}</h2>
            { toDoTasks.map((task) => {
                let parseCondition;
                switch (condition) {
                    case 'today':
                        parseCondition = task.deadline === getToday() || task.deadline < getToday();
                        break;
                    case 'tomorrow':
                        parseCondition = task.deadline === getTomorrow();
                        break;
                    case 'soon':
                        parseCondition = task.deadline > getTomorrow();
                        break;
                    default: parseCondition = task != null;
                }
                if (parseCondition) {
                    count++;
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
                }
                return null;
            })}
            { setCount(count) }
        </>
    }

    return <div className='to-do-container'>
        <ShowAndHide
            setShowToday={setShowToday}
            setShowTomorrow={setShowTomorrow}
            setShowSoon={setShowSoon}
            showToday={showToday}
            showTomorrow={showTomorrow}
            showSoon={showSoon}
        />
        { showToday && <div className='to-do'>
            <ToDoList
                title={'VAnDaAG'}
                toDoTasks={toDoTasks}
                condition={'today'}
                handleEdit={() => handleEdit}
                handleDelete={() => handleDelete}
                handleFinished={() => handleFinished}
                toggleShowForm={showForm}
                setCount={setToday}
            /><div className='to-do-task none'>
            { today === 0 && <>
                <span className='message'><FiSmile size={20}/>geen taken voor vandaag</span>
            </>}
            </div>
        </div>
        }{ showTomorrow && <div className='to-do'>
            <ToDoList
                title={'MORGEN'}
                toDoTasks={toDoTasks}
                condition={'tomorrow'}
                handleEdit={() => handleEdit}
                handleDelete={() => handleDelete}
                handleFinished={() => handleFinished}
                toggleShowForm={showForm}
                setCount={setTomorrow}
            /><div className='to-do-task none'>
                { tomorrow === 0 && <>
                    <span className='message'><FiSmile size={20}/>geen taken voor morgen</span>
                </>}
            </div>
        </div>
        }{ showSoon && <><div className='to-do'>
            <ToDoList
                title={'toekomst'}
                toDoTasks={toDoTasks}
                condition={'soon'}
                handleEdit={() => handleEdit}
                handleDelete={() => handleDelete}
                handleFinished={() => handleFinished}
                toggleShowForm={showForm}
                setCount={setSoon}
            />
        </div><div className='to-do-task none'>
            { soon === 0 && <>
                <span className='message'><GiCheckMark size={20}/>Je hebt nog geen toekomstige taken</span>
            </>}
        </div>
    </>}
    </div>
}

export default ToDoTaskList;