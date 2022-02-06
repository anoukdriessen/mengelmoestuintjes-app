import {createContext, useContext, useEffect, useState} from "react";
import {AuthDataContext} from "./AuthDataContext";
import axios from "axios";
import {useHistory} from "react-router-dom";

export const PlantsDataContext = createContext({});

export const PlantsDataContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState();

    const [plant, setPlant] = useState({});
    const [toFind, setToFind] = useState(null);
    const [plants, setPlants] = useState([]);
    const [fruits, setFruits] = useState([]);
    const [flowers, setFlowers] = useState([]);
    const [herbs, setHerbs] = useState([]);
    const [vegetables, setVegetables] = useState([]);

    const history = useHistory();

    useEffect(() => {
        fetchAllPlants()
    }, [])

    // CREATE
    const createNewPlant = async (thisPlant, category, setIsValid, setMessage) => {
        // findPlantByName(thisPlant.name);
        // console.log(toFind)
        // if (toFind === null) {
            console.log(thisPlant);
            const response = await axios.post(`https://localhost:8443/api/planten/${category}`,
                {
                    'name': thisPlant.name,
                    'description': thisPlant.description,
                    'field': null,
                }, {
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
            console.log(response.data)
            setPlants([...plants, thisPlant])
            history.push(`/plant/${response.data.id}`)
    }

    // READ
    const findPlantById = async (id) => {
        const response = await axios.get(`https://localhost:8443/api/planten/${id}`);
        console.log(response.data)
        setPlant(response.data);
    }
    const findPlantByName = async (plant) => {
        // console.log(plant)
        const response = await axios.get(`https://localhost:8443/api/planten/plant/${plant}`);
        // console.log(response)
        setToFind(response.data);
    }
    const fetchAllPlants = async () => {
        const response = await axios.get(`https://localhost:8443/api/planten`);
        // console.log(response.data)
        setPlants(response.data);
    }
    const fetchAllPlantsByCategory = async (category) => {
        const response = await axios.get(`https://localhost:8443/api/planten`);
        // console.log(response.data)
        // eslint-disable-next-line default-case
        switch (category) {
            case 'FLOWERS':
                setFlowers(response.data)
                break;
            case 'HERBS':
                setHerbs(response.data)
                break;
            case 'FRUITS':
                setFruits(response.data)
                break;
            case 'VEGETABLES':
                setVegetables(response.data)
                break;
        }
    }

    // UPDATE

    // DELETE

    const contextData = {
        plant,
        toFind,
        plants,
        fruits,
        vegetables,
        flowers,
        herbs,
        createNewPlant,
        fetchAllPlantsByCategory,
        findPlantById,
        findPlantByName
    }

    return <PlantsDataContext.Provider value={contextData}>
        { isLoading
            ? <p>Loading...</p>
            : children
        }
    </PlantsDataContext.Provider>
}

export default PlantsDataContext;