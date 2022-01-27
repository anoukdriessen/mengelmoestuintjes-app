import {createContext, useContext, useEffect, useState} from "react";
import {AuthDataContext} from "./AuthDataContext";
import axios from "axios";
import {getToday, getTomorrow} from "../helpers/functions";

export const PostsDataContext = createContext({});

export const PostsDataContextProvider = ({ children }) => {
    const { auth } = useContext(AuthDataContext)
    const [isLoading, setIsLoading] = useState();

    // User posts
    const [allMyPosts, setAllMyPosts] = useState([]);
    const [myNotes, setMyNotes] = useState([]);
    const [myPublicPosts, setMyPublicPosts] = useState([]);
    const [myPrivatePosts, setMyPrivatePosts] = useState([]);

    // Blog posts
    const [blogPosts, setBlogPosts] = useState([]);
    const [allPublicPosts, setAllPublicPosts] = useState([]);


    useEffect(() => {
        fetchAllBlogPosts()
        fetchAllPublishedPosts()
        fetchMyNotes()
        fetchMyPrivatePosts()
        fetchMyPublicPosts()
    }, [])


    // CREATE
    const addNew = async (thisUser) => {
        try {
            await axios.post(`https://localhost:8443/api/taken?username=${thisUser.username}`,
                null,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
            // console.log(result)
        } catch (e) {
            console.error(e);
            console.log(e.response);
        }
    }

    // READ
    const fetchPostById = async (postId) => {
        try {
            // find post by id
            const find = await axios.get(`https://localhost:8443/api/berichten/${postId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
            return find.data;
        } catch (e) {
            console.error(e)
            console.log(e.response)
        }
    }
    const fetchAllBlogPosts = async () => {
        try {
            const response = await axios.get(`https://localhost:8443/api/berichten`, {
                params: {published: true, category: "BLOG"}
            })
            setBlogPosts(response.data.reverse());
            // console.log('fetch all posts', setBlogPosts)
        } catch (e) {
            console.error(e);
            console.log(e.response);
        }
    }
    const fetchAllPublishedPosts = async () => {
        try {
            const response = await axios.get(`https://localhost:8443/api/berichten`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                params: {published: true, category: "POST"}
            })
            setAllPublicPosts(response.data.reverse());
        } catch (e) {
            console.log(e);
            console.log(e.response);
        }
    }

    const fetchMyNotes = async () => {
        let thisUser = auth.user.username;
        const response = await axios.get(`https://localhost:8443/api/gebruikers/${thisUser}/berichten/note`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
        // console.log('to do', response.data);
        setMyNotes(response.data);
    }
    const fetchMyPublicPosts = async () => {
        let thisUser = auth.user.username;
        const response = await axios.get(`https://localhost:8443/api/gebruikers/${thisUser}/berichten/post`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                params: {
                    published: true
                }
            });
        // console.log('public', response.data);
        setMyPublicPosts(response.data);
        // return response.data;
    }
    const fetchMyPrivatePosts = async () => {
        let thisUser = auth.user.username;
        const response = await axios.get(`https://localhost:8443/api/gebruikers/${thisUser}/berichten/post`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }, params: {
                    published: false
                }
            });
        // console.log('private', response.data);
        setMyPrivatePosts(response.data);
        // return response.data;
    }


    // UPDATE
    const update = async () => {
        try {
            const result = await axios.put(`https://localhost:8443/api/taken/`,
                null,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
            console.log(result);
        } catch (e) {
            console.error(e);
            console.log(e.response);
        }
    }

    // DELETE
    const deletePost = async () => {
        try {
            await axios.delete(`https://localhost:8443/api/taken/`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
            // console.log(result)
        } catch (e) {
            console.error(e);
            console.log(e.response);
        }
    }

    const contextData = {
        blogPosts,
        allPublicPosts,
        myNotes,
        myPrivatePosts,
        myPublicPosts,
    }

    return <PostsDataContext.Provider
        value={contextData}
    >
        { isLoading
            ? <p>Loading...</p>
            : children
        }
    </PostsDataContext.Provider>
}

export default PostsDataContext;