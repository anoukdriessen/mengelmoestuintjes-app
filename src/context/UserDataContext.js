import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const UserDataContext = createContext({});

export const UserDataContextProvider = ({ children }) => {
    const [user, setUser] = useState({
        username: '',
    });
    const [allUsers, setAllUsers] = useState([]);

    const contextData = {
        user,
    }

    return <UserDataContextProvider.Provider value={contextData}>
            {children}
    </UserDataContextProvider.Provider>
}

export default UserDataContext;