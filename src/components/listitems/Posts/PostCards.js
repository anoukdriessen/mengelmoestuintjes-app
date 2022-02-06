import '../style/postcard.css';
import {getUniqueId, sortArrayById} from "../../../helpers/functions";
import PostCard, {PostPreview} from "./PostCard";
import {useContext, useState} from "react";
import PostsDataContext from "../../../context/PostsDataContext";
import {AuthDataContext} from "../../../context/AuthDataContext";
import ItemNotFound from "../ItemNotFound";

function PostCards({title, num}) {
    const { auth } = useContext(AuthDataContext);
    const { blogPosts, allPublicPosts } = useContext(PostsDataContext);
    let posts = [];
    let list = [];

    if (auth.isAuth) {
        // toon berichten en blogberichten van alle gebruikers op blog
        posts = [...blogPosts, ...allPublicPosts]
    } else {
        console.log('gebruiker is niet ingelogd');
        // toon enkel blogberichten van type blog
        posts = [...blogPosts]
    }


    sortArrayById(posts);
    // posts.reverse();
    if (posts.length < 1) {
        return <ItemNotFound title={'Berichten'}/>
    }

    for (let i = 0; i < num; i++) {
        list[i] = posts[i]
    }
    const postImages = ['emptypost2', 'emptypost3', 'emptypost4', 'emptypost5', 'emptypost6']
    return <>
        <h4>{title}</h4>
        <div id='post-cards'>
            {
                list.map((item) => {
                    if (item){
                        return <PostPreview key={item.id} item={item} imageUrl={postImages[4]}/>
                    } else {
                        return null
                    }
                })
            }
        </div>
    </>

}

export default PostCards;