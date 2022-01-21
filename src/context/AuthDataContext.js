import {createContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import jwt_decode from 'jwt-decode'
import {convertToMyDateFormat} from "../helpers/functions";

export const AuthDataContext = createContext({});

function AuthContextProvider({ children }) {
    const [auth, setAuth] = useState({
        user: null,
        isAuth: false,
        status: 'pending',
    });

    const isTokenNotExpired = (tokenDate) => {
        // convert token exp to date, check if larger than current date
        // returns true if token is not expired
        return new Date(tokenDate * 1000) > new Date()
    }

    const fetchUserData = async (username) => {
        const userResult = await axios.get(`https://localhost:8443/api/gebruikers/${username}`,
            {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
        // console.log('resultaat', userResult.data);
        const userData = userResult.data
        setAuth({
            user: {
                username: username,
                displayName: userData.name,
                email: userData.email,
                image: userData.profileImg,
                authorities: userData.authorities,
                details: {
                    birthday: userData.birthday,
                    lastActivity: userData.lastActivity,
                    memberSince: userData.memberSince,
                    level: {
                        currentLevel: userData.level,
                        currentXP: userData.xp,
                        limit: userData.levelUpLimit,
                    },
                    province: userData.province,
                }
            },
            isAuth: true,
            status: 'done',
        })
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
                        fetchUserData(username);
                    } else {
                        console.log("token expired")
                        // expired
                        localStorage.clear();
                        isNotValid = true;
                    }
                } else {
                    console.log("token niet gevonden")
                    isNotValid = true;
                }
            } else {
                console.log("niets in local storage")
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

    const login = async (jwtToken) => {
        // zet token in local storage
        localStorage.setItem('token', jwtToken);
        // decode token
        const decoded = jwt_decode(jwtToken);
        // get user info
        let username = decoded.sub;
        fetchUserData(username);
        history.push(`/profiel/${username}`)
    }

    const logout = () => {
        setAuth({
            ...auth,
            isAuth: false,
        })
        localStorage.clear();
        // console.log('gebruiker uitgelogd', auth)
        history.push('/')
    }

    const contextData = {
        auth,
        login,
        logout,
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