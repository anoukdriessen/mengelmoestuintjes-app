import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthDataContext} from "./AuthDataContext";
import {getToday, getTomorrow} from "../helpers/functions";
import {useHistory} from "react-router-dom";
import {logDOM} from "@testing-library/react";

export const UserDataContext = createContext({});

export const UserDataContextProvider = ({ children }) => {
    const { auth } = useContext(AuthDataContext);

    const [isLoading, setIsLoading] = useState(true)
    const [allProfiles, setAllProfiles] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const history = useHistory();

    useEffect(() => {
        fetchProvinces()
    }, [])

    const fetchProvinces = async () => {
        setIsLoading(true);
        try {
            if (auth.isAuth) {
                const response = await axios.get(`https://localhost:8443/api/gebruikers/provincies`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                // console.log(response);
                setProvinces(response.data);
            }
            setIsLoading(false);
        } catch (e) {
            console.error(e);
            console.log(e.response);
        }

    }


    const contextData = {
        allProfiles,
        provinces,
    }

    return <UserDataContext.Provider
        value={contextData}
    >
        { isLoading
            ? <p>Loading...</p>
            : children
        }
    </UserDataContext.Provider>
}

export default UserDataContext;