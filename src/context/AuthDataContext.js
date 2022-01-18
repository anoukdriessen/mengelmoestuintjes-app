import {createContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import jwt_decode from 'jwt-decode'

export const AuthDataContext = createContext({});

function AuthContextProvider({ children }) {
    const [auth, setAuth] = useState({
        user: null,
        isAuth: false,
        status: 'pending',
    });

    useEffect(() => {
        try {
            if (localStorage.getItem('token') !== null) {
                const decode = jwt_decode(localStorage.getItem('token'));
                setAuth({
                    user: {
                        username: decode.sub
                    },
                    isAuth: true,
                    status: 'done',
                });
            } else {
                setAuth({
                    user: null,
                    isAuth: false,
                    status: 'done',
                });
            }
        } catch (e) {
            console.error(e);
            console.log(e.response)
        }

    }, []);

    const history = useHistory();

    const header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }

    const login = async (jwtToken) => {
        // zet token in local storage
        localStorage.setItem('token', jwtToken);
        // decode token
        const decoded = jwt_decode(jwtToken);
        setAuth({
            ...auth,
            user: {
                username: decoded.sub,
            },
            isAuth: true,
        })
    }

    const logout = () => {
        setAuth({
            ...auth,
            isAuth: false,
        })
        localStorage.clear();
        console.log('gebruiker uitgelogd', auth)
        history.push('/')
    }

    return (
        <AuthDataContext.Provider
            value={{
                auth,
                login,
                logout,
                header,
            }}>
            { auth.status === 'pending'
                ? <p>Loading...</p>
                : children
            }
        </AuthDataContext.Provider>
    );
}

export default AuthContextProvider;