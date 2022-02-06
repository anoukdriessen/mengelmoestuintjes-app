import TasksDataContext, {TasksDataContextProvider} from "../../../context/TasksDataContext";
import GardenForm from "../../forms/types/GardenForm";
import {getUniqueId, refreshPage} from "../../../helpers/functions";
import {FiMinus, FiPlus, FiRefreshCw, FiX} from "react-icons/fi";
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
import {PlantCard} from "../Card";

function SingleGardenView({type}) {
    const { auth } = useContext(AuthDataContext)
    const { fetchGardenById, fetchGardenNotes, fetchGardenOwners, fetchGardenPlants, fetchGardenFields, getPlantsFromField,
            garden, notes, owners, removeNoteFromGarden, plants
    } = useContext(GardensDataContext)
    const [modal, setModal] = useState(false);
    const [selected, setSelected] = useState({});
    const [showTaskForm, toggleShowTaskForm] = useState(false);
    const [showNoteForm, toggleShowNoteForm] = useState(false);
    const [showSettingsForm, toggleShowSettingsForm] = useState(false);

    const [thisGarden, setThisGarden] = useState({
        item: {
            title: garden.title,
            owners: [],
            x: garden.x,
            y: garden.y,
        },
    });

    const {x, y} = thisGarden.item;
    let currentSize = x * y;
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const handleTileClick = (name) => {
        // console.log('geklikt op', name)
        setSelected(name)
        setModal(true)
    }

    const [gardenFields, setGardenFields] = useState({
        rows: [],
        columns: [],
    });

    if (garden.fields) {
        for (let i = 0; i < x; i++) {
            if (y !== 0) { // y cannot be empty to have at least one row
                // for each row
                // console.log('row=',i+1);
                gardenFields.rows[i] = letters[i];
                for (let j = 0; j < y; j++) {
                    // for each row we add the amount of columns
                    // console.log('adding column', j+1);
                    gardenFields.columns[j] = j + 1;
                }
            }
        }
    }
    // console.log(garden.fields, gardenFields)
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
        }
    }

    const handleAddOne = (num, name) => {
        console.log('handle add', num, name)
    }
    const handleRemoveOne = (num, name) => {
        console.log('handle remove', num, name)
    }

    return <>
        { getGardenHeader() }
        {
            type === 1 && <> { getGardenActions() }
                <div id='garden-content-owners'>
                    <TasksDataContextProvider>
                        <PostsDataContextProvider>
                            <div className='action-forms'>
                                { showTaskForm && <FormTask taskType={'GARDENING'}/> }
                                { showNoteForm && <FormNote gardenId={garden.id} toggle={toggleShowNoteForm}/> }
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
                                        return <div key={'note' +note.id} onClick={(e) => handleDeleteNote(e, garden.id, note.id)}>
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
                <ul className={'plants'}>
                    {
                        plants &&
                            plants.length > 0
                            ?
                            plants.map((plant) => {
                                return <span onClick={()=> {history.push(`/plant/${plant.id}`)}}>
                                    <PlantCard plant={plant}/>
                                    </span>
                            })
                            : <ItemNotFound title={'Planten in tuintje'}/>
                    }
                </ul>
            </>
        }
        {
            type === 3 && <>
                <div id='my-garden-info'>
                    {/* TODO change button + / - */}
                    <div id={'input garden'}>
                        <FiMinus onClick={() => handleRemoveOne(x, 'x')}/> <span>{x}m breed</span> <FiPlus onClick={() => handleAddOne(x, 'x')}/>
                        <FiMinus onClick={() => handleRemoveOne(y, 'y')}/> <span>{y}m lang</span> <FiPlus onClick={() => handleAddOne(y, 'y')}/>
                    </div>
                    <h3>je tuin is {!isNaN(x) ? x : 0} x {!isNaN(y) ? y : 0} = {!isNaN(currentSize) ? (currentSize) : 0} m<sup>2</sup></h3>
                </div>
                <div id='garden-select-box'>
                    {currentSize !== 0 && ( <>
                                       <div id='garden'>
                                             <div id='rows'>
                                                 { gardenFields.columns &&
                                                    gardenFields.columns.map((c) => {
                                                        return <div className='row' key={c}>
                                                            { gardenFields.rows && gardenFields.rows.map((r) => {
                                                                let name = (r + c);
                                                                return <span className='tile' key={r}>
                                                                    <div className={'tile-action'}
                                                                         onClick={() => handleTileClick(name)}>
                                                                        <img src={'/images/tiles/ground.png'} alt='ground'/>
                                                                        </div>
                                                                    </span>
                                                            })}
                                                        </div>
                                                    })}
                                             </div>
                                         </div>
                                 </>)}
                                 { modal && <div id='day-content' onClick={() => setModal(false)}>
                                     <div id='modal-content'>
                                         <h2>VELD [ {selected} ]</h2>
                                         {/* TODO image change */}
                                         <img src={'/images/tiles/ground.png'} alt='ground' width='222px'/>
                                         {/* TODO fieldinfo */}
                                         <div>
                                             veld info
                                             TYPE [ x ]
                                             STATUS [ x ]
                                         </div>
                                         {/* TODO list of plants */}
                                         <ul>
                                             <li>plant 1</li>
                                             <li>plant 2</li>
                                             <li>plant 3</li>
                                             <li>ect..</li>
                                         </ul>
                                         {/* TODO tasks of field */}
                                     </div>
                                 </div> }
                </div>
            </>
        }

    </>
}

export default SingleGardenView;