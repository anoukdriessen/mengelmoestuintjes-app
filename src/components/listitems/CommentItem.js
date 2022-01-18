import {FiEdit3, FiX, FiPlus} from 'react-icons/fi';
import Card from "./Card";
import CommentContext from "../../context/CommentContext";
import {useContext} from "react";

function CommentItem({item} ) {
    const {deleteComment, updateComment} = useContext(CommentContext);
    // console.log(item);

    return <Card className = {'card'}>
        <div key={item.id}>
            <span>@{item.author}</span>
            <p className='txt-display'>
                { item.comment }
            </p>
            <button onClick={() => {
                deleteComment(item.id) }}
                    className='btn close'>
                <FiX/>
            </button>
            <button onClick={() => {
                updateComment(item.id, item) }}
                    className='btn edit'>
                <FiEdit3/>
            </button>
        </div>
    </Card>
}

export default CommentItem;