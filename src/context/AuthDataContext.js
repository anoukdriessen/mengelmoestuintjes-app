import {createContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import jwt_decode from 'jwt-decode'
import {convertToMyDateFormat, refreshPage} from "../helpers/functions";
import {UserDataContextProvider} from "./UserDataContext";

export const AuthDataContext = createContext({});

function AuthContextProvider({ children }) {
    const [auth, setAuth] = useState({
        user: null,
        isAuth: false,
        status: 'pending',
    });
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const isTokenNotExpired = (tokenDate) => {
        // convert token exp to date, check if larger than current date
        // returns true if token is not expired
        return new Date(tokenDate * 1000) > new Date()
    }

    const fetchUserData = async (username) => {
        const userResult = await axios.get(`https://localhost:8443/api/gebruikers/${username}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
        // console.log('dit resultaat', userResult.data.userProfile.authorities);
        // console.log('naam', userResult.data.name);
        setAuth({
            user: {
                username,
                displayName: userResult.data.name,
                email: userResult.data.email,
                image: userResult.data.profileImg,
                authorities: userResult.data.userProfile.authorities,
                details: {
                    birthday: userResult.data.birthday,
                    lastActivity: userResult.data.lastActivity,
                    memberSince: userResult.data.memberSince,
                    province: userResult.data.province,
                    level: {
                        currentLevel: userResult.data.level,
                        currentXP: userResult.data.xp,
                        limit: userResult.data.levelUpLimit
                    },
                },
            },
            isAuth: true,
            status: 'done',
        });
    }

    let isNotValid = false;
    useEffect(() => {
        try {
            if (localStorage.length > 0) {
                // something is stored in local storage
                if (localStorage.getItem('token') !== null) {
                    const decode = jwt_decode(localStorage.getItem('token'));
                    if (isTokenNotExpired(decode.exp)) {
                        // not expired set auth
                        let username = decode.sub;
                        // console.log('request', username, localStorage.getItem('token'))
                        try {
                            fetchUserData(username);
                        } catch (e) {
                            console.error(e);
                            console.log(e.response);
                        }
                    } else {
                        // console.log("token expired")
                        // expired
                        localStorage.clear();
                        isNotValid = true;
                    }
                } else {
                    // console.log("token niet gevonden")
                    isNotValid = true;
                }
            } else {
                // console.log("niets in local storage")
                isNotValid = true
            }

            if (isNotValid) {
                setAuth({
                    user: null,
                    isAuth: false,
                    status: 'done',
                });
            }
            // console.log('in useEffect', auth);
        } catch (e) {
            console.error(e);
            console.log(e.response)
        }
    }, []);

    const history = useHistory();

    const authenticate = async (username, password, setMessage) => {
        try {
            const result = await axios.post(`https://localhost:8443/authenticate`, {
                "username": `${username}`,
                "password": `${password}`
            })
            // console.log('jwt token', result.data.jwt);
            login(result.data.jwt);
        } catch (e) {
            console.error(e)
            console.log(e.response)
            setMessage('hmmm... er lijkt iets niet correct, controleer je gebruikersnaam en wachtwoord en probeer opnieuw')
        }
    }

    const login = async (jwtToken) => {
        // zet token in local storage
        localStorage.setItem('token', jwtToken);
        // decode token
        const decoded = jwt_decode(jwtToken);
        // get user info
        let username = decoded.sub;
        // console.log('jwt token', jwtToken);
        fetchUserData(username);
    }

    const logout = () => {
        setAuth({
            ...auth,
            isAuth: false,
        })
        localStorage.clear();
        history.push('/');
        refreshPage()
    }

    const hasUserRole = (toFind) => {
        if(auth.isAuth) { return auth.user.authorities.includes(toFind); }
        return false;
    }

    const contextData = {
        auth,
        authenticate,
        fetchUserData,
        login,
        logout,
        hasUserRole,
        error,
        setError,
        success,
        setSuccess,
    }

    return (
        <AuthDataContext.Provider
            value={contextData}>
            { auth.status === 'pending'
                ? <p>Loading...</p>
                : children
            }
        </AuthDataContext.Provider>
    );
}

export default AuthContextProvider;