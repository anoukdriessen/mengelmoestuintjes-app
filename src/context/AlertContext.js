import {createContext, useState} from "react";

export const AlertContext = createContext({});

function AlertContextProvider({ children }) {
    const [alert, setAlert] = useState(null);

    const contextData = {
        alert,
        setAlert,
    }

    return (
        <AlertContext.Provider value={contextData}>
            {children}
        </AlertContext.Provider>
    )
}

export default AlertContextProvider;