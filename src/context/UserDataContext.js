import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const UserDataContext = createContext({});

export const UserDataContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [allProfiles, setAllProfiles] = useState([]);
    const [provinces, setProvinces] = useState([]);

    useEffect(() => {
        fetchProvinces()
    }, [])

    const fetchProvinces = async () => {
        const response = await axios.get(`https://localhost:8443/api/gebruikers/provincies`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        // console.log(response);
        setProvinces(response.data);
    }

    const contextData = {
        allProfiles,
        provinces,
    }

    return <UserDataContext.Provider value={contextData}>
            {children}
    </UserDataContext.Provider>
}

export default UserDataContext;