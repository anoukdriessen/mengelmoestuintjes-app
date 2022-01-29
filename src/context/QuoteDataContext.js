import {createContext, useContext, useEffect, useState} from "react";
import {AuthDataContext} from "./AuthDataContext";
import PostsDataContext from "./PostsDataContext";
import axios from "axios";

export const QuoteDataContext = createContext({});

export const QuoteDataContextProvider = ({ children }) => {
    const { auth } = useContext(AuthDataContext)
    const [isLoading, setIsLoading] = useState(false);
    const [toUpdate, setToUpdate] = useState({
        item: {
            id: 0,
            text: '',
            author: '',
        },
        edit: false,
    });
    const [quotes, setQuotes] = useState([])

    useEffect(() => {
        fetchQuotes()
    }, [toUpdate])

    // CREATE
    const createQuote = async (newQuote) => {
        const response = await axios.post(
            `/api/quotes`,
            newQuote,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
        // console.log(response);
        setQuotes([...quotes, response.data]);
    }

    // READ
    const fetchQuotes = async () => {
        setIsLoading(true);
        const response = await axios.get(`/api/quotes`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        // console.log('fetch all quotes',response.data.content)
        setQuotes(response.data);
        setIsLoading(false);
    }

    // UPDATE
    const updateQuote = async (id, updated) => {
        setToUpdate( {
            id,
            text: updated.text,
            author: updated.author,
        });

        console.log('quote to update', toUpdate.item)
        const response = await axios.put(
            `/api/quotes/${id}`,
            updated,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
        // console.log(response)
    }

    // DELETE

    const contextData = {
        quotes,
        createQuote,
        updateQuote,
    }

    return <QuoteDataContext.Provider
        value={contextData}
    >
        { isLoading
            ? <p>Loading...</p>
            : children
        }
    </QuoteDataContext.Provider>
}

export default QuoteDataContext;