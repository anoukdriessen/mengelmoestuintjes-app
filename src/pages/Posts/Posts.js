import PageHeader from "../../components/pageitems/PageHeader";
import React, {useEffect, useState} from "react";
import PageContent from "../../components/pageitems/PageContent";
import {UserDataContextProvider} from "../../context/UserDataContext";
import PostCards from "../../components/listitems/Posts/PostCards";
import axios from "axios";
import {PostsDataContextProvider} from "../../context/PostsDataContext";

function Posts() {
    const [filteredPosts, setFilteredPosts] = useState([]);

    return <>
        <PageHeader title='Berichten'/>

        <PageContent>
            <UserDataContextProvider>
                <PostsDataContextProvider>
                    <PostCards
                        title='Recente blogberichten'
                        type='blog'
                        num={20}
                    />
                </PostsDataContextProvider>
            </UserDataContextProvider>
        </PageContent>
        </>
}

export default Posts;