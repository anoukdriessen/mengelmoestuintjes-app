import axios from "axios";
import {useContext, useState} from "react";
import {FiX} from "react-icons/fi";
import PostDataContext from "../../context/PostDataContext";

function PostCard({item}) {
    const [readMore, toggleReadMore] = useState(false);
    console.log('in postcard', item);
    if (item) {
        return <div className='post-card'>
            <h4>{item.title}</h4>
            <sub>{item.author}</sub>
            <span>{item.modified !== null ? item.modified : item.created}</span>
            <img src={item.imageUrl} alt={'image for post ' + item.title}/>
            {!readMore && <p>{item.summary}</p>}
            <span onClick={() => {
                toggleReadMore((prevState) => !prevState)
            }}>
            {!readMore && 'Lees verder' }
        </span>
            {readMore && <div><p>{item.summary}</p><br/><p>{item.description}</p></div>}
        </div>
    }
    return null;
}

function PostCards({title, type, num}) {
    const { blogPosts } = useContext(PostDataContext);
    let list = [];
    for (let i = 0; i < num; i++) {
        list[i] = blogPosts[i]
    }
    if (type === 'blog') {
        return <div id='post-cards'>
            <h4>{title}</h4>
            {
                list.map((item) => {
                    return <PostCard item={item}/>
                })
            }
        </div>
    }

    return <>empty</>
}

export default PostCards;