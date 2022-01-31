import {Username} from "../../forms/FormItems";
import {FiMinus, FiPlus, FiX} from "react-icons/fi";
import {useContext, useState} from "react";
import UserDataContext from "../../../context/UserDataContext";
import ItemNotFound from "../ItemNotFound";
import {AuthDataContext} from "../../../context/AuthDataContext";
import {toast} from "react-toastify";
import axios from "axios";
import {refreshPage} from "../../../helpers/functions";

function UserAndRolesDashboard() {
    const { auth, hasUserRole } = useContext(AuthDataContext);
    const { thisUser, addUserRole, deleteUserRole, isLoading } = useContext(UserDataContext);

    const [toFind, setToFind] = useState({
        username: '',
        roles: [],
    })
    const {username} = toFind;

    const [showForm, toggleShowForm] = useState(false);
    const [isMod, setIsMod] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);


    if (isLoading) {
        return <>loading...</>
    }

    const resetValues = () => {
        setIsMod(false);
        setIsAdmin(false);
        toggleShowForm(false);
    }
    const handleChange = (e) => {
        resetValues();
        setToFind({
            ...thisUser,
            [e.target.id]: e.target.value,
        })
    }

    const handleFindUser = async (e) => {
        e.preventDefault();
        // console.log('trying to find user with username', username)
        if (auth.user.username === username) {
            toast.error('Je kunt jezelf niet veranderen')
        } else {
            try {
                const result = await axios.get(`https://localhost:8443/api/gebruikers/${username}/authorities`, {
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                // console.log(result.data)
                for (let authority in result.data) {
                    // console.log('this authority',result.data[authority].authority.substr(5));
                    let thisRole = result.data[authority].authority.substr(5);
                    if (thisRole === 'USER') {
                        // do nothing
                    } else if (thisRole === 'MODERATOR') {
                        setIsMod(true)
                    } else if (thisRole === 'ADMIN'){
                        setIsAdmin(true)
                    } else {
                        // do nothing
                    }
                }
                toggleShowForm(true);
            } catch (e) {
                console.error(e);
                console.log(e.response);
                toast.error('gebruiker niet gevonden');
            }
        }
    }

    const handleAdd = async (role) => {
        if(window.confirm(`Je staat op het punt gebruiker ${username} rechten te geven voor rol ${role.substr(5)} `)) {
            console.log('changing role from user', role);
            await addUserRole(username, role);
            toast.success(`${username} heeft nu rol ${role.substr(5)}`);
            toggleShowForm(false);
        }
    }
    const handleDelete = async (role) => {
        if (window.confirm(`Je staat op het punt de rechten van rol ${role.substr(5)} gebruiker ${username} te verwijderen, weet je het zeker?`)) {
            console.log('changing role from user', role);
            await deleteUserRole(username, role);
            toast.success(`rol ${role.substr(5)} verwijderd van gebruiker ${username}`);
            if (role.substr(5) === 'MODERATOR') {
                setIsMod(false);
            } else if (role.substr(5) === 'ADMIN') {
                setIsAdmin(false);
            }
            toggleShowForm(false);
        }
    }
    // const handleDeleteUser = async () => {
    //     if (window.confirm(`DANGER ZONE, weet je zeker dat je gebruiker ${username} wilt verwijderen?`)) {
    //         try {
    //             const result = await axios.delete(`https://localhost:8443/api/gebruikers/${username}`,{
    //                 headers: {
    //                     "Content-Type": 'application/json',
    //                     "Authorization": `Bearer ${localStorage.getItem('token')}`
    //                 }
    //             });
    //             console.log(result.data)
    //         } catch (e) {
    //             console.error(e)
    //             console.log(e.response)
    //         }
    //     }
    // }


    return <>
        <form id='user-and-roles' onSubmit={handleFindUser}>
        <Username iconSize={20} username={username} onChange={handleChange}/>
        <button className='btn btn-call-to-action' type='submit' onClick={handleFindUser}>Vind gebruiker</button>
        {
            showForm && <>
                <span> { isMod
                        ? <FiMinus className='link' onClick={() => handleDelete('ROLE_MODERATOR')}/>
                        : <FiPlus onClick={() => handleAdd('ROLE_MODERATOR')}/>} MODERATOR</span>
                { hasUserRole('ROLE_ADMIN') && <span> { isAdmin
                        ? <FiMinus onClick={() => handleDelete('ROLE_ADMIN')}/>
                        : <FiPlus onClick={() => handleAdd(('ROLE_ADMIN'))}/>} ADMIN</span>
                }
            </>
        }
    </form></>
}

export default UserAndRolesDashboard;