import {createContext, useState} from "react";
import {useHistory} from "react-router-dom";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {

    const [auth, toggleAuth] = useState(false);
    // const history = useHistory();

    function login() {
        // toggleAuth(true)
        console.log('gebruiker ingelogd', auth)
        // history.push('/profile')
    }

    function logout() {
        // toggleAuth(false)
        console.log('gebruiker uitgelogd', auth)
        // history.push('/')
    }

    const contextData = {
        isAuth: auth,
        login: login,
        logout: logout
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;