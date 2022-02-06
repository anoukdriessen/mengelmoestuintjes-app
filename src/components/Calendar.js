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
    const upcomming = [...Array(days).keys()]
    let nextDays = [getToday()];
    upcomming.map((day) => {
        nextDays = [...nextDays, getNextDay(day +1)]
    })

    const handleClick = (e) => {
        setSelected(e.target.id);
        setModal(true);
        e.target.classList.add('current-day');
    }

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
                        <li>taak</li>
                        <li>taak</li>
                        <li>taak</li>
                    </ul>
                    <h4 className='sub-title'>Taken in je tuintjes</h4>
                    <ul>
                        <li>taak</li>
                        <li>taak</li>
                        <li>taak</li>
                    </ul>
                </div>
            </div> : null
        }

    </div>
}

export default Calendar;