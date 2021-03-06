import {createContext, useContext, useEffect, useState} from "react";
import {AuthDataContext} from "./AuthDataContext";
import axios from "axios";
import { refreshPage} from "../helpers/functions";
import {useHistory} from "react-router-dom";

export const PostsDataContext = createContext({});

export const PostsDataContextProvider = ({ children }) => {
    const { auth } = useContext(AuthDataContext)
    const [isLoading, setIsLoading] = useState();

    const [toFind, setToFind] = useState({});

    // const [toUpdatePost, setToUpdatePost] = useState({
    //     title: '',
    //     summary: '',
    //     description: '',
    //     published: 'private',
    //     category: 'POST',
    //     photo: null,
    // });
    // const [toUpdateNote, setToUpdateNote] = useState({
    //     title: '',
    //     description: '',
    //     category: 'NOTE',
    // });

    // User posts
    const [allMyPosts, setAllMyPosts] = useState([]);
    const [personalNotes, setPersonalNotes] = useState([]);
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

    const addPersonalNote = async (newNote) => {
        // console.log(newNote);
        try {
            await axios.post(`https://localhost:8443/api/gebruikers/${auth.user.username}/berichten`,
                {
                    'title': newNote.title,
                    'description': newNote.description,
                    'published': false,
                    'category': "NOTE",
                }, {
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
            setPersonalNotes([...personalNotes, newNote]);

        } catch (e) {
            console.error(e)
            console.log(e.response);
        }}

    const createNewPost = async (formData,  selected, setMessage) => {
        formData.published = formData.published !== 'private';

        const newPost = {
            title: formData.title,
            summary: formData.summary,
            description: formData.description,
            category: formData.category,
            published: formData.published,
        }
        try {
            const result = await axios.post(`https://localhost:8443/api/gebruikers/${auth.user.username}/berichten`,
                newPost,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
            console.log(result.data)
            setToFind(newPost);

            if (selected) {
                const formData = new FormData();
                let file = selected;
                formData.append('photo', file, 'image');
                try {
                    const image = await axios.post(`https://localhost:8443/api/berichten/${result.data}/upload`,
                        formData,
                        { headers: {
                                'Content-Type': `multipart/form-data; boundary=photo`,
                                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                            }, params: {
                                photo: file
                            }
                        });
                    console.log(image.data);
                    setToFind({
                        ...toFind,
                        image: selected,
                    })
                } catch (e) {
                    console.error(e);
                    console.log(e.response);
                    setMessage('Er gaat iets mis, controleer de gegevens en probeer opnieuw')
                }
            }
            history.push(`/berichten/${result.data}`)
        } catch (e) {
            console.error(e);
            console.log(e);
        }}

    // READ
    const fetchPostById = async (postId) => {
        try {
            // find post by id
            const find = await axios.get(`https://localhost:8443/api/berichten/${postId}`);
            // console.log(find.data)
            setToFind(find.data);
            // return find.data;
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
            // console.log('fetch all posts', response.data);
            setBlogPosts(response.data.reverse());
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
            const data = response.data.reverse()
            setAllPublicPosts(data);
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
            setPersonalNotes(response.data);
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
    const updatePost = async (id, modified, selected) => {
        try {
            const result = await axios.put(`https://localhost:8443/api/berichten/${toFind.id}`,
                {
                    title: modified.title,
                    summary: modified.summary,
                    description: modified.description,
                    category: modified.category
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }, params: {
                        published: false
                    }
                });
            console.log(result, modified, selected);
            setToFind({
                ...toFind,
                title: modified.title,
                summary: modified.summary,
                description: modified.description,
                category: modified.category
            })
            if (selected) {
                console.log(selected);
                const formData = new FormData();
                let file = selected;
                formData.append('photo', file, 'image');
                try {
                    await axios.post(`https://localhost:8443/api/berichten/${id}/upload`,
                        formData,
                        { headers: {
                                'Content-Type': `multipart/form-data; boundary=photo`,
                                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                            }, params: {
                                photo: file
                            }
                        });
                    refreshPage();
                } catch (e) {
                    console.error(e);
                    console.log(e.response);
                }
            }
            setToFind({
                ...toFind,
                image: selected,
            })
        } catch (e) {
            console.error(e);
            console.log(e.response);
        }
    }

    // DELETE


    const contextData = {
        addPersonalNote,
        createNewPost,
        blogPosts,
        allPublicPosts,
        fetchPostById,
        updatePost,
        toFind,
        personalNotes,
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