import PageHeader from "../../components/pageitems/PageHeader";
import React, {useContext, useEffect, useState} from "react";
import {UserDataContextProvider} from "../../context/UserDataContext";
import {useHistory, useParams} from "react-router-dom";
import PageContent from "../../components/pageitems/PageContent";
import axios from "axios";
import PostCard from "../../components/listitems/Posts/PostCard";
import {AuthDataContext} from "../../context/AuthDataContext";

export function Post() {
    const {auth} = useContext(AuthDataContext);
    const [post, setPost] = useState();
    const params = useParams();
    const history = useHistory();

    const fetchPostById = async (id) => {
        // console.log('get post by id', id)
        try {
            const response = await axios.get(`https://localhost:8443/api/berichten/${id}`);
            // console.log('post by id', response.data);
            if(!response.data.published){
                // message is not published
                if (auth.isAuth) {
                    if (auth.user.username === response.data.author) {
                        setPost(response.data);
                    } else {
                        history.push('/404');
                    }
                } else {
                    history.push('/404');
                }
            } else if (response.data.category === 'NOTE') {
                // category is note
                // notes are not public
                history.push('404')
            } else {
                setPost(response.data);
            }
        } catch (e) {
            console.error(e)
            console.log(e.response)
        }
    }

    useEffect(() => {
        fetchPostById(params.id)
    }, [])

    return <>
        {
            post && <PostCard
            item={post}
            type='blog'/>
        }

    </>
}

function SinglePost() {

    return <>
        <PageHeader title='Berichten'/>

        <PageContent>
            <UserDataContextProvider>
                <Post/>
            </UserDataContextProvider>
        </PageContent>
    </>
}

export default SinglePost;