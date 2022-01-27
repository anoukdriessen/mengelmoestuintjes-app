import {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import {FiPenTool} from "react-icons/all";
import {parseMyDate} from "../../../helpers/functions";
import {AuthDataContext} from "../../../context/AuthDataContext";
import {FiEdit3, FiEye, FiEyeOff, FiX} from "react-icons/fi";

function PostCard({item, type}) {
    const {auth} = useContext(AuthDataContext);
    const [active, toggleActive] = useState(false);
    const history = useHistory();

    if (item) {
        let currentUserIsAuthor;
        if (auth.isAuth) {
            currentUserIsAuthor = (auth.user.username === item.author);
        }

        if (type === 'preview') {
            return <div className='post-card'
                        onMouseEnter={e => {toggleActive(true)}}
                        onMouseLeave={e => {toggleActive(false)}}
            >
                <h4>{item.title}</h4>
                {
                    item.image !== null
                        ? <img id='post-img' src={`data:image/jpeg;base64,${item.image}`} alt={item.title}/>
                        : <img id='post-img'
                               src='/images/emptypost.jpg'
                               alt='empty post image'/>
                }
                {/*<img src={item.imageUrl} alt={'image for post ' + item.title}/>*/}
                <span className='info'>
                    {!item.published
                        ? <span><strong className='retro'>CONCEPT</strong></span>
                        : <span><FiPenTool className='mirrored'/>@{item.author}</span>
                    }
            </span>
                <p>
                    { item.summary }
                    <br/>
                    <span onClick={() => {
                        history.push(`/berichten/${item.id}`);
                    }}>Lees verder</span>
                </p>
            </div>
        } else if (type === 'blog'){
            const handleChange = () => {
                console.log('bewerk')
            }
            const togglePublished = () => {
                console.log('verander !published')
            }
            return <div className='single-post-card'>
                {
                    currentUserIsAuthor && <div className='is-author'>
                        <span className='link' onClick={handleChange}><FiEdit3/></span>
                        <span className='link' onClick={togglePublished}>{ item.published ? <FiEyeOff/> : <FiEye/> }</span>
                    </div>
                }
                <h4>{item.title}</h4>
                {
                    item.image !== null
                        ? <img id='post-img' src={`data:image/jpeg;base64,${item.image}`} alt={item.title}/>
                        : <img id='post-img'
                               src='/images/emptypost.jpg'
                               alt='empty post image'/>
                }
                <span className='info'>
                    <span><FiPenTool size={15}/>{item.author}</span>
                    <span>{item.modified !== null ? parseMyDate(item.modified) : parseMyDate(item.created)}</span>
                </span>
                <p className='summary'>
                     { item.summary }
                </p>
                <hr className=''/>
                <p className='body'>
                     { item.description }
                </p>
            </div>;
        } else if (type === 'note') {
            const handleChange = () => {
                console.log('bewerk')
            }
            const handleDelete = () => {
                console.log('verwijder')
            }
            return <div className='note-card'>
                {
                    currentUserIsAuthor && <div className='is-author'>
                        <span className='link' onClick={handleChange}><FiEdit3/></span>
                        <span className='link' onClick={handleDelete}><FiX/></span>
                    </div>
                }
                <h4>{item.title}</h4>
                <p className='body'>
                    { item.description }
                </p>
            </div>;
        }

    }
    return null;
}

export default PostCard;