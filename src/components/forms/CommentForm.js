import Card from "../listitems/Card";
import { FiSend } from 'react-icons/fi';
import {useContext, useEffect, useState} from "react";
import Button from "../Button";
import RatingSelect from "../listitems/RatingSelect";
import CommentContext from "../../context/CommentContext";

function CommentForm() {
    const {createComment, toUpdate, updateComment} = useContext(CommentContext);

    useEffect(() => {
        if (toUpdate.edit === true) {
            console.log('item updating', toUpdate.item);
            setBtnDisabled(false);
            setText(toUpdate.item.comment);
            setRating(toUpdate.item.rating);
            setMsg('updating comment ' + toUpdate.item.id);
        }
    }, [toUpdate])

    const [text, setText] = useState('');
    const [rating, setRating] = useState(10);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [msg, setMsg] = useState('');

    const handleTextChange = (e) => {
        if (text === '') {
            setBtnDisabled(true);
            setMsg(null);
        } else if(text !== '' && text.trim().length <= 10) {
            setMsg('je reactie moet minimaal 10 karakters bevatten')
            setBtnDisabled(true)
        } else {
            setMsg(null)
            setBtnDisabled(false)
        }
        // console.log(e.target.value);
        setText(e.target.value);
    }

    // console.log(rating);

    const handleSumbit = (e) => {
        e.preventDefault();
        let newComment;
        if (text.trim().length > 10) {
            newComment = {
                comment: text,
                author: 'vivalanouk',
                rating: rating,
            }
        }
        if (toUpdate.edit === true){
            console.log('sumbit update', newComment);
            updateComment(toUpdate.item.id, newComment)
        } else {
            console.log('sumbit create', newComment);
            createComment(newComment);
        }


    }

    let max = 10;
    return <Card>
        <form onSubmit={handleSumbit}>
            <RatingSelect
                select = {(rating) => setRating(rating)}
                max = {max}
            />
            <textarea
                id='comment'
                rows={4} cols={50}
                placeholder={'schrijf een reactie'}
                maxLength={255}
                value={text}
                onChange={handleTextChange}>
            </textarea>
            { msg && <span className='message'>{msg}</span>}
            <Button
                type='submit'
                version='send'
                isDisabled={btnDisabled}
            ><FiSend/></Button>
        </form>
    </Card>
}

export default CommentForm;