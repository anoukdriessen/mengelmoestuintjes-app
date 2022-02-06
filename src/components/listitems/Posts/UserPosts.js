import {useContext, useState} from "react";
import PostsDataContext from "../../../context/PostsDataContext";
import {PostPreview} from "./PostCard";
import NoteCard from "./NoteCard";
import {AuthDataContext} from "../../../context/AuthDataContext";
import {sortArrayById} from "../../../helpers/functions";
import ItemNotFound from "../ItemNotFound";
import ShowAndHide from "../ShowAndHide";

function UserPosts({note, showNotes, publ, showPublic, priv, showPrivate}) {
    const { personalNotes, myPrivatePosts, myPublicPosts } = useContext(PostsDataContext)

    let all = [];
    let notes = [];
    let publicPosts = [];
    let privatePosts = [];

    const getMyNotes = async () =>{
        // console.log(myNotes)
        let count = 0;
        personalNotes.map(note => {
            notes[count] = note;
            count++;
        })

    }
    const getMyPublicPosts = async () => {
        // console.log(myPublicPosts)
        let count = 0;
        myPublicPosts.map(post => {
            publicPosts[count] = post;
            count++;
        })
    }
    const getMyPrivatePosts = async () => {
        // console.log(myPrivatePosts)
        let count = 0;
        myPrivatePosts.map(post => {
            privatePosts[count] = post;
            count++;
        })
    }

    // check if show notes
    if (note) {
        getMyNotes()
        all = [...all, ...notes]
    }

    // check if show public posts
    if (publ) {
        getMyPublicPosts()
        all = [...all, ...publicPosts]
    }

    // check if show private posts
    if (priv) {
        getMyPrivatePosts()
        all = [...all, ...privatePosts]
    }

    sortArrayById(all);
    all = all.reverse();
    return <>
        <ShowAndHide
            setOne={showNotes}
            setTwo={showPublic}
            setThree={showPrivate}
            one={note}
            two={publ}
            three={priv}
            titleOne={'Notities'}
            titleTwo={'Gepubliceerd'}
            titleThree={'Concepten'}
        />
        <div id='post-cards'>
            {
                all.length > 0
                    ? <> {
                        all.map((item) => {
                            if (item.category === 'NOTE') {
                                return <NoteCard key={item.id} item={item} />
                            } else {
                                return <PostPreview key={item.id} item={item} imageUrl={'emptypost4'} />
                            }
                        })} </>
                    : <ItemNotFound title={'berichten'}/>
            }
        </div>
    </>
}

export default UserPosts;