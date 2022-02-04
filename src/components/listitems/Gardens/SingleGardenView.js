import {TasksDataContextProvider} from "../../../context/TasksDataContext";
import GardenForm from "../../forms/types/GardenForm";
import {getUniqueId, refreshPage} from "../../../helpers/functions";
import {FiPlus, FiRefreshCw, FiX} from "react-icons/fi";
import {FiCheck, FiSettings} from "react-icons/all";
import GardenTaskList from "../Tasks/GardenTaskList";
import {useContext, useEffect, useState} from "react";
import FormTask from "../../forms/FormTask";
import FormNote from "../../forms/FormNote";
import {PostsDataContextProvider} from "../../../context/PostsDataContext";
import NoteCard from "../Posts/NoteCard";
import ItemNotFound from "../ItemNotFound";
import GardensDataContext from "../../../context/GardensDataContext";
import {AuthDataContext} from "../../../context/AuthDataContext";
import {toast} from "react-toastify";
import {useHistory, useParams} from "react-router-dom";

function SingleGardenView({type}) {
    const { auth } = useContext(AuthDataContext)
    const { fetchGardenById, fetchGardenNotes, fetchGardenOwners, fetchGardenPlants, fetchGardenFields, getPlantsFromField,
            garden, notes, owners, removeNoteFromGarden, plants
    } = useContext(GardensDataContext)

    const [isInGarden, setIsInGarden] = useState(false);
    const [showTaskForm, toggleShowTaskForm] = useState(false);
    const [showNoteForm, toggleShowNoteForm] = useState(false);
    const [showSettingsForm, toggleShowSettingsForm] = useState(false);

    const [thisGarden, setThisGarden] = useState({
        item: {
            title: garden.title,
            owners: [garden.owners],
            x: garden.x,
            y: garden.y,
        },
        fields: [garden.fields],
    });

    const params = useParams();

    const getThisGarden = async () => {
        fetchGardenById(params.gardenid);
    }
    const getThisGardenDetails = async () => {
        fetchGardenNotes(params.gardenid);
        fetchGardenOwners(params.gardenid);
        fetchGardenFields(params.gardenid);
        fetchGardenPlants(params.gardenid);
    }

    const getPlants = async (fieldName) => {
        getPlantsFromField(params.gardenid, fieldName)
    }

    const history = useHistory();
    useEffect(() => {
        getThisGarden()
        getThisGardenDetails()
    }, []);


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
                removeNoteFromGarden(id, note);
                refreshPage();
                toast.success('notitie verwijderd')
        }
    }

    // console.log(plants)
    return <>
        { getGardenHeader() }
        {
            type === 1 && <> { getGardenActions() }
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
                            { thisGarden.owners &&
                                    thisGarden.owners.map((user) => {
                                        return <div key={user.username} className={'note-card todo'}>
                                            { user.image
                                                ? <img id='profile-img' src={`data:image/jpeg;base64,${user.image}`} alt='user'/>
                                                : <img id='profile-img' src='https://images.unsplash.com/photo-1587334274328-64186a80aeee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3Byb3V0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60' alt='empty user' /> }
                                                <li>@{user.username}'s TOP 3 taken</li>
                                            { !user.tasks
                                                ? <span><FiCheck/>Geen tuintaken gevonden</span>
                                                : <GardenTaskList tasks={user.tasks} owner={user.username}/> }
                                                </div>
                            })}
                            </ul>
                            <h3>Notities</h3>
                            <div id='post-cards'>
                                {notes
                                    ? <>{ notes.map((note) => {
                                        return <div key={garden.name + note.id} onClick={(e) => handleDeleteNote(e, garden.id, note.id)}>
                                            <NoteCard item={note} disableEditing={true} />
                                        </div>
                                    })}</>
                                    : <ItemNotFound title={'Notities'}/>
                                }
                            </div>
                        </PostsDataContextProvider>
                    </TasksDataContextProvider>
                </div>
            </>
        }
        {
            type === 2 && <>
                <h4>Planten in tuintje</h4>
                <ul>
                    {
                        plants &&
                            plants.map((plant) => {
                                // TODO add link to single plant view
                                return <li key={plant.id} onClick={() => {
                                history.push(`plant/${plant.id}`)}
                                }>Nr. [{plant.id}] {plant.name} </li>
                            })
                    }
                </ul>
            </>
        }

    </>
}

export default SingleGardenView;