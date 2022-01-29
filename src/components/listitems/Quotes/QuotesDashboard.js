import {useContext, useEffect, useState} from "react";
import ListDataContext from "../../../context/ListDataContext";
import Card from "../Card";
import {FiEdit3, FiLoader, FiSend, FiUser, FiX} from "react-icons/fi";
import Button from "../../Button";
import ListStats from "../ListStats";
import QuoteForm from "../../forms/types/QuoteForm";
import QuoteItem from "./QuoteItem";
import QuoteDataContext from "../../../context/QuoteDataContext";
import ItemNotFound from "../ItemNotFound";
import {InputFieldWithIcon} from "../../forms/FormItems";
import {BsFillChatQuoteFill, GiSave} from "react-icons/all";
import {toast} from "react-toastify";

function QuotesDashboard() {
    const { quotes, createQuote, updateQuote, isLoading } = useContext(QuoteDataContext)
    const [update, isUpdate] = useState(false);
    const [thisQuote, setThisQuote] = useState({
        text: '',
        author: '',
    })
    const { text, author } = thisQuote
    if (!quotes || isLoading) {
        return <ItemNotFound title={'Quote'}/>
    }

    let theseQuotes = [];
    if(quotes) {
        theseQuotes = [...quotes]
    }
    theseQuotes.reverse();
    // console.log(theseQuotes)

    const clearThisQuote = () => {
        setThisQuote({
            text: '',
            author: '',
        })
    }

    const handleChange = (e) => {
        setThisQuote({
            ...thisQuote,
            [e.target.id]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (update) {
            // update quote
            console.log('update quote', thisQuote);
            await updateQuote(thisQuote.id, thisQuote);
            isUpdate(false);
        } else {
            // new quote
            console.log('add new quote', thisQuote);
            await createQuote(thisQuote);
            clearThisQuote();
        }
    }
    const changeThisQuote = (quote) => {
        console.log('trying to change', quote);
        isUpdate(true);
        toast.info(`Verander quote nr ${quote.id}`)
        setThisQuote({
            id: quote.id,
            author: quote.author,
            text: quote.text,
        })
    }
    return <>
        <form id='quotes' onSubmit={handleSubmit}>
            { !thisQuote ? <span>Nr. {thisQuote.id}</span> : null }
            <InputFieldWithIcon icon={<BsFillChatQuoteFill size={20}/>}>
                <textarea
                    id='text'
                    value={text}
                    placeholder={'Rozen zijn rood... Viooltjes zijn blauw... Welke quote is van jouw?'}
                    onChange={handleChange}
                    autoComplete='off'
                    required={true}
                    maxLength={255}
                />
            </InputFieldWithIcon>
            <InputFieldWithIcon icon={<FiUser size={20}/>}>
                <input
                    id='author'
                    value={author}
                    placeholder={'Auteur'}
                    onChange={handleChange}
                    autoComplete='off'
                    required={true}
                    maxLength={100}
                />
            </InputFieldWithIcon>
            <button className='link' type='submit' >{isUpdate ? <GiSave className='submit-edit'/> : <FiSend className='submit-save'/>}</button>
        {
            theseQuotes.map((quote) => {
                return <p className='quote' onClick={() => changeThisQuote(quote)}>
                    {quote.id}]
                    {quote.author} ~
                    {quote.text}
                </p>
            })
        }
        </form>
    </>
}

export default QuotesDashboard;