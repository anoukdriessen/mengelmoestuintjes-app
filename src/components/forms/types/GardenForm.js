import {FiPlus, FiX} from "react-icons/fi";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {FiSave, GiSave} from "react-icons/all";
import {refreshPage} from "../../../helpers/functions";
import {toast} from "react-toastify";
import {AuthDataContext} from "../../../context/AuthDataContext";

function GardenForm({gardenId, owners}) {
    const {auth} = useContext(AuthDataContext);
    const [addNew, toggleAddNew] = useState(false);
    const [toAdd, setToAdd] = useState('')
    const [users, setUsers] = useState([...owners]);

    const handleClick = () => {
        toggleAddNew((prevState => !prevState))
    }

    const handleChange = (e) => {
        // console.log(e.target.id, e.target.value)
        setToAdd(e.target.value)
    }

    const addUserToGarden = async () => {
        toggleAddNew((prevState => !prevState))
        // console.log('saving user to garden', toAdd)
        try {
            await axios.post(`https://localhost:8443/api/tuintjes/${toAdd}/${gardenId}`)
            // console.log(result);
            refreshPage();
        } catch (e) {
            console.error(e)
            console.log(e.response)
            toast.error('gebruiker niet gevonden')
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
        <h3>Gebruikers in tuintje</h3>
        {
            addNew
                ? <span className='input-field'>
                    <input id='username' type='text' value={toAdd} placeholder={'gebruikersnaam'} onChange={handleChange}/>
                    <GiSave className={'submit-save'} onClick={addUserToGarden}/>
                  </span>
                : <span onClick={handleClick}><FiPlus/>voeg nieuwe gebruiker toe</span>
        }
        <ul>
            {
                users &&
                    users.map((user) => {
                        return <li key={user.username} id={user.username} onClick={handleDelete}><FiX/>@{user.name !== '' ? user.name.toLowerCase() : user.username}</li>
                    })
            }
        </ul>
    </div>
}

export default GardenForm;