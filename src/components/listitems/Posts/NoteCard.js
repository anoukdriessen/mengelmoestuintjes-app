import {AuthDataContext} from "../../../context/AuthDataContext";
import {getUniqueId, refreshPage} from "../../../helpers/functions";
import {FiEdit3, FiX} from "react-icons/fi";
import {FiSave} from "react-icons/all";
import {useContext, useState} from "react";
import axios from "axios";

function NoteCard({item, disableEditing}) {
        const { auth } = useContext(AuthDataContext);
        const [changeFields, setChangeFields] = useState(false);

        const [title, setTitle] = useState('');
        const [description, setDescription] = useState('');

        const handleClickChange = () => {
            setTitle(item.title);
            setDescription(item.description);
            setChangeFields(true);
        }
        const handleChange = (e) => {
            if (e.target.id === 'title') {
                console.log('change title')
                setTitle(e.target.value)
            } else {
                console.log('change description')
                setDescription(e.target.value)
            }
        }

        const handleSave = async (e) => {
            let thisNote = {
                title,
                description,
            }
            console.log('update note', thisNote, item);
            let updated = {
                title: thisNote.title,
                summary: item.summary,
                description: thisNote.description,
                image: item.image,
                category: item.category,
                published: item.published
            }
            try {
                const result = await axios.put(`https://localhost:8443/api/berichten/${item.id}`,
                    updated,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                console.log('response: ',result.data)
                setChangeFields(false)
                refreshPage();
            } catch (e) {
                console.error(e);
                console.log(e);
            }
        }

        const handleDelete = async () => {
            console.log('verwijder', item);
            if (window.confirm("Je staat op het punt de notitie te verwijderen, weet je het zeker?")) {
                try {
                    const result = await axios.delete(`https://localhost:8443/api/berichten/${item.id}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${localStorage.getItem('token')}`
                            }
                        });
                    console.log('response: ', result.data)
                    setChangeFields(false)
                    refreshPage()
                } catch (e) {
                    console.error(e);
                    console.log(e.response);
                }
            }
        }

        return <div className='note-card' id={item.id}>
                {
                    !disableEditing && auth.user.username === item.author &&
                        <div className='is-author'>
                            <span className='link'>
                                {!changeFields
                                    ? <FiEdit3 onClick={handleClickChange}/>
                                    : <FiSave onClick={handleSave}/>}
                            </span>
                        </div>
                }
                {
                    !changeFields
                        ? <h4>{item.title}</h4>
                        : <input
                            id='title'
                            type='text'
                            placeholder='Titel van bericht'
                            value={title}
                            onChange={handleChange}
                            maxLength={50}
                            required={true}
                        />
                }
                <p className='body'>
                    {
                        !changeFields
                            ? item.description
                            : <textarea
                                id='description'
                                placeholder='Begin hier met het schrijven van je bericht...'
                                value={description}
                                onChange={handleChange}
                                maxLength={255}
                                required={true}
                            />
                    }
                </p>
                {
                    !disableEditing && auth.user.username === item.author &&
                    changeFields && <div className='is-author'>
                        <span className='link' onClick={handleDelete}><FiX/></span>
                    </div>
                }
        </div>
}

export default NoteCard;