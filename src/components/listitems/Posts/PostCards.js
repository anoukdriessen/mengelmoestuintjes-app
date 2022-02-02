import '../style/postcard.css';
import {getUniqueId, sortArrayById} from "../../../helpers/functions";
import PostCard from "./PostCard";
import {useContext} from "react";
import PostsDataContext from "../../../context/PostsDataContext";
import {AuthDataContext} from "../../../context/AuthDataContext";
import {FiFrown} from "react-icons/all";
import NotFound from "../../../pages/NotFound";
import ItemNotFound from "../ItemNotFound";

function PostCards({title, type, num}) {
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
    if (posts.length < 1) {
        return <ItemNotFound title={'Berichten'}/>
    }

    for (let i = 0; i < num; i++) {
        list[i] = posts[i]
    }
    return <>
        <h4>{title}</h4>
        <div id='post-cards'>
            {
                list.map((item) => {
                    let myKey = getUniqueId();
                    if (item) {
                        myKey = item.id
                    }
                    return <PostCard key={myKey} item={item} type='preview'/>
                })
            }
        </div>
    </>

}

export default PostCards;