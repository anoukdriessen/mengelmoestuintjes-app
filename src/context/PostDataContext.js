import {createContext, useContext, useEffect, useState} from "react";
import {AuthDataContext} from "./AuthDataContext";
import axios from "axios";

const PostDataContext = createContext({});

export const PostDataContextProvider = ({children}) => {
    const {header} = useContext(AuthDataContext)

    const [isLoading, setIsLoading] = useState(true)
    const [blogPosts, setBlogPosts] = useState([])
    const [userPosts, setUserPosts] = useState(null)
    const [userNotes, setUserNotes] = useState(null)
    const [toUpdate, setToUpdate] = useState({
        item: null,
        edit: false,
    });
    const [toFind, setToFind] = useState({
        item: null,
        searchedFor: false,
    });

    useEffect(() => {
        fetchRecentBlogPosts()
    }, [])

    const fetchRecentBlogPosts = async () => {
        const response = await axios.get("https://localhost:8443/api/berichten?published=TRUE&category=BLOG")
        setBlogPosts(response.data);
        setIsLoading(false);
    }

    const contextData = {
        blogPosts,

    }

    return <PostDataContext.Provider value={contextData}>
        {children}
    </PostDataContext.Provider>
}

export default PostDataContext;