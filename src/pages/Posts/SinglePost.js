import PageHeader from "../../components/pageitems/PageHeader";
import React, {useContext, useEffect, useState} from "react";
import {UserDataContextProvider} from "../../context/UserDataContext";
import {Redirect, useHistory, useParams} from "react-router-dom";
import PageContent from "../../components/pageitems/PageContent";
import axios from "axios";
import PostCard from "../../components/listitems/Posts/PostCard";
import {AuthDataContext} from "../../context/AuthDataContext";
import PostsDataContext, {PostsDataContextProvider} from "../../context/PostsDataContext";
import NotFound from "../NotFound";

export function Post() {
    const {auth} = useContext(AuthDataContext);
    const { toFind, fetchPostById } = useContext(PostsDataContext);

    const params = useParams();
    const history = useHistory();

    const getThisPost = async () =>{
        fetchPostById(params.id)
    }

    useEffect(() => {
        getThisPost()
    }, [])

    return <>
        {
            toFind
            ? <PostCard toFind={toFind}/>
            : <NotFound/>
        }

    </>
}

function SinglePost() {

    return <>
        <PageHeader title='Berichten'/>

        <PageContent>
            <UserDataContextProvider>
                <PostsDataContextProvider>
                    <Post/>
                </PostsDataContextProvider>
            </UserDataContextProvider>
        </PageContent>
    </>
}

export default SinglePost;