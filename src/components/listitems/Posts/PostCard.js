import {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {FiPenTool, FiSave, GiSave} from "react-icons/all";
import {getUniqueId, parseMyDate, refreshPage} from "../../../helpers/functions";
import {AuthDataContext} from "../../../context/AuthDataContext";
import {FiEdit3, FiEye, FiEyeOff, FiX} from "react-icons/fi";
import axios from "axios";
import {toast} from "react-toastify";

function PostCard({item, type}) {
    const {auth} = useContext(AuthDataContext);
    const [active, toggleActive] = useState(false);
    const [changeFields, toggleChangeFields] = useState(false);
    const [showImageInput, toggleShowImageInput] = useState(false);
    const [selected, setSelected] = useState()
    const [deleted, isDeleted] = useState(false);
    const [postData, setPostData] = useState({
        title: '',
        summary: '',
        description: '',
        published: false,
    });
    const { title, summary, description, published } = postData;


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
            const handleClickChange = () => {
                toggleChangeFields(true);
                setPostData({
                    id: item.id,
                    title: item.title,
                    summary: item.summary,
                    description: item.summary,
                    published: item.published,
                    author: item.author,
                })
            }
            const handleChange = (e) => {
                // console.log('bewerk', e.target.id)
                setPostData({
                    ...postData,
                    [e.target.id]: e.target.value
                })
            }
            const handleImageChange = (e) => {
                setSelected(e.target.files[0]);
                let file = URL.createObjectURL(e.target.files[0]);
                let out = document.getElementById('post-img');
                out.src = file;
                out.onload = function () {
                    URL.revokeObjectURL(out.src) // free memory
                }
                setPostData((prevState) => ({
                    ...prevState,
                    image: selected,
                }))
            }

            const togglePublished = () => {
                // console.log('verander published', item.id)
                // console.log('NU=', item.published)
                // console.log('CHANGE TO=', !item.published)
                try {
                    const result = axios.put(`https://localhost:8443/api/berichten/${item.id}/${!item.published}`)
                    setPostData((prevState) => ({
                        ...prevState,
                        published: !published,
                    }))
                    // console.log(result);
                    let visible = 'gepubliceerd'
                    if (postData.published) {
                        visible = 'een privé concept'
                    }
                    toast.success(`${item.title} is nu ${visible}`)
                } catch (e) {
                    console.error(e)
                    console.log(e.response)
                }
                toggleChangeFields(false);
            }

            const handleSave = async (e) => {
                // console.log(postData)
                let modified = {
                    title: postData.title,
                    summary: postData.summary,
                    description: postData.description,
                    published: postData.published,
                    category: postData.category,
                }
                try {
                    const result = await axios.put(`https://localhost:8443/api/berichten/${item.id}`,
                        modified,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${localStorage.getItem('token')}`
                            }, params: {
                                published: false
                            }
                        });
                    // console.log(result);
                    if (selected) {
                        // console.log(selected);
                        const formData = new FormData();
                        let file = selected;
                        formData.append('photo', file, 'image');
                        try {
                            await axios.post(`https://localhost:8443/api/berichten/${postData.id}/upload`,
                                formData,
                                { headers: {
                                        'Content-Type': `multipart/form-data; boundary=photo`,
                                        "Authorization": `Bearer ${localStorage.getItem('token')}`,
                                    }, params: {
                                        photo: file
                                    }
                                });
                        } catch (e) {
                            console.error(e);
                            console.log(e.response);
                        }
                    }
                    toggleChangeFields(false);
                } catch (e) {
                    console.error(e);
                    console.log(e.response);
                }
            }

            const handleDelete = async (e) => {
                try {
                    const result = await axios.delete(`https://localhost:8443/api/berichten/${item.id}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${localStorage.getItem('token')}`
                            }
                        })
                    // console.log(result);
                    toggleChangeFields(false);
                    isDeleted(true);
                } catch (e) {
                    console.error(e);
                    console.log(e.response);
                }
            }

            return <div className='single-post-card' key={item.id}>
                {
                    !deleted && currentUserIsAuthor && <div className='is-author'>
                        <span className='link'>{!changeFields ? <FiEdit3 onClick={handleClickChange}/> : <GiSave onClick={handleSave}/>}</span>
                        { changeFields && <span className='link' onClick={handleDelete}><FiX/>Verwijder bericht</span> }
                        <span className='link' onClick={togglePublished}>{ !published ? <FiEyeOff/> : <FiEye/> }</span>
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
                <span className={`author ${deleted ? 'failure' : null}`}>
                    {!deleted && published ? 'CONCEPT' : null}
                    {deleted ? 'VERWIJDERD' : null}
                    <span>Geschreven door: </span>@{item.author}</span>
                {
                    !changeFields
                        ? <p className='body'>
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
                        : <p>
                            {
                                postData.image !== null
                                    ? <img id='post-img' src={`data:image/jpeg;base64,${item.image}`} alt={item.image}/>
                                    : <img id='post-img'
                                           src='/images/emptypost.jpg'
                                           alt='empty post image'/>
                            }
                            { showImageInput && <input
                                    id='photo'
                                    type='file'
                                    name='photo'
                                    accept='image/png, image/jpeg'
                                    onChange={handleImageChange}
                                    required={false}
                                />
                            }
                            <span onClick={() => toggleShowImageInput((prevState => !prevState))}>
                                {!showImageInput ? 'VERANDER AFBEELDING' : '' }
                            </span>
                            <textarea
                                className='summary'
                                id='summary'
                                placeholder='Beschrijf in het kort je bericht'
                                value={summary}
                                onChange={handleChange}
                                maxLength={200}
                                required={true}
                            />
                            <textarea
                                className='description'
                                id='description'
                                placeholder='Begin hier met het schrijven van je bericht...'
                                value={description}
                                onChange={handleChange}
                                maxLength={255}
                                required={true}
                            />
                        </p>
                }

            </div>;
        } else {
            return null
        }
    } else {
        return null;
    }
}

export default PostCard;