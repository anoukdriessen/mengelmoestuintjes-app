import {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import { GiSave} from "react-icons/all";
import {AuthDataContext} from "../../../context/AuthDataContext";
import {FiEdit3, FiEye, FiEyeOff, FiX} from "react-icons/fi";
import axios from "axios";
import PostsDataContext from "../../../context/PostsDataContext";
import {SimpleTextArea, SimpleTextField} from "../../forms/FormItems";

export function PostPreview({item, imageUrl}) {
    const [active, toggleActive] = useState(false);
    const history = useHistory();

    if (item) {
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
                               src={`/images/${imageUrl}.jpg`}
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
        } else {
            return null;
        }
}

function PostCard({toFind}) {
    const {auth} = useContext(AuthDataContext);
    const {updatePost} = useContext(PostsDataContext);

    const [changeFields, toggleChangeFields] = useState(false);
    const [selected, setSelected] = useState(toFind.image)
    // const [isValid, setIsValid] = useState(false)
    const [deleted, isDeleted] = useState(false);

    const [postData, setPostData] = useState({
        title: '',
        summary: '',
        description: '',
    });
    const { title, summary, description, published } = postData;

    if (toFind) {
        let currentUserIsAuthor;
        if (auth.isAuth) {
            currentUserIsAuthor = (auth.user.username === toFind.author);
        }

        const handleClickChange = () => {
            toggleChangeFields(true);
            setPostData({
                id: toFind.id,
                title: toFind.title,
                image: toFind.image,
                summary: toFind.summary,
                description: toFind.summary,
                category: toFind.category,
                published: toFind.published,
                author: toFind.author,
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

            const fileSize = e.target.files[0].size / 1024 / 1024; // in MiB
            // console.log(fileSize)
            if (fileSize > 1) {
                alert('Bestandsformaat is te groot');
            } else {
                setSelected(e.target.files[0]);
                let file = URL.createObjectURL(e.target.files[0]);
                let out = document.getElementById('post-img');
                out.src = file;
                out.onload = function () {
                    URL.revokeObjectURL(out.src) // free memory
                }
                setPostData((prevState) => ({
                    ...prevState,
                    image: e.target.files[0],
                }))
            }
        }

        const togglePublished = () => {
            toggleChangeFields(false);
            console.log(published)
            try {
                axios.put(`https://localhost:8443/api/berichten/${toFind.id}/${!published}`)
                setPostData((prevState) => ({
                    ...prevState,
                    published: !published,
                }))
            } catch (e) {
                console.error(e)
                console.log(e.response)
            }
        }

        const handleSave = async (e) => {
            // console.log(modified, postData.id, selected)
            updatePost(postData.id, postData, selected);
            toggleChangeFields(false);
        }

        const handleDelete = async (e) => {
            try {
                await axios.delete(`https://localhost:8443/api/berichten/${toFind.id}`,
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

        return <div className='single-post-card' key={toFind.id}>
            {
                !deleted &&
                currentUserIsAuthor &&
                <div className='is-author'>
                    <span className='link'>{!changeFields ? <FiEdit3 onClick={handleClickChange}/> : <GiSave size={25} onClick={handleSave}/>}</span>
                    { changeFields &&
                    <span className='link' onClick={handleDelete}><FiX size={25}/>Verwijder bericht</span> }
                    <span className='link' onClick={togglePublished}>{ published ? <FiEyeOff size={25}/> : <FiEye size={25}/> }</span>
                </div>
            }
            <div className={'single-item'}>
            {
                !changeFields
                    ? <h4>{toFind.title}</h4>
                    : <SimpleTextField
                        item={title}
                        name={'title'}
                        placeHolder={'Titel van bericht'}
                        onChange={handleChange}
                        isRequired={true}
                        max={50}
                    />
            }
            <span className={`author ${deleted ? 'failure' : null}`}>
                {!deleted && published ? 'CONCEPT' : null}
                {deleted ? 'VERWIJDERD' : null}
                <span>Geschreven door: </span>@{toFind.author}</span>
            {
                !changeFields
                    ? <div className='body'>
                        {
                            toFind.image !== null
                                ? <img id='post-img' src={`data:image/jpeg;base64,${toFind.image}`} alt={toFind.title}/>
                                : <img id='post-img'
                                       src={`/images/emptypost0.jpg`}
                                       alt='empty post image'/>
                        }
                        <span className='summary'>{toFind.summary}</span>
                        <span className='description'>{toFind.description}</span>
                    </div>
                    : <div>
                        <div className={'inputField img'}>
                            {
                            postData.image
                                ? <img id='post-img' src={`data:image/jpeg;base64,${postData.image}`} alt={title}/>
                                : <img id='post-img'
                                       src={`/images/emptypost0.jpg`}
                                       alt='empty post image'/>
                        }
                            <input
                                id='image'
                                type='file'
                                name='image'
                                accept='image/png, image/jpeg'
                                onChange={handleImageChange}
                                required={false}
                            />
                        </div>
                        <SimpleTextArea
                            item={summary}
                            name={'summary'}
                            placeHolder={'Beschrijf het bericht'}
                            onChange={handleChange}
                            isRequired={true}
                            max={255}
                        />
                        <SimpleTextArea
                            item={description}
                            name={'description'}
                            placeHolder={'Begin hier met je verhaal'}
                            onChange={handleChange}
                            isRequired={true}
                            max={255}
                        />
                    </div>
            }
            </div>
        </div>;
    } else {
        return null
    }
}

export default PostCard;