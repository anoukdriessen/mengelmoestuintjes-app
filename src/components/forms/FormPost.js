import {AuthDataContext} from "../../context/AuthDataContext";
import {useContext, useState} from "react";
import PostsDataContext from "../../context/PostsDataContext";
import Form from "./Form";
import {PostVisibility, SimpleTextArea, SimpleTextField} from "./FormItems";
import {GiSave} from "react-icons/all";
import {refreshPage} from "../../helpers/functions";

function FormPost({type}) {
    const { auth } = useContext(AuthDataContext);
    const { createNewPost } = useContext(PostsDataContext)

    const [postData, setPostData] = useState({
        title: '',
        summary: '',
        description: '',
        image: null,
        category: type,
        published: true
    })
    const {title, summary, description} = postData;
    const [isValid, setisValid] = useState(false);
    const [message, setMessage] = useState('');
    const [selected, setSelected] = useState()
    const [isPrivate, setIsPrivate] = useState()

    const [isValidTitle, setIsValidTitle] = useState(false);
    const [isValidSummary, setIsValidSummary] = useState(false);
    const [isValidDescription, setIsValidDescription] = useState(false);

    const handleImageChange = (e) => {
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

    const handleChange = (e) => {
        console.log(postData)
        setIsValidTitle(false);
        setIsValidSummary(false);
        setIsValidDescription(false);

        if (e.target.id === title) {
            if (e.target.value.length > 4 && e.target.value.length < 50) {
                setIsValidTitle(true);
            }
        }
        if (e.target.value === summary || e.target.value === description) {
            if (e.target.value.length > 4 ) {
                setIsValidSummary(true)
                setIsValidDescription(true)
            }
        }

        // console.log('changing', e.target.id, e.target.value)
        if (e.target.id === 'published') {
            setIsPrivate(e.target.value === 'private')
        }

        if (isValidTitle && isValidSummary && isValidDescription) {
            setisValid(true)
        }
        setPostData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('create new post', postData);
        try {
            createNewPost(postData, selected, setMessage);
        } catch (e) {
            console.error(e)
            console.log(e)
            setMessage('hmm... er lijkt iets verkeerd te gaan controleer je gegevens en probeer opnieuw')
        }
    }

    return <Form
        type={'primary'}
        isDisabled={!isValid}>

        <SimpleTextField
            item={title}
            name={'title'}
            placeHolder={'Titel van bericht'}
            onChange={handleChange}
            isRequired={true}
            max={50}
        />
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
        <div className={'inputField'}>
            <h4>Voeg een afbeelding toe</h4>{
            postData.image
                ? <img id='post-img' src={`data:image/jpeg;base64,${postData.image}`} alt={title}/>
                : <img id='post-img'
                       src='/images/emptypost.jpg'
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
        {/*<PostVisibility isPrivate={isPrivate} handleChange={handleChange}/>*/}
        { message }
        <button type={"submit"} className='btn btn-form' onClick={handleSubmit}>
            <GiSave/>Opslaan
        </button>
    </Form>
}

export default FormPost;