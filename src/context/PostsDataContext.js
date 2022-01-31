import {createContext, useContext, useEffect, useState} from "react";
import {AuthDataContext} from "./AuthDataContext";
import axios from "axios";
import {getToday, getTomorrow, refreshPage} from "../helpers/functions";
import {useHistory} from "react-router-dom";

export const PostsDataContext = createContext({});

export const PostsDataContextProvider = ({ children }) => {
    const { auth } = useContext(AuthDataContext)
    const [isLoading, setIsLoading] = useState();

    const [toUpdatePost, setToUpdatePost] = useState({
        title: '',
        summary: '',
        description: '',
        published: 'private',
        category: 'POST',
        photo: null,
    });
    const [toUpdateNote, setToUpdateNote] = useState({
        title: '',
        description: '',
        category: 'NOTE',
    });

    // User posts
    const [allMyPosts, setAllMyPosts] = useState([]);
    const [myNotes, setMyNotes] = useState([]);
    const [myPublicPosts, setMyPublicPosts] = useState([]);
    const [myPrivatePosts, setMyPrivatePosts] = useState([]);

    // Blog posts
    const [blogPosts, setBlogPosts] = useState([]);
    const [allPublicPosts, setAllPublicPosts] = useState([]);

    const history = useHistory();

    useEffect(() => {
        fetchAllBlogPosts()
        fetchAllPublishedPosts()
        fetchMyNotes()
        fetchMyPrivatePosts()
        fetchMyPublicPosts()
    }, [])


    // CREATE
    const addNew = async (thisUser, postData, selected) => {
        if (postData.category === 'POST') {
            postData.published = postData.published !== 'private';
            console.log('new post', postData);
        } else {
            postData.summary = '';
            postData.published = false;
            console.log('new task', postData)
        }

        try {
            const result = await axios.post(`https://localhost:8443/api/gebruikers/${thisUser.username}/berichten`,
                postData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
            if (selected) {
                const formData = new FormData();
                let file = selected;
                formData.append('photo', file, 'image');
                try {
                    await axios.post(`https://localhost:8443/api/berichten/${result.data}/upload`,
                        formData,
                        { headers: {
                                'Content-Type': `multipart/form-data; boundary=photo`,
                                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                            }, params: {
                                photo: file
                            }
                        });
                } catch (e) {
                    console.error(e);
                    console.log(e.response);
                }
            }
            if (postData.category === 'POST') {
                history.push(`/berichten/${result.data}`)
            } else {
                refreshPage();
            }
        } catch (e) {
            console.error(e)
            console.log(e.response)
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
        if (auth.user) {
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
    }
    const fetchMyPublicPosts = async () => {
        if (auth.user) {
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
    }
    const fetchMyPrivatePosts = async () => {
        if (auth.isAuth) {
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
    }


    // UPDATE


    // DELETE


    const contextData = {
        blogPosts,
        allPublicPosts,
        myNotes,
        myPrivatePosts,
        myPublicPosts,
        addNew,
        toUpdateNote,
        setToUpdateNote
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