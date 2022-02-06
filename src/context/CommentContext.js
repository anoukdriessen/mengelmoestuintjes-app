import {createContext, useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";

const CommentContext = createContext();

export const CommentProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([
        {
            id: 99,
            rating: 7,
            comment: 'This data is in context',
            author: 'vivalanouk'
        },
        {
            id: 50,
            rating: 3,
            comment: 'This data is also in context',
            author: 'vivalanouk'
        }
    ])
    const [toUpdate, setToUpdate] = useState({
        item: {
            id: 0,
            rating: '',
            comment: '',
            author: '',
        },
        edit: false,
    });

    const createComment = (newComment) => {
        newComment.id = uuidv4();
        newComment.author = 'vivalanouk';
        console.log('create', newComment);
        setData([newComment, ...data]);
        console.log('comment', data);
    }

    const updateComment = (id, updated) => {
        console.log('update', updated)
        setToUpdate(data.map((item) => item.id === id ?
            {...item, ...updated} : item))
    }

    const deleteComment = (id) => {
        if (window.confirm('Weet je het zeker?')) {
            setData(data.filter((item) => item.id !== id))
        }
    }

    const contextData = {
        data,
        isLoading,
        toUpdate,
        createComment,
        updateComment,
        deleteComment,
    }

    return <CommentContext.Provider value={contextData}>
        {children}
    </CommentContext.Provider>
}

export default CommentContext;