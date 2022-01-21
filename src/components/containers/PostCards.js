import './postcard.css';
import {useContext, useState} from "react";
import {getUniqueId, parseMyDate} from "../../helpers/functions";
import {FiPenTool} from "react-icons/all";

function PostCard({item}) {
    const [readMore, toggleReadMore] = useState(false);
    const [active, toggleActive] = useState(false);

    if (item) {
        return <div className='post-card'
                    onMouseEnter={e => {toggleActive(true)}}
                    onMouseLeave={e => {toggleActive(false)}}
        >
            <img src={item.imageUrl} alt={'image for post ' + item.title}/>
            <h4>{item.title}</h4>
            {
                active && <p>
                    { item.summary }
                    <hr/>
                    <span onClick={() => {
                        toggleReadMore((prevState) => !prevState)
                    }}>Lees verder</span>
                </p>
            }
            <span className='info'>
                <span><FiPenTool/>{item.author}</span>
                <span>{item.modified !== null ? parseMyDate(item.modified) : parseMyDate(item.created)}</span>
            </span>

        </div>
    }
    return null;
}

function PostCards({title, type, blogPosts, num }) {
    let list = [];
    let listNotEmpty = blogPosts.length !== 0;


    if (type === 'blog') {
        if (listNotEmpty) {
            for (let i = 0; i < num; i++) {
                list[i] = blogPosts[i]
            }
        }
        return <div id='post-cards'>
                <h3>{title}</h3>
                {
                listNotEmpty && (
                    list.map((item) => {
                        return <PostCard key={getUniqueId()} item={item}/>
                    })
                )
            }
            {
                !listNotEmpty && <p><sub>Geen berichten gevonden</sub></p>
            }
        </div>
    }

    return <>empty</>
}

export default PostCards;