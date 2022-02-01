import {TasksDataContextProvider} from "../../../context/TasksDataContext";
import {FiMinus, FiPlus, FiRefreshCw, FiX} from "react-icons/fi";
import {FiCheck, FiSettings} from "react-icons/all";
import GardenTaskForm from "../../forms/types/GardenTaskForm";
import GardenForm from "../../forms/types/GardenForm";
import {getUniqueId, refreshPage} from "../../../helpers/functions";
import GardenTaskList from "../Tasks/GardenTaskList";
import {useState} from "react";

function GardenView({type, garden, children}) {
    const [showTaskForm, toggleShowTaskForm] = useState(false);
    const [showSettingsForm, toggleShowSettingsForm] = useState(false);
    const [modal, setModal] = useState(false);
    const [selected, setSelected] = useState({});
    const [thisGarden, setThisGarden] = useState({
        item: {
            title: garden.title,
            owners: garden.owners,
            x: garden.x,
            y: garden.y,
        },
        fields: garden.fields,
    });
    const [gardenFields, setGardenFields] = useState({
        rows: [],
        columns: []
    });
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
    const {x, y} = thisGarden.item;
    let currentSize = x * y;
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const handleAddTask = () => {
        toggleShowTaskForm((prevState => !prevState))
    }
    const handleSettings = () => {
        console.log('settings')
        toggleShowSettingsForm((prevState => !prevState))
    }

    const getGardenHeader = (title) => {
        return <div id='garden-content-header'>
            <span className='retro'>Nr. {garden.id} </span> <h2>{garden.name}</h2>
            <span className='retro'>{garden.size} m<sup>2</sup></span>
            {title && <h4>{title}</h4>}
        </div>
    }
    const getAddTask = () => {
        return <span className='addTask' onClick={handleAddTask}>
            {showTaskForm ? <FiX/> : <FiPlus/>} Taak
        </span>
    }
    const getSettings = () => {
        return <span className='settings' onClick={handleSettings}>
            Instellingen {showSettingsForm ? <FiX/> : <FiSettings/>}
        </span>
    }

    const handleTileClick = (name) => {
        // console.log('geklikt op', name)
        setSelected(name)
        setModal(true)
    }

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

    console.log(garden.fields)
    return <div id='my-garden'>
        {
            type === 1 && <>
                { getGardenHeader() }
                {/*// TODO show level*/}
                <div id='garden-content-owners'>
                    <TasksDataContextProvider>
                        <div className='actions'>
                            { getAddTask() }
                            { getSettings() }
                        </div>
                        <div className='action-forms'>
                            { showTaskForm && <GardenTaskForm/> }
                            { showSettingsForm && <GardenForm gardenId={garden.id} owners={garden.owners}/> }
                        </div>
                        <ul><span onClick={() => refreshPage()}><FiRefreshCw size={20}/></span>
                            { garden.owners && garden.owners.map((user) => {
                                // console.log(user)
                                return <div key={user.username} className={'note-card todo'}>
                                    { user.image
                                        ? <img id='profile-img' src={`data:image/jpeg;base64,${user.image}`} alt='user'/>
                                        : <img id='profile-img' src='https://images.unsplash.com/photo-1587334274328-64186a80aeee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3Byb3V0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60' alt='empty user' /> }
                                    <li>@{user.username}</li>
                                    { user.tasks.length === 0
                                        ? <FiCheck/>
                                        : <GardenTaskList tasks={user.tasks} owner={user.username}/> }
                                </div>
                            })}
                        </ul>
                    </TasksDataContextProvider>
                </div>
            </>
        }
        {
            type === 2 && <>
                { getGardenHeader(("Planten in tuintje " + garden.name)) }
                {/* TODO list of plants */}
                <ul className='list-of-plants'>
                    {
                        listOfPlants &&
                        listOfPlants.map((plant) => {
                            return <li key={plant.id}>
                                <div>
                                    <img src={plant.image} alt={plant.title}/>
                                    <h4>{plant.title}</h4>
                                    <span>{plant.specs}</span>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </>
        }
        {
            type === 3 && <>
                { getGardenHeader() }
                <div id='my-garden-info'>
                    <div>
                        <FiMinus/> <span>{x}m breed</span> <FiPlus/>
                        <FiMinus/> <span>{y}m lang</span> <FiPlus/>
                    </div>

                    <h3>je tuin is {!isNaN(x) ? x : 0} x {!isNaN(y) ? y : 0} = {!isNaN(currentSize) ? (currentSize) : 0} m<sup>2</sup></h3>
                </div>
                <div id='garden-select-box'>
                    {currentSize !== 0 && ( <>
                            <div id='garden'>
                                <div id='rows'>
                                    { gardenFields.columns && gardenFields.columns.map((c) => {
                                        return <div className='row' key={c}>
                                            { gardenFields.rows && gardenFields.rows.map((r) => {
                                                let name = (r + c);
                                                // console.log(name)
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
        {children}
    </div>
}

export default GardenView;