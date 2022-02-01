import React, {useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import PageHeader from "../../components/pageitems/PageHeader";
import PageContent from "../../components/pageitems/PageContent";
import GardensDataContext, {GardensDataContextProvider} from "../../context/GardensDataContext";
import ShowAndHide, {ShowAndHideSingleGarden} from "../../components/listitems/ShowAndHide";
import axios from "axios";
import {getUniqueId, refreshPage} from "../../helpers/functions";
import ItemNotFound from "../../components/listitems/ItemNotFound";
import GardenView from "../../components/listitems/Gardens/GardenView";
import {InputFieldWithIcon, SubmitBtn} from "../../components/forms/FormItems";
import NoteCard from "../../components/listitems/Posts/NoteCard";
import {AuthDataContext} from "../../context/AuthDataContext";
import {FiType, FiX} from "react-icons/fi";

export function Garden() {
    const { auth } = useContext(AuthDataContext);
    const {garden, notes, fields, fetchGardenNotes, fetchGardenFields, fetchGardenById} = useContext(GardensDataContext)
    // const { profiles, fetchProfilesFromUsers } = useContext(UserDataContext)
    const params = useParams();
    // const history = useHistory();

    const [note, setNote] = useState({
        title: '',
        description: '',
    })
    const { title, description } = note;

    const getThisGarden = async () => {
        fetchGardenById(params.gardenid);
        fetchGardenNotes(params.gardenid);
        fetchGardenFields(params.gardenid);
    }

    useEffect(() => {
        getThisGarden()
    }, []);

    const [viewOne, setViewOne] = useState(true);
    const [viewTwo, setViewTwo] = useState(false);
    const [viewThree, setViewThree] = useState(false);

    // const {id, name, size, x, y, owners, fields} = thisGarden;
    // const {columns, rows} = fields;

    // const [toChange, setToChange] = useState({
    //     id: garden.id,
    //     name: garden.name,
    //     numberOfTasks: garden.tasks,
    //     owners: garden.owners,
    //     size: garden.size,
    //     tasks: garden.tasks,
    //     x: garden.x,
    //     y: garden.y,
    // });
    // const {x, y} = toChange;

    const [showNoteForm, toggleShowNoteForm] = useState(false);


    // console.log("de rijen in de tuin",thisGarden.rows)
    // console.log("de kolommen in de tuin",thisGarden.columns)
    // console.log(garden.owners)

    // const handleChange = (e) => {
    //     console.log(e.target.id, e.target.value)
    //     setToChange({
    //         ...toChange,
    //         [e.target.id]: e.target.value,
    //     });
    // }
    const handleChange = (e) => {
        setNote({
            ...note,
            [e.target.id]: e.target.value
        })
    }
    const handleNewNote = async (e, id) => {
        e.preventDefault();
        console.log(id)
        console.log(note)
        console.log(auth.user.username)
        try {
            const result = await axios.put(`https://localhost:8443/api/tuintjes/${id}/${auth.user.username}/notities`,
                note
            )
            console.log(result);
            refreshPage();
        } catch (e) {
            console.error(e);
            console.log(e.response);
        }
    }
    const handleDeleteNote = async (e, id, note) => {
        e.preventDefault();
        if(window.confirm("Je staat op het punt deze notitie te verwijderen, Weet je het zeker?")) {
            try {
                const result = await axios.delete(`https://localhost:8443/api/tuintjes/${id}/${auth.user.username}/notitie/${note}`,
                    note
                )
                console.log(result);
                refreshPage();
            } catch (e) {
                console.error(e);
                console.log(e.response);
            }
        }
    }

    return <>
        <ShowAndHideSingleGarden
            one={viewOne}
            setOne={setViewOne}
            two={viewTwo}
            setTwo={setViewTwo}
            three={viewThree}
            setThree={setViewThree}
        />

        <div id='garden-content'>
            {viewOne && <GardenView type={1} garden={garden}>
                {/*  TODO garden notities  */}
                <form onSubmit={(e) => handleNewNote(e, garden.id)}>
                    <h4>NOTITIES</h4>
                    <InputFieldWithIcon icon={<FiType/>}>
                        <input
                            id='title'
                            type='text'
                            placeholder='Titel van de notitie'
                            value={title}
                            onChange={handleChange}
                            maxLength={50}
                            required={true}
                        />
                    </InputFieldWithIcon>
                    <InputFieldWithIcon>
                        <textarea
                           id='description'
                           placeholder='Begin hier met het schrijven van je notitie...'
                           value={description}
                           onChange={handleChange}
                           maxLength={255}
                           required={true}
                        />
                    </InputFieldWithIcon>
                    <button type='submit'>Opslaan</button>
                </form>
                <div id='post-cards'>
                    {notes
                        ? <>{
                        notes.map((note) => {
                            return <div onClick={(e) => handleDeleteNote(e, garden.id, note.id)}>
                                    <NoteCard key={getUniqueId()} item={note} disableEditing={true} />
                                </div>
                        })
                        }</>
                        : <ItemNotFound title={'Notities'}/>
                    }
                </div>
            </GardenView>}
            {viewTwo && <GardenView type={2} garden={garden}>
                {/* TODO plants */}
            </GardenView>}
            {viewThree && <GardenView type={3} garden={garden}>
                { fields && fields.map((field) => {
                    return <p>{field.name}</p>
                })}
            </GardenView>}
        </div>
    </>
}


function SingleGarden() {
    return <>
        <PageHeader title='Mengelmoestuintjes'/>
        <PageContent>
            <GardensDataContextProvider>
                <Garden/>
            </GardensDataContextProvider>
        </PageContent>
    </>
}

export default SingleGarden;