import {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import {FiPenTool, FiSave} from "react-icons/all";
import {parseMyDate, refreshPage} from "../../../helpers/functions";
import {AuthDataContext} from "../../../context/AuthDataContext";
import {FiEdit3, FiEye, FiEyeOff, FiX} from "react-icons/fi";
import axios from "axios";

function PostCard({item, type}) {
    const {auth} = useContext(AuthDataContext);
    const [active, toggleActive] = useState(false);
    const [changeFields, toggleChangeFields] = useState(false);

    const [postData, setPostData] = useState({});
    const [blogData, setBlogData] = useState({});
    const [noteData, setNoteData] = useState({});

    const history = useHistory();

    if (item) {
        let currentUserIsAuthor;
        if (auth.isAuth) {
            currentUserIsAuthor = (auth.user.username === item.author);
        }

        if (type === 'preview') {
            return <div className='post-card'
                        onMouseEnter={e => {toggleActive(true)}}
                        onMouseLeave={e => {toggleActive(false)}}
                        onClick={() => { history.push(`/berichten/${item.id}`); }}
            >
                <h4>{item.title}</h4>
                {
                    item.image !== null
                        ? <img id='post-img' src={`data:image/jpeg;base64,${item.image}`} alt={item.title}/>
                        : <img id='post-img'
                               src='/images/emptypost.jpg'
                               alt='empty post image'/>
                }
                <p>
                    <span className='info'>
                    {!item.published
                        ? <span><strong className='retro'>CONCEPT</strong></span>
                        : <span>@{item.author}</span>
                    }
                </span>
                    { item.summary }
                    <br/>
                    <span className='link readmore' onClick={() => {
                        history.push(`/berichten/${item.id}`);
                    }}>Lees verder</span>
                </p>
            </div>
        } else if (type === 'blog'){
            const handleChange = () => {
                console.log('bewerk')
            }
            const togglePublished = () => {
                console.log('verander !published')
            }
            return <div className='single-post-card'>
                {
                    currentUserIsAuthor && <div className='is-author'>
                        <span className='link' onClick={handleChange}><FiEdit3/></span>
                        <span className='link' onClick={togglePublished}>{ item.published ? <FiEyeOff/> : <FiEye/> }</span>
                    </div>
                }
                <h4>{item.title}</h4>
                <span className='author'><span>Geschreven door: </span>@{item.author}</span>
                <p className='body'>
                {
                    item.image !== null
                        ? <img id='post-img' src={`data:image/jpeg;base64,${item.image}`} alt={item.title}/>
                        : <img id='post-img'
                               src='/images/emptypost.jpg'
                               alt='empty post image'/>
                }

                    <span className='summary'>{ item.summary }</span>
                    <span className='description'>{ item.description }</span>
                </p>
            </div>;
        } else if (type === 'note') {
            setNoteData({
                title: item.title,
                description: item.description,
            })
            const handleChange = () => {
                toggleChangeFields(true)
                console.log('bewerk')
            }
            const handleChangeValue = (e) => {
                console.log(e.target.value)
                setNoteData({
                    ...noteData,
                    [e.target.id]: e.target.value,
                })
            }
            const handleSave = async (e) => {
                console.log('update note', noteData, item);
                let updated = {
                    title: noteData.title,
                    summary: item.summary,
                    description: noteData.description,
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
                    toggleChangeFields(false)
                } catch (e) {
                    console.error(e);
                    console.log(e);
                }
                refreshPage()
            }
            const handleDelete = async () => {
                console.log('verwijder', item.id);
                if (window.confirm("Je staat op het punt de notitie te verwijderen, weet je het zeker?")) {
                    try {
                        const result = await axios.delete(`https://localhost:8443/api/berichten/${item.id}`,
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                                }
                            });
                        console.log('response: ',result.data)
                        toggleChangeFields(false)
                    } catch (e){
                        console.error(e);
                        console.log(e.response);
                    }
                }

            }
            return <></>;
        }

    }
    return null;
}

export default PostCard;