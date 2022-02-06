import {useContext, useState} from "react";
import {refreshPage} from "../../../helpers/functions";
import {GiSave} from "react-icons/all";
import {PostCategory, PostVisibility, SimpleTextArea, SimpleTextField} from "../FormItems";
import PostsDataContext from "../../../context/PostsDataContext";
import UserPosts from "../../listitems/Posts/UserPosts";
import {AuthDataContext} from "../../../context/AuthDataContext";
import Form from "../Form";

function PostForm({formActive, thisUser, showForm, toggleShowPost}) {
    const { giveUserXp } = useContext(AuthDataContext)
    const { addPersonalNote, createNewPost } = useContext(PostsDataContext);
    const [showNote, toggleShowNote] = useState(true);
    const [showPosts, toggleShowPosts] = useState(true);
    const [showConcepts, toggleShowConcepts] = useState(true);

    const [type, setType] = useState();
    const [isPrivate, setIsPrivate] = useState(true);
    const [selected, setSelected] = useState()
    const [message, setMessage] = useState('')
    const [postData, setPostData] = useState({
        title: '',
        summary: '',
        description: '',
        published: 'private',
        category: 'POST',
        photo: null,
    })
    const {title, summary, description} = postData;

    const handleImageChange = (e) => {
        const fileSize = e.target.files[0].size / 1024 / 1024; // in MiB
        if (fileSize > 1) {
            alert('Het bestandsformaat is te groot');
        } else {
            // Proceed further
            // console.log('changing', e.target.id, e.target.value)
            setSelected(e.target.files[0]);
            let file = URL.createObjectURL(e.target.files[0]);
            let out = document.getElementById('post-img');
            out.src = file;
            out.onload = function() {
                URL.revokeObjectURL(out.src) // free memory
            }
            setPostData({
                ...postData,
                image: selected,
            })
        }
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
        if (postData.category === 'NOTE') {
            await addPersonalNote(postData)
            giveUserXp(100);
            refreshPage()
        } else {
            await createNewPost(postData, selected, setMessage);
        }
    }

    return<>
        {showForm && <Form
            type={'primary'}>

            <h4>Type</h4>
            <PostCategory type={type} handleChange={handleChange}/>

            <h4>Titel</h4>
            <SimpleTextField
                item={title}
                name={'title'}
                placeHolder={'Titel van bericht'}
                onChange={handleChange}
                isRequired={true}
                max={50}
            />

            {
                postData.category === 'POST' && <>
            <h4>Samenvatting</h4>
                    <SimpleTextArea
                        item={summary}
                        name={'summary'}
                        placeHolder={'Beschrijf het bericht'}
                        onChange={handleChange}
                        isRequired={true}
                        max={255}
                    />
            </>
            }
            <h4>Bericht</h4>
            <SimpleTextArea
                item={description}
                name={'description'}
                placeHolder={'Begin hier met je verhaal'}
                onChange={handleChange}
                isRequired={true}
                max={255}
            />
            {
                postData.category === 'POST' && <div className={'inputField'}>
                    <h4>Voeg een afbeelding toe</h4>{
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
            }{
                postData.category === 'POST' && <PostVisibility isPrivate={isPrivate} handleChange={handleChange}/>
            }
            <button type={"button"} className='btn btn-form' onClick={handleAddPost}>
                <GiSave/>Opslaan
            </button>
        </Form>
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