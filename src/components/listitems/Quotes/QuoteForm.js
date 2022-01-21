import { FiSend } from 'react-icons/fi';
import {useContext, useEffect, useState} from "react";
import ListDataContext from "../../../context/ListDataContext";
import Button from "../../Button";
import Card from "../Card";
import {GiArchiveResearch} from "react-icons/all";

function QuoteForm() {
    const {createQuote, toUpdate, updateQuote, toFind, findQuote} = useContext(ListDataContext);

    useEffect(() => {
        if (toUpdate.edit === true) {
            let item = toUpdate.item;
                setBtnDisabled(false);
                setId(item.id);
                setQuote(item.text);
                setAuthor(item.author);
                setMsg('updating item ' + item.id);
        }
        if (toFind.searchedFor === true) {
            let item = toFind.item;
            setBtnDisabled(false);
            setId(item.id);
            setQuote(item.text)
            setAuthor(item.author)
            setMsg('je zocht naar item met id ' + item.id)
        }
    }, [toUpdate, toFind])

    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [id, setId] = useState(null);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [msg, setMsg] = useState('');

    const handleQuoteChange = (e) => {
        if (quote === '') {
            setBtnDisabled(true);
            setMsg(null);
        } else {
            setMsg('quote goedgekeurd, klaar om te plaatsen?')
            setBtnDisabled(false)
        }
        // console.log(e.target.value);
        setQuote(e.target.value);
    }
    const handleAuthorChange = (e) => {
        if (author === '') {
            setBtnDisabled(true);
            setMsg(null);
        } else {
            setMsg('quote goedgekeurd, klaar om te plaatsen?')
            setBtnDisabled(false)
        }
        // console.log(e.target.value);
        setAuthor(e.target.value);
    }
    const handleIdChange = (e) => {
        // console.log(e.target.value)
        findQuote(e.target.value);
        setId(e.target.value);
    }

    const handleSumbit = (e) => {
        e.preventDefault();
        console.log(e.target);
        let newQuote = {
            id: id,
            text: quote,
            author: author,
        }
        console.log('clicked submit', newQuote);
        if (toUpdate.edit === true || toFind.searchedFor === true){
            console.log('sumbit update', newQuote);
            updateQuote(newQuote.id, newQuote)
        } else {
            console.log('sumbit create', newQuote);
            createQuote(newQuote);
        }
    }
    return <Card>
        <form id='quote-form' onSubmit={handleSumbit}>
            <textarea
                id='quote'
                placeholder={'schrijf een quote'}
                maxLength={255}
                value={quote}
                onChange={handleQuoteChange}>
            </textarea>
            <input
                id='quote-author'
                placeholder={'wie is de auteur van de quote?'}
                type='text'
                value={author}
                onChange={handleAuthorChange}
            />
            { msg && <span className='message'>{msg}</span>}
            <div id={'search'}>
                <input
                    id='quote-id'
                    placeholder={'zoek naar quote (nr)'}
                    type='number'
                    value={id}
                    onChange={handleIdChange}
                />
            </div>
            <Button
                type='submit'
                version='send'
                isDisabled={btnDisabled}
            ><FiSend/></Button>
        </form>
    </Card>
}

export default QuoteForm;