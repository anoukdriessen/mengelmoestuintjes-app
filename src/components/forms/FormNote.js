import {useContext, useState} from "react";
import {AuthDataContext} from "../../context/AuthDataContext";
import Form from "./Form";
import {SimpleTextArea, SimpleTextField} from "./FormItems";
import {GiSave} from "react-icons/all";
import PostsDataContext from "../../context/PostsDataContext";
import {toast} from "react-toastify";
import {refreshPage} from "../../helpers/functions";

function FormNote({gardenId}) {
    const { auth } = useContext(AuthDataContext);
    const { createNewNote } = useContext(PostsDataContext);

    const [note, setNote] = useState({
        title: '',
        description: ''
    })
    const {title, description} = note;
    const [isValid, setIsValid] = useState(false);

    const handleSubmit = async (id) => {
        let newNote = {
            title: note.title,
            description: note.description,
        }
        console.log('create note', newNote);
        createNewNote(gardenId, newNote);
        refreshPage();
    }

    const handleChange = (e) => {
        setNote({
            ...note,
            [e.target.id]: e.target.value,
        });
    }

    return <>
        <Form
            type={'primary'}
            onSumbit={handleSubmit}
            isDisabled={!isValid}
        >
            <SimpleTextField
                iconSize={20}
                item={title}
                name={'title'}
                placeHolder={'Titel'}
                onChange={handleChange}
                isRequired={true}
            />

            <SimpleTextArea
                iconSize={15}
                item={description}
                name={'description'}
                placeHolder={'Notitie'}
                onChange={handleChange}
                isRequired={true}
                max={255}
            />
            <button type={"button"} className='btn btn-form' onClick={handleSubmit}>
                <GiSave/>Opslaan
            </button>
        </Form>
    </>
}

export default FormNote;