import React, {useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import PageHeader from "../components/pageitems/PageHeader";
import PageContent from "../components/pageitems/PageContent";
import GardensDataContext, {GardensDataContextProvider} from "../context/GardensDataContext";
import ShowAndHide, {ShowAndHideSingleGarden} from "../components/listitems/ShowAndHide";
import {FiEye, FiEyeOff, FiPlus, FiRefreshCw, FiX} from "react-icons/fi";
import {FiCheck, FiSettings, GiInfo, GiPlantRoots, GiPlantSeed, GiSeedling, GiTreasureMap} from "react-icons/all";
import axios from "axios";
import UserDataContext from "../context/UserDataContext";
import {getUniqueId, refreshPage} from "../helpers/functions";
import {SmallProfileCardWithTasks} from "./Profile";
import TaskItem from "../components/listitems/Tasks/TaskItem";
import GardenTaskList from "../components/listitems/Tasks/GardenTaskList";
import {TasksDataContextProvider} from "../context/TasksDataContext";
import ItemNotFound from "../components/listitems/ItemNotFound";
import GardenTaskForm from "../components/forms/types/GardenTaskForm";
import {logDOM} from "@testing-library/react";
import Card from "../components/listitems/Card";
import {toast} from "react-toastify";
import GardenForm from "../components/forms/types/GardenForm";

export function Garden() {
    const { garden, fetchGardenById } = useContext(GardensDataContext)
    // const { profiles, fetchProfilesFromUsers } = useContext(UserDataContext)
    const params = useParams();
    // const history = useHistory();

    const getThisGarden = async () => {
        fetchGardenById(params.gardenid);
        console.log(garden)
    }

    useEffect(() => {
        getThisGarden(params.gardenid)
    }, []);

    const [viewOne, setViewOne] = useState(true);
    const [viewTwo, setViewTwo] = useState(false);
    const [viewThree, setViewThree] = useState(false);

    const [modal, setModal] = useState(false);
    const [selected, setSelected] = useState({});

    const handleTileClick = (name) => {
        console.log('geklikt op', name)
        setSelected(name)
        setModal(true)
    }
    // const {id, name, size, x, y, owners, fields} = thisGarden;
    // const {columns, rows} = fields;

    const [toChange, setToChange] = useState({
        id: garden.id,
        name: garden.name,
        numberOfTasks: garden.tasks,
        owners: garden.owners,
        size: garden.size,
        tasks: garden.tasks,
        x: garden.x,
        y: garden.y,
    });
    const {x, y} = toChange;

    const [showTaskForm, toggleShowTaskForm] = useState(false);
    const [showSettingsForm, toggleShowSettingsForm] = useState(false);
    const [showNoteForm, toggleShowNoteForm] = useState(false);

    let listOfPlants = [
        {
            image: 'https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmVnZXRhYmxlJTIwcGxhbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
            title: 'tomaten',
            specs: '',
        },
        {
            image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fHZlZ2V0YWJsZSUyMHBsYW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
            title: 'aardbeien',
            specs: '',
        },
        {
            image: 'https://images.unsplash.com/photo-1533231040102-5ec7a63e6d0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTN8fHZlZ2V0YWJsZSUyMHBsYW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
            title: 'bieten',
            specs: '',
        },
        {
            image: 'https://images.unsplash.com/photo-1605557437843-37a5d8f789d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTV8fHZlZ2V0YWJsZSUyMHBsYW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
            title: 'fles pompoen',
            specs: '',
        },
        {
            image: 'https://images.unsplash.com/photo-1441861539200-6208cf4a122f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTZ8fHZlZ2V0YWJsZSUyMHBsYW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
            title: 'knoflook',
            specs: '',
        }
    ]

    const thisGarden = {
        rows: [],
        columns: [],
    }
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let currentSize = (x*y);

    for (let i = 0; i < x; i++) {
        if (y !== 0) { // y cannot be empty to have at least one row
            // for each row
            // console.log('row=',i+1);
            thisGarden.rows[i] = letters[i];

            for (let j = 0; j < y; j++) {
                // for each row we add the amount of columns
                // console.log('adding column', j+1);
                thisGarden.columns[j] = j+1;
            }
        }
    }
    // console.log("de rijen in de tuin",thisGarden.rows)
    // console.log("de kolommen in de tuin",thisGarden.columns)
    // console.log(garden.owners)

    const getGardenHeader = () => {
        return <div id='garden-content-header'>
            <span className='retro'>Nr. {garden.id} </span> <h2>{garden.name}</h2>
            <span className='retro'>{garden.size} m<sup>2</sup></span>
        </div>
    }

    const handleAddTask = () => {
        toggleShowTaskForm((prevState => !prevState))
    }

    const handleSettings = () => {
        console.log('settings')
        toggleShowSettingsForm((prevState => !prevState))
    }

    const handleChange = (e) => {
        console.log(e.target.id, e.target.value)
        setToChange({
            ...toChange,
            [e.target.id]: e.target.value,
        });
    }
    return <>
        <ShowAndHideSingleGarden
            one={viewOne}
            setOne={setViewOne}
            two={viewTwo}
            setTwo={setViewTwo}
            three={viewThree}
            setThree={setViewThree}
        />
    <div id='garden-content'>
        {
            viewOne && <div id='my-garden'>
                {getGardenHeader()}
                {
                    // TODO show level
                }
                <div id='garden-content-owners'>
                    <TasksDataContextProvider>
                        <div className='actions'>
                            {
                                <span className='addTask' onClick={handleAddTask}>
                                    { showTaskForm ? <FiX/> : <FiPlus/> } Taak
                                </span>
                            }{
                                <span className='settings' onClick={handleSettings}>
                                    Instellingen { showSettingsForm ? <FiX/> : <FiSettings/> }
                                </span>
                            }
                        </div>
                        <div className='action-forms'>
                            {
                                showTaskForm && <>
                                    <GardenTaskForm/>
                                </>
                            }
                            {
                                showSettingsForm && <>
                                    <GardenForm gardenId={garden.id} owners={garden.owners}/>
                                </>
                            }
                        </div>
                        <ul>
                            <span onClick={() => refreshPage()}><FiRefreshCw size={20}/></span>
                            {
                            garden.owners &&
                                garden.owners.map((user) => {
                                    console.log(user)
                                    return <div key={getUniqueId()} className={'note-card todo'}>
                                        {
                                            user.image
                                                ? <img id='profile-img' src={`data:image/jpeg;base64,${user.image}`} alt='user'/>
                                                : <img id='profile-img' src='https://images.unsplash.com/photo-1587334274328-64186a80aeee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3Byb3V0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60' alt='empty user' />
                                        }
                                        <li>@{user.username}</li>
                                        { user.tasks.length === 0
                                            ? <FiCheck/>
                                            : <GardenTaskList tasks={user.tasks} owner={user.username}/>
                                        }
                                    </div>
                            })
                        }</ul>
                    </TasksDataContextProvider>

                {/*  TODO garden notities  */}
                </div>
            </div>
        }{
            viewTwo && <div id='my-garden'>
                <h4>Planten in tuintje {garden.name}</h4>

                <ul className='list-of-plants'>
                    {
                        listOfPlants &&
                        listOfPlants.map((plant) => {
                            return <li key={getUniqueId()}>
                                <div>
                                    <img src={plant.image} alt={plant.title}/>
                                    <h4>{plant.title}</h4>
                                    <span>{plant.specs}</span>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
        }{
            viewThree && <div id='my-garden'>
                {getGardenHeader()}

                <div id='my-garden-info'>
                    <div>
                <input type='number' value={x} id={'x'} onChange={handleChange}/>m breed</div>
                    <div>
                <input type='number' value={y} id={'y'} onChange={handleChange}/>m lang</div>
                <h3>je tuin is { !isNaN(x) ? x : 0 } x { !isNaN(y) ? y : 0 } = {!isNaN(currentSize) ? (currentSize) : 0} m<sup>2</sup></h3>
                </div>
                <div id='garden-select-box'>
                    { garden.currentSize!==0 && (
                        <>
                            <div id='garden'>
                                <div id='rows'>
                                    { thisGarden.columns &&
                                        thisGarden.columns.map((c) => {
                                            return <div className='row' key={getUniqueId()}>
                                                { thisGarden.rows &&
                                                    thisGarden.rows.map((r) => {
                                                        let name = (r+c)
                                                        return <span className='tile' key={getUniqueId()}>
                                                            <div className={'tile-action'} onClick={() => handleTileClick(name)}>
                                                            <img src={'/images/tiles/ground.png'} alt='ground'/>
                                                            </div>
                                                        </span>
                                                    })
                                                }
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        </>
                    )}
                    {
                        modal ? <div id='day-content'
                                     onClick={() => setModal(false)}>
                            <div id='modal-content'>
                                {selected}
                                image
                                field type
                                field status
                                field tasks
                                field form
                                list of plants in fields
                            </div>
                        </div> : null
                    }
                </div>
            </div>
        }
    </div>
    </>
}

function SingleGarden() {

    return <>
        <PageHeader title='Mengelmoestuintjes'/>
        <PageContent>
            <GardensDataContextProvider>
                <Garden/>
            </GardensDataContextProvider>
        </PageContent>
    </>
}

export default SingleGarden;