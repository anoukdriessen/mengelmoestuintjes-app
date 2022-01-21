import {createContext, useContext, useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {AuthDataContext} from "./AuthDataContext";

const ListDataContext = createContext({});

export const ListDataProvider = ({children}) => {
    const {header, auth} = useContext(AuthDataContext)

    const [isLoading, setIsLoading] = useState(true)
    const [quotes, setQuotes] = useState([])
    const [tasks, setTasks] = useState([
        {
            id: 99,
            owner: 'itiskevin',
            type: 'TODO',
            title: 'taak',
            description: 'beschrijving',
            done: false,
            created: new Date().toDateString(),
            deadline: new Date().toDateString(),
        }
    ])
    const [toUpdate, setToUpdate] = useState({
        item: null,
        edit: false,
    });
    const [toFind, setToFind] = useState({
        item: {
            id: 0,
            text: '',
            author: '',
        },
        searchedFor: false,
    });

    useEffect(() => {
        fetchQuotes()
    }, [toUpdate])


    const fetchQuotes = async () => {
            const response = await axios.get(`/api/quotes`, {
                headers: header
            })
            // console.log('fetch all quotes',response.data)
            setQuotes(response.data);
            setIsLoading(false);
    }
    const fetchTasks = async () => {
        const response = await axios.get(`/api/gebruikers/${auth.user.username}/taken/TODO`);
        console.log('fetch all tasks', response.data)
        setTasks(response.data)
        setIsLoading(false)
    }

    const createQuote = async (newQuote) => {
        const headers = {
            "Content-Type": "application/json",
        }
        const response = await axios.post(`/api/quotes`,newQuote, {headers});
        // console.log(response);
        setQuotes([...quotes, response.data]);
    }

    const createTask = async (newTask) => {
        const headers = {
            "Content-Type": "application/json",
        }
        const response = await axios.post(`api/taken?username=${auth.user.username}`,newTask, {headers});
        // console.log(response);
        setTasks([...tasks, response.data]);
    }

    const findQuote = async (id) => {
        const response = await axios.get(`/api/quotes/${id}`,{
            header
        });
        // console.log(response.data);
        setToFind({
            item: {
                id,
                text: response.data.text,
                author: response.data.author
            },
            searchedFor: true,
        })
    }

    const updateQuote = async (id, updated) => {
        setToUpdate( {
            item: {
                id,
                text: updated.text,
                author: updated.author,
            },
            edit: true,
        });

        // console.log('quote to update', toUpdate.item)
        const headers = {
            "Content-Type": "application/json",
        }
        const response = await axios.put(`/api/quotes/${id}`, updated, {headers})
        // console.log(response)
    }

    const deleteQuote = async (id, toDelete) => {
        const message = (
            'Weet je het zeker?\nJe staat op het punt quote\n"' +
            toDelete.text + '"\nvan [' + toDelete.author + ']\nte verwijderen'
        )
        if (window.confirm(message)) {
            await axios.delete(`/api/quotes/${id}`)
            setQuotes(quotes.filter((item) => item.id !== id))
        }
    }

    const deleteTask = async (id, toDelete) => {
        const message = (
            'Weet je het zeker?\nJe staat op het punt een taak te verwijderen'
        )
        if (window.confirm(message)) {
            await axios.delete(`/api/taken/${id}`)
            setTasks(tasks.filter((item) => item.id !== id))
        }
    }


    const contextData = {
        toUpdate,
        toFind,
        quotes,
        findQuote,
        createQuote,
        updateQuote,
        deleteQuote,
        tasks,
        createTask,
        deleteTask,
    }

    return <ListDataContext.Provider
        value={contextData}>
        {children}
    </ListDataContext.Provider>
}

export default ListDataContext;