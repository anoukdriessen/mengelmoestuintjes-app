import {useContext, useState} from "react";
import PostsDataContext from "../../../context/PostsDataContext";
import PostCard from "./PostCard";
import {AuthDataContext} from "../../../context/AuthDataContext";
import {getUniqueId, sortArrayById} from "../../../helpers/functions";
import ItemNotFound from "../ItemNotFound";
import {FiEdit3, FiX} from "react-icons/fi";
import {FiSave} from "react-icons/all";
import ShowAndHide from "../ShowAndHide";

function UserPosts({note, showNotes, publ, showPublic, priv, showPrivate}) {
    const { auth } = useContext(AuthDataContext)
    const { myNotes, myPrivatePosts, myPublicPosts } = useContext(PostsDataContext)

    let all = [];
    let notes = [];
    let publicPosts = [];
    let privatePosts = [];

    const getMyNotes = async () =>{
        // console.log(myNotes)
        let count = 0;
        myNotes.map(note => {
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

    console.log(all);
    sortArrayById(all);
    console.log(all);
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
                                let currentUserIsAuthor = true;
                                let changeFields = false;

                                const handleChange = () => {
                                    console.log('change')
                                }
                                const handleSave = () => {
                                    console.log('save')
                                }
                                const handleDelete = () => {
                                    console.log('delete')
                                }
                                const handleChangeValue = () => {
                                    console.log('changing')
                                }
                                const noteData = {
                                    title: '',
                                    description: '',
                                }

                                return <div className='note-card'>
                                    {
                                        currentUserIsAuthor && <div className='is-author'>
                        <span className='link'>
                            {!changeFields
                                ? <FiEdit3 onClick={handleChange}/>
                                : <FiSave onClick={handleSave}/>}
                        </span>
                                        </div>
                                    }
                                    {
                                        !changeFields
                                            ? <h4>{item.title}</h4>
                                            : <input
                                                id='title'
                                                type='text'
                                                placeholder='Titel van bericht'
                                                value={noteData.title}
                                                onChange={handleChangeValue}
                                                maxLength={50}
                                                required={true}
                                            />
                                    }
                                    <p className='body'>
                                        {
                                            !changeFields
                                                ? item.description
                                                : <textarea
                                                    id='description'
                                                    placeholder='Begin hier met het schrijven van je bericht...'
                                                    value={noteData.description}
                                                    onChange={handleChangeValue}
                                                    maxLength={255}
                                                    required={true}
                                                />
                                        }

                                    </p>
                                    {
                                        currentUserIsAuthor &&
                                        changeFields && <div className='is-author'>
                                            <span className='link' onClick={handleDelete}><FiX/></span>
                                        </div>
                                    }
                                </div>
                            } else {
                                return <PostCard key={getUniqueId()} item={item} type={'preview'}/>
                            }
                        })} </>
                    : <ItemNotFound title={'berichten'}/>
            }
        </div>
    </>
}

export default UserPosts;