import './style/postcard.css';
import {getUniqueId} from "../../helpers/functions";
import PostCard from "./items/PostCard";

function PostCards({title, type, posts, num}) {

    let list = [];
    let listNotEmpty = posts.length !== 0;

    if (type === 'blog') {
        if (listNotEmpty) {
            for (let i = 0; i < num; i++) {
                list[i] = posts[i]
            }
        }
        return <><h4>{title}</h4>
            <div id='post-cards'>
                {
                listNotEmpty && (
                    list.map((item) => {
                        return <PostCard key={getUniqueId()} item={item} type='preview'/>
                    })
                )
            }
            {
                !listNotEmpty && <p><sub>Geen berichten gevonden</sub></p>
            }
            </div>
        </>
    } else if (type === 'profile'){
        // console.log('in profile',posts)
        return <div id='post-cards'>
            {
                posts.map((post) => {
                    // console.log(post);
                    if (post.category === "NOTE") {
                        return <PostCard key={getUniqueId()} item={post} type='note'/>
                    } else {
                        return <PostCard key={getUniqueId()} item={post} type='preview'/>
                    }
                })
            }
            {
                !listNotEmpty && <p><sub>Geen berichten gevonden</sub></p>
            }
        </div>
    }

    return <>empty</>
}

export default PostCards;