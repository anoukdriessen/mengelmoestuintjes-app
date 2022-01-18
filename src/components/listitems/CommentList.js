import { FiLoader } from 'react-icons/fi'
import CommentItem from "./CommentItem";
import ListStats from "./ListStats";
import CommentForm from "./CommentForm";
import {useContext} from "react";
import CommentContext from "../../context/CommentContext";

function CommentList() {
    const {data, updateComment, isLoading } = useContext(CommentContext)

    if (!isLoading && (!data || data.length === 0)) {
        return <div>
            Er zijn nog geen reacties geplaatst #First :-)
        </div>
    }

    let theseComments = [...data];
    theseComments = [...data];

    return isLoading ? <h3><FiLoader/></h3> : (
        <div>
        <div className={'listHeader'}>
            <ListStats
                item = {theseComments}
            />
        </div>
        <CommentForm
            list = {data}
        />
        { theseComments.map((obj) => {
            return <CommentItem
                key = {obj.id}
                item = {obj}
                handleUpdate={updateComment}
            />
        })}
    </div>
)}


export default CommentList;