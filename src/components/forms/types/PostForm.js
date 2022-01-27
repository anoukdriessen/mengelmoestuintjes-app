import {useContext, useState} from "react";
import UserDataContext from "../../../context/UserDataContext";
import {getUniqueId, refreshPage, sortArrayById} from "../../../helpers/functions";
import {FiHash, FiType, FiX} from "react-icons/fi";
import {FiEdit, GiChecklist, GiSave, GiStabbedNote} from "react-icons/all";
import {GiNotebook} from "react-icons/gi";
import axios from "axios";
import {InputFieldWithIcon, PostCategory, PostVisibility, SubmitBtn} from "../FormItems";
import {useHistory} from "react-router-dom";
import PostCard from "../../listitems/Posts/PostCard";
import PostCards from "../../listitems/Posts/PostCards";
import PostsDataContext from "../../../context/PostsDataContext";
import UserNotes from "../../listitems/Posts/UserPosts";
import UserPosts from "../../listitems/Posts/UserPosts";

function PostForm({formActive, thisUser, showForm, toggleShowPost}) {
    const [showNote, toggleShowNote] = useState(true);
    const [showPosts, toggleShowPosts] = useState(false);
    const [showConcepts, toggleShowConcepts] = useState(false);

    const [showMessages, toggleShowMessages] = useState(true);
    const [update, setToUpdate] = useState(false);
    const [type, setType] = useState();
    const [isPrivate, setIsPrivate] = useState(true);
    const [selected, setSelected] = useState()
    const [postData, setPostData] = useState({
        title: '',
        summary: '',
        description: '',
        published: 'private',
        category: 'POST',
        photo: null,
    })
    const {title, summary, description, photo} = postData;

    const history = useHistory();

    const handleImageChange = (e) => {
        console.log('changing', e.target.id, e.target.value)
        setSelected(e.target.files[0]);
        let file = URL.createObjectURL(e.target.files[0]);
        let out = document.getElementById('post-img');
        out.src = file;
        out.onload = function() {
            URL.revokeObjectURL(out.src) // free memory
        }
        setPostData((prevState) => ({
            ...prevState,
            photo: selected,
        }))
    }
    const handleChange = (e) => {
        // console.log('changing', e.target.id, e.target.value)
        if (e.target.id === 'category') {
            setType(e.target.value)
        }
        if (e.target.id === 'published') {
            setIsPrivate(e.target.value === 'private')
        }
        setPostData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))

    }
    const handleAddPost = async (e) => {
        e.preventDefault();
        if (!update) {
            // add new post/note
            if (postData.category === 'POST') {
                // add new post, check private / public
                postData.published = postData.published !== 'private';
                console.log('new post', postData)
            } else {
                // add new task, clear summary, picture and published
                postData.summary = '';
                postData.published = false;
                console.log('new task', postData)
            }

            try {
                const result = await axios.post(`https://localhost:8443/api/gebruikers/${thisUser.username}/berichten`,
                    postData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                // console.log('new post id=',result.data);
                // console.log('adding image', selected);
                if (selected) {
                    // console.log('image found', selected)
                    const formData = new FormData();
                    let file = selected;
                    formData.append('photo', file, 'image');
                    try {
                        const addImage = await axios.post(`https://localhost:8443/api/berichten/${result.data}/upload`,
                            formData,
                            { headers: {
                                    'Content-Type': `multipart/form-data; boundary=photo`,
                                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                                }, params: {
                                photo: file
                                }
                            });
                        // console.log('result add image', addImage);

                    } catch (e) {
                        console.error(e);
                        console.log(e.response);
                    }
                } else {
                    console.log('image NOT found')
                }
                refreshPage();
            } catch (e) {
                console.error(e)
                console.log(e.response)
            }
        } else {
            // update post
            // TODO PUT request
            // setToUpdate(id)
            // setUpdate(false)
            // catch errors
        }
        // refreshPage()
    }

    const handleEdit = async (postId) => {
        formActive(true);
        console.log('edit');
        let postToChange;
        // TODO GET request find post by id
        // find = get
        // postToChange = find.data
        // setPost ({values})
        // setToUpdate(postId)
        // setUpdate(true)
        // console.log(postToChange)
        // catch errors
    }
    const handleDelete = async (postId) => {
        console.log('delete', postId);
        if (window.confirm(`Je staat op het punt het bericht te verwijderen. Weet je het zeker?`)) {
            // TODO DELETE request
            // log result
            // refreshPage()
            // catch errors
        }
    }

    return<>
        {showForm && <form id='new-post' onSubmit={handleAddPost}>
            <h4>Type</h4>
            <PostCategory type={type} handleChange={handleChange}/>
            <h4>Titel</h4>
            <InputFieldWithIcon icon={<FiType/>}>
                <input
                    id='title'
                    type='text'
                    placeholder='Titel van bericht'
                    value={title}
                    onChange={handleChange}
                    maxLength={50}
                    required={true}
                />
            </InputFieldWithIcon>

            {
                postData.category === 'POST' && <>
            <h4>Samenvatting</h4>
            <InputFieldWithIcon>
                 <textarea
                    id='summary'
                    placeholder='Beschrijf in het kort je bericht'
                    value={summary}
                    onChange={handleChange}
                    maxLength={200}
                    required={true}
                />
            </InputFieldWithIcon>
            </>
            }
            <h4>Bericht</h4>
            <InputFieldWithIcon>
            <textarea
                id='description'
                placeholder='Begin hier met het schrijven van je bericht...'
                value={description}
                onChange={handleChange}
                maxLength={255}
                required={true}
            />
            </InputFieldWithIcon>
            {
                postData.category === 'POST' && <div id='image-form'>
                    <h4>Voeg een afbeelding toe</h4>
                    {
                        postData.photo
                            ? <img id='post-img' src={`data:image/jpeg;base64,${postData.photo}`} alt={title}/>
                            : <img id='post-img'
                                   src='/images/emptypost.jpg'
                                   alt='empty post image'/>
                    }
                    <input
                        id='photo'
                        type='file'
                        name='photo'
                        accept='image/png, image/jpeg'
                        onChange={handleImageChange}
                        required={false}
                    />
                </div>
            }{
                postData.category === 'POST' && <PostVisibility isPrivate={isPrivate} handleChange={handleChange}/>

            }
            <SubmitBtn update={update}>Opslaan</SubmitBtn>
        </form>
        }


        <UserPosts
            note={showNote}
            showNotes={toggleShowNote}
            publ={showPosts}
            showPublic={toggleShowPosts}
            priv={showConcepts} s
            showPrivate={toggleShowConcepts}
            howPrivate/>

    </>
}

export default PostForm;