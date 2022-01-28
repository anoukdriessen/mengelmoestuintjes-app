import {createContext, useContext, useEffect, useState} from "react";
import {AuthDataContext} from "./AuthDataContext";
import axios from "axios";
import PostsDataContext from "./PostsDataContext";

export const GardensDataContext = createContext({});

export const GardensDataContextProvider = ({ children }) => {
    const { auth } = useContext(AuthDataContext)
    const [isLoading, setIsLoading] = useState();

    const [allMyGardens, setAllMyGardens] = useState([]);
    const [allGardens, setAllGardens] = useState([]);

    useEffect(() => {
        fetchAllGardens()
        fetchAllMyGardens()
    }, [])

    // CREATE

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
    // UPDATE

    // DELETE

    const contextData = {
        allGardens,
        allMyGardens,
    }

    return <GardensDataContext.Provider value={contextData}>
        { isLoading
            ? <p>Loading...</p>
            : children
        }
    </GardensDataContext.Provider>
}

export default GardensDataContext;