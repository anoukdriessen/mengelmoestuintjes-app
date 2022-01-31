import {
    convertToMyDateFormat, fetchXItemsFromList, getDateHumanFormat,
    getDay,
    getMonth,
    getMonthString,
    getNextDay,
    getToday, getTodayHumanFormat,
    getUniqueId,
    getYear, refreshPage
} from "../helpers/functions";
import {useContext, useState} from "react";
import {FiXCircle} from "react-icons/all";
import {FiX} from "react-icons/fi";
import {toast} from "react-toastify";
import UserDataContext from "../context/UserDataContext";
import PostsDataContext from "../context/TasksDataContext";
import TasksDataContext from "../context/TasksDataContext";

function Calendar({days}) {
    const {toDoTasks} = useContext(TasksDataContext);
    const [selected, setSelected] = useState(getToday);
    const [modal, setModal] = useState(false);
    let tasksOnDate = fetchXItemsFromList(3, toDoTasks, 'today');
    const [gardenOnDate, setGardenOnDate] = useState([
        'tuin-taak 1', 'tuin-taak 2', 'tuin-taak 3', 'tuin-taak 4', 'tuin-taak 5', 'tuin-taak 6'
    ]);
    const [maintenceOnDate, setMaintenceOnDate] = useState([
        'geef plant X water', 'oogst plant X', 'plant X'
    ]);
    const upcomming = [...Array(days).keys()]
    let nextDays = [getToday()];
    upcomming.map((day) => {
        nextDays = [...nextDays, getNextDay(day +1)]
        // console.log(day + 1);
    })

    const handleClick = (e) => {
        setSelected(e.target.id);
        setModal(true);
        // console.log(modal);
        e.target.classList.add('current-day');
        // console.log(e.target.classList);
        toast.info("Klik op het scherm om het dagoverzicht te sluiten");
    }

    const handleClose = () => {
        // console.log('before', selected)
        setModal(false);
        console.log(modal);
    }

    // console.log('taken op datum', tasksOnDate);
    return<div id='calendar'>
        Vandaag is het <br/> {getTodayHumanFormat()}}
        <div id='upcomming'>
            {
                nextDays.map((day) => {
                        return <div
                            id={day}
                            className={day === selected ? 'current-day' : 'day'}
                            key={day}
                            onClick={(e) => {
                                handleClick(e);
                            }}>{getDay(day)} </div>
                })
            }
        </div>
        { modal ? <div id='day-content'
            onClick={() => setModal(false)}
        >
                <div id='modal-content'>
                    <h4>{getDateHumanFormat(selected)}</h4>

                    <h4 className='sub-title'>Taken voor vandaag</h4>
                    <ul>
                    {
                        tasksOnDate.map((task) => {
                            return <li>{task}</li>
                        })
                    }
                    </ul>
                    <h4 className='sub-title'>Taken in je tuintjes</h4>
                    <ul>
                    {
                        gardenOnDate.map((task) => {
                            return<li>{task}</li>
                        })
                    }
                    </ul>
                    <h4 className='sub-title'>Wat je planten<br/>van je verwachten</h4>
                    <ul>
                    {
                        maintenceOnDate.map((plant) => {
                            return <>
                                <ul>plant
                                    <li>plant taak 1</li>
                                    <li>plant taak 2</li>
                                    <li>plant taak 3</li>
                                </ul>
                            </>
                        })
                    }
                    </ul>
                </div>
            </div> : null
        }

    </div>
}

export default Calendar;