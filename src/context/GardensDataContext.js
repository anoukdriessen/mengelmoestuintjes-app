import {createContext, useContext, useEffect, useState} from "react";
import {AuthDataContext} from "./AuthDataContext";
import axios from "axios";
import {useHistory} from "react-router-dom";

export const GardensDataContext = createContext({});

export const GardensDataContextProvider = ({ children }) => {
    const { auth } = useContext(AuthDataContext)
    const [isLoading, setIsLoading] = useState();

    const [garden, setGarden] = useState({});
    const [owners, setOwners] = useState({});
    const [notes, setNotes] = useState([]);
    const [plants, setPlants] = useState([]);
    const [fields, setFields] = useState([]);
    const [allMyGardens, setAllMyGardens] = useState([]);
    const [allGardens, setAllGardens] = useState([]);

    const history = useHistory();

    useEffect(() => {
        fetchAllGardens()
        fetchAllMyGardens()
    }, [])

    // CREATE
    const createNewGarden = async (thisGarden) => {
        // console.log(thisGarden)
        let thisUser = auth.user.username;
        const response = await axios.post(`https://localhost:8443/api/tuintjes`,
            {
                'name': thisGarden.name,
                'x': thisGarden.x,
                'y': thisGarden.y
            },
            {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                params: {
                    "username": `${thisUser}`
                }
            }
        );
        console.log(response.data);
        history.push(`/tuintje/${response.data.id}`)
    }

    // READ
    const fetchAllGardens = async () => {
        const response = await axios.get(`https://localhost:8443/api/tuintjes`, {
        });
        // console.log(response.data);
        setAllGardens(response.data);
    }
    const fetchAllMyGardens = async () => {
        let thisUser = auth.user.username;
        const response = await axios.get(`https://localhost:8443/api/tuintjes/from/${thisUser}`, {
        });
        // console.log(response.data);
        setAllMyGardens(response.data)
    }
    const fetchGardenById = async (id) => {
        // console.log('garden by id', id)
        try {
            let isUserInGarden = false;
            const response = await axios.get(`https://localhost:8443/api/tuintjes/${id}`);
            // console.log(response.data.owners)
            response.data.owners.map((owner) => {
                // console.log(owner.username)
                if (owner.username === auth.user.username) {
                    isUserInGarden = true;
                }
            })
            // console.log(auth.user.username, isUserInGarden)

            if (isUserInGarden) {
                setGarden(response.data)
            } else {
                history.push('/404')
            }
        } catch (e) {
            console.error(e);
        }
    }
    const fetchGardenOwners = async (id) => {
        try {
            const response = await axios.get(`https://localhost:8443/api/tuintjes/${id}/gebruikers`);
            setOwners(response.data)
        } catch (e) {
            console.error(e);
        }
    }
    const fetchGardenNotes = async (id) => {
        try {
            const response = await axios.get(`https://localhost:8443/api/tuintjes/${id}/notities`);
            setNotes(response.data)
        } catch (e) {
            console.error(e);
        }
    }
    const fetchGardenPlants = async (id) => {
        try {
            const response = await axios.get(`https://localhost:8443/api/tuintjes/${id}/planten`)
            setPlants(response.data);
        } catch (e) {
            console.error(e);
        }
    }
    const fetchGardenFields = async (id) => {
        try {
            const response = await axios.get(`https://localhost:8443/api/tuintjes/${id}/velden`);
            // console.log(response)
            setFields(response.data)
        } catch (e) {
            console.error(e)
        }
    }
    const getPlantsFromField = async (gardenId, fieldName) => {
        try {
            const response = await axios.get(`https://localhost:8443/api/tuintjes/${gardenId}/velden/${fieldName}/planten`);
            console.log(response.data);
            // setPlants([...response.data])
        } catch (e) {
            console.error(e);
        }
    }

    // UPDATE
    const updateGardenName = async (gardenId, newName) => {
        try {
            const response = await axios.get(`https://localhost:8443/api/tuintjes/${gardenId}`, {
                'name': newName,
            });
            // console.log(response)
            setGarden({
                ...garden,
                name: newName,
            })
        } catch (e) {
            console.error(e)
        }
    }
    const addOwnerToGarden = async (username, gardenId) => {
        try {
            const result = await axios.post(`https://localhost:8443/api/tuintjes/${username}/${gardenId}`)
            console.log(result.data);
            setGarden({
                ...garden,
                owners: result.data,
            })
        } catch (e) {
            console.error(e)
            console.log(e.response)
        }
    }
    const createNewNote = async (gardenId, newNote) => {
        console.log(newNote);
        let thisUser = auth.user.username;

        await axios.put(`https://localhost:8443/api/tuintjes/${gardenId}/${auth.user.username}/notities`,
            {
                'title': newNote.title,
                'description': newNote.description,
            }, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
        setNotes([...notes, newNote]);
    }

    // DELETE
    const removeNoteFromGarden = async (gardenId, note) => {
        try {
            const result = await axios.delete(`https://localhost:8443/api/tuintjes/${gardenId}/${auth.user.username}/notitie/${note}`,
                note
            )
            console.log(result);
            fetchGardenNotes(gardenId)
        } catch (e) {
            console.error(e);
            console.log(e.response);
        }
    }

    const contextData = {
        garden,
        owners,
        notes,
        plants,
        fields,
        allGardens,
        allMyGardens,
        createNewNote,
        createNewGarden,
        fetchGardenById,
        fetchGardenNotes,
        fetchGardenOwners,
        fetchGardenFields,
        fetchGardenPlants,
        updateGardenName,
        addOwnerToGarden,
        getPlantsFromField,
        removeNoteFromGarden,
    }

    return <GardensDataContext.Provider value={contextData}>
        { isLoading
            ? <p>Loading...</p>
            : children
        }
    </GardensDataContext.Provider>
}

export default GardensDataContext;