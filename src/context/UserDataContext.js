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
    const [toDoTasks, setToDoTasks] = useState([]);
    const [notes, setNotes] = useState([]);
    const [publicPosts, setPublicPosts] = useState([]);
    const [privatePosts, setPrivatePosts] = useState([]);

    const history = useHistory();

    useEffect(() => {
        fetchProvinces()
        fetchToDoTasks()
        fetchNotes()
        fetchPrivatePosts()
        fetchPublicPosts()
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

    const fetchToDoTasks = async () => {
        setIsLoading(true);
        try {
            if (auth.isAuth) {
                const response = await axios.get(`https://localhost:8443/api/gebruikers/${auth.user.username}/taken/TODO`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                // console.log('to do', response);
                setToDoTasks(response.data);
            }
            setIsLoading(false);
        } catch (e) {
            console.error(e)
            console.log(e.response)
        }
    }

    const fetchNotes = async () => {
        setIsLoading(true);
        try {
            if (auth.isAuth) {
                const response = await axios.get(`https://localhost:8443/api/gebruikers/${auth.user.username}/berichten/note`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                // console.log('to do', response);
                setNotes(response.data);
            }
            setIsLoading(false);
        } catch (e) {
            console.error(e)
            console.log(e.response)
        }
    }
    const fetchPublicPosts = async () => {
        setIsLoading(true)
        try {
            if (auth.isAuth) {
                const response = await axios.get(`https://localhost:8443/api/gebruikers/${auth.user.username}/berichten/post`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        },
                        params: {
                            published: 'TRUE'
                        }
                    });
                // console.log('public', response.data);
                setPublicPosts(response.data);
            }
            setIsLoading(false);
        } catch (e) {
            console.error(e)
            console.log(e.response)
        }
    }
    const fetchPrivatePosts = async () => {
        setIsLoading(true);
        try {
            if (auth.isAuth) {
                const response = await axios.get(`https://localhost:8443/api/gebruikers/${auth.user.username}/berichten/post`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }, params: {
                            published: 'FALSE'
                        }
                    });
                // console.log('private', response.data);
                setPrivatePosts(response.data);
            }
            setIsLoading(false);
        } catch (e) {
            console.error(e)
            console.log(e.response)
        }
    }

    const contextData = {
        allProfiles,
        provinces,
        toDoTasks,
        notes,
        privatePosts,
        publicPosts,
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