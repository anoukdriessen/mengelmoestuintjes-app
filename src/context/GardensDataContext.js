import {createContext, useContext, useEffect, useState} from "react";
import {AuthDataContext} from "./AuthDataContext";
import axios from "axios";
import PostsDataContext from "./PostsDataContext";
import {useHistory} from "react-router-dom";

export const GardensDataContext = createContext({});

export const GardensDataContextProvider = ({ children }) => {
    const { auth } = useContext(AuthDataContext)
    const [isLoading, setIsLoading] = useState();

    const [garden, setGarden] = useState({});
    const [notes, setNotes] = useState([]);
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
        console.log(thisGarden)
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
            const response = await axios.get(`https://localhost:8443/api/tuintjes/${id}`);
            setGarden(response.data)
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
    const fetchGardenFields = async (id) => {
        try {
            const response = await axios.get(`https://localhost:8443/api/tuintjes/${id}/velden`);
            // console.log(response)
            setFields(response.data)
        } catch (e) {
            console.error(e)
        }
    }
    // UPDATE
    const updateGardenName = async (gardenId, newName) => {
        try {
            const response = await axios.get(`https://localhost:8443/api/tuintjes/${gardenId}`, {
                'name': newName,
            });
            console.log(response)
            setGarden({
                ...garden,
                name: newName,
            })
        } catch (e) {
            console.error(e)
        }
    }

    const addUserToGarden = async (username, gardenId) => {
        try {
            await axios.post(`https://localhost:8443/api/tuintjes/${username}/${gardenId}`)
        } catch (e) {
            console.error(e)
            console.log(e.response)
        }
    }

    // DELETE

    const contextData = {
        garden,
        notes,
        fields,
        allGardens,
        allMyGardens,
        createNewGarden,
        fetchGardenById,
        fetchGardenNotes,
        fetchGardenFields,
        updateGardenName,
    }

    return <GardensDataContext.Provider value={contextData}>
        { isLoading
            ? <p>Loading...</p>
            : children
        }
    </GardensDataContext.Provider>
}

export default GardensDataContext;