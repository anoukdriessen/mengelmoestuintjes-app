import PageHeader from "../components/pageitems/PageHeader";
import React, {useEffect, useState} from "react";
import PageContent from "../components/pageitems/PageContent";
import {UserDataContextProvider} from "../context/UserDataContext";
import PostCards from "../components/containers/PostCards";
import axios from "axios";

function Posts() {
    const [allPosts, setAllPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        fetchAllPosts()
    }, [])

    const fetchAllPosts = async () => {
        try {
            const response = await axios.get(`https://localhost:8443/api/berichten`, {
                params: {published: true, category: "BLOG"}
            })
            setAllPosts(response.data.reverse());
            console.log('all posts', setAllPosts)
        } catch (e) {
            console.error(e);
            console.log(e.response);
        }
    }

    return <>
        <PageHeader title='Berichten'/>

        <PageContent>
            <UserDataContextProvider>
                <PostCards
                    title='Recente blogberichten'
                    type='blog'
                    posts={allPosts}
                    num={20}
                />
            </UserDataContextProvider>
        </PageContent>
        </>
}

export default Posts;