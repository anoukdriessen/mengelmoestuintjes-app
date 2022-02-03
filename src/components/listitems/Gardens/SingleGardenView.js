import {TasksDataContextProvider} from "../../../context/TasksDataContext";
import GardenTaskForm from "../../forms/types/GardenTaskForm";
import GardenForm from "../../forms/types/GardenForm";
import {getUniqueId, refreshPage} from "../../../helpers/functions";
import {FiPlus, FiRefreshCw, FiX} from "react-icons/fi";
import {FiCheck, FiSettings} from "react-icons/all";
import GardenTaskList from "../Tasks/GardenTaskList";
import {useContext, useState} from "react";
import FormTask from "../../forms/FormTask";
import FormNote from "../../forms/FormNote";
import {PostsDataContextProvider} from "../../../context/PostsDataContext";
import NoteCard from "../Posts/NoteCard";
import ItemNotFound from "../ItemNotFound";
import GardensDataContext from "../../../context/GardensDataContext";
import axios from "axios";
import {AuthDataContext} from "../../../context/AuthDataContext";

function SingleGardenView({garden}) {
    const { auth } = useContext(AuthDataContext)
    const { notes } = useContext(GardensDataContext)
    const [showTaskForm, toggleShowTaskForm] = useState(false);
    const [showNoteForm, toggleShowNoteForm] = useState(false);
    const [showSettingsForm, toggleShowSettingsForm] = useState(false);

    const getGardenHeader = (title) => {
        return <div id='content-header' className={'garden'}>
            <span>Nr. {garden.id} </span>
                <h2>{garden.name}</h2>
            <span>{garden.size} m<sup>2</sup></span>
            {title && <h4>{title}</h4>}
        </div>
    }

    const getAddTask = () => {
        return <span className='addTask link' onClick={() => {
            toggleShowNoteForm(false);
            toggleShowSettingsForm(false);
            handleAddTask()
        }}>
            {showTaskForm ? <FiX/> : <FiPlus/>} Taak
        </span>
    }

    const getAddNote = () => {
        return <span className='addNote link' onClick={() => {
            toggleShowTaskForm(false);
            toggleShowSettingsForm(false);
            handleAddNote()
        }}>
            {showNoteForm ? <FiX/> : <FiPlus/>} Notitie
        </span>
    }

    const getSettings = () => {
        return <span className='settings link' onClick={() => {
            toggleShowTaskForm(false);
            toggleShowNoteForm(false);
            handleSettings();
        }}>
            Instellingen {showSettingsForm ? <FiX/> : <FiSettings/>}
        </span>
    }

    const getGardenActions = () => {
        return <div id='content-action'>
            { getAddTask() }
            { getAddNote() }
            { getSettings() }
        </div>
    }

    const handleAddTask = () => { toggleShowTaskForm((prevState => !prevState)) }
    const handleAddNote = () => { toggleShowNoteForm((prevState => !prevState)) }
    const handleSettings = () => { toggleShowSettingsForm((prevState => !prevState)) }

    const handleDeleteNote = async (e, id, note) => {
        e.preventDefault();
        if(window.confirm("Je staat op het punt deze notitie te verwijderen, Weet je het zeker?")) {
            try {
                const result = await axios.delete(`https://localhost:8443/api/tuintjes/${id}/${auth.user.username}/notitie/${note}`,
                    note
                )
                console.log(result);
                refreshPage();
            } catch (e) {
                console.error(e);
                console.log(e.response);
            }
        }
    }


    return <>
        { getGardenHeader() }
        { getGardenActions() }
        <div id='garden-content-owners'>
            <TasksDataContextProvider>
                <PostsDataContextProvider>
                    <div className='action-forms'>
                        { showTaskForm && <FormTask taskType={'GARDENING'}/> }
                        { showNoteForm && <FormNote gardenId={garden.id}/> }
                        { showSettingsForm && <GardenForm gardenId={garden.id} owners={garden.owners}/> }
                    </div>
                    <h3>Taken</h3>
                    <ul>
                    { garden.owners &&
                        garden.owners.map((user) => {
                        return <div key={user.username} className={'note-card todo'}>
                            { user.image
                                ? <img id='profile-img' src={`data:image/jpeg;base64,${user.image}`} alt='user'/>
                                : <img id='profile-img' src='https://images.unsplash.com/photo-1587334274328-64186a80aeee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3Byb3V0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60' alt='empty user' /> }
                            <li>@{user.username}'s TOP 3 taken</li>
                            { user.tasks.length === 0
                                ? <FiCheck/>
                                : <GardenTaskList tasks={user.tasks} owner={user.username}/> }
                        </div>
                        })}
                    </ul>
                    <h3>Notities</h3>
                    <div id='post-cards'>
                        {notes
                            ? <>{
                                notes.map((note) => {
                                    return <div onClick={(e) => handleDeleteNote(e, garden.id, note.id)}>
                                        <NoteCard key={getUniqueId()} item={note} disableEditing={true} />
                                    </div>
                                })
                            }</>
                            : <ItemNotFound title={'Notities'}/>
                        }
                    </div>
                </PostsDataContextProvider>
            </TasksDataContextProvider>
        </div>
    </>
}

export default SingleGardenView;