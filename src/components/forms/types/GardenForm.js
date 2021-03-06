import {FiPlus, FiX} from "react-icons/fi";
import axios from "axios";
import {useContext, useState} from "react";
import { GiSave} from "react-icons/all";
import {refreshPage} from "../../../helpers/functions";
import {AuthDataContext} from "../../../context/AuthDataContext";
import Form from "../Form";
import GardensDataContext from "../../../context/GardensDataContext";

function GardenForm({gardenId}) {
    const {auth} = useContext(AuthDataContext);
    const { garden, updateGardenName, addOwnerToGarden } = useContext(GardensDataContext);
    const [addNew, toggleAddNew] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const [thisGarden, setThisGarden] = useState({
        username: '',
        name: '',
    })
    const { username, name} = thisGarden;

    const handleClick = () => {
        toggleAddNew((prevState => !prevState))
    }

    const handleChange = (e) => {
        // console.log(e.target.id, e.target.value)
        setThisGarden({
            ...thisGarden,
            [e.target.id]: e.target.value
        })
    }

    const changeGardenName = () => {
        console.log(thisGarden.name);
        updateGardenName(gardenId, thisGarden.name);
    }

    const addUserToGarden = async () => {
        console.log(username, gardenId);
        try {
            toggleAddNew((prevState => !prevState))
            addOwnerToGarden(username, gardenId);
        } catch (e) {
        }
    }

    const handleDelete = async (e) => {
        // console.log('handle delete', e.target.id)
        let deleteThis = false;
        if (auth.user.username === e.target.id) {
            // console.log('same user')

            if (window.confirm('Je staat op het punt jezelf te verwijderen van de tuin, dit kan niet ongedaan worden.' +
                'LET OP! tuintjes zonder eigenaren worden verwijderd, dit kun je niet meer terug draaien, weet je het zeker?')) {
                deleteThis = true;
            }
        } else {
            // console.log('other user')
            if(window.confirm(`Je staat op het punt [${e.target.id}] te verwijderen van de tuin,` +
                `LET OP! dit kan niet meer ongedaan worden gemaakt. Weet je het zeker?`)) {
                deleteThis = true;
            }
        }
        if (deleteThis) {
            // user has confirmed
            try {
                const result = await axios.delete(`https://localhost:8443/api/tuintjes/${e.target.id}/${gardenId}`)
                console.log(result.data);
                refreshPage();
            } catch (e) {
                console.error(e)
                console.log(e.response)
            }
        }
    }

    return <div id='garden-settings'>
        <Form
            type={'primary'}
            isDisabled={!isValid}
        >
            <input id='name' type='text' value={name} placeholder={'naam van tuintje'} onChange={handleChange}/>
            <button type={"button"} className='btn btn-form' onClick={changeGardenName}>
                <GiSave/>
            </button>
        </Form>

        <h3>Gebruikers in tuintje</h3>
        {
            addNew
                ? <span className='input-field'>
                    <input id='username' type='text' value={username} placeholder={'gebruikersnaam'} onChange={handleChange}/>
                    <GiSave className={'submit-save'} onClick={addUserToGarden}/>
                  </span>
                : <span onClick={handleClick}><FiPlus/>voeg nieuwe gebruiker toe</span>
        }
        <ul>
            {
                garden.owners &&
                    garden.owners.map((user) => {
                        return <li key={user.username} id={user.username} onClick={handleDelete}><FiX/>@{user.name !== '' ? user.name.toLowerCase() : user.username}</li>
                    })
            }
        </ul>
    </div>
}

export default GardenForm;