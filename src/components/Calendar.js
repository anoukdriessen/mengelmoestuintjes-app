import {
     getDateHumanFormat,
    getDay,
    getNextDay,
    getToday, getTodayHumanFormat,
} from "../helpers/functions";
import {useContext, useState} from "react";
import TasksDataContext from "../context/TasksDataContext";

function Calendar({days}) {
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