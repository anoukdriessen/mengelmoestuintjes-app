import {useContext, useState} from "react";
import {FiSend, FiUser, FiX} from "react-icons/fi";
import QuoteDataContext from "../../../context/QuoteDataContext";
import ItemNotFound from "../ItemNotFound";
import {InputFieldWithIcon} from "../../forms/FormItems";
import {BsFillChatQuoteFill, GiSave} from "react-icons/all";
import Form from "../../forms/Form";

function QuotesDashboard() {
    const { quotes, toUpdate, createQuote, updateQuote, deleteQuote, isLoading } = useContext(QuoteDataContext)
    const [update, isUpdate] = useState(false);
    const [thisQuote, setThisQuote] = useState({
        text: '',
        author: '',
    })
    const { text, author } = thisQuote
    const [message, setMessage] = useState('');

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
        if (toUpdate.edit) {
            // update quote
            console.log('update quote', thisQuote);
            toUpdate.edit = false;
            toUpdate.item=thisQuote;
            await updateQuote(thisQuote.id, thisQuote);
            isUpdate(false);
            clearThisQuote();
            setMessage('quote is aangepast')
        } else {
            // new quote
            console.log('add new quote', thisQuote);
            await createQuote(thisQuote);
            clearThisQuote();
            setMessage('quote is geplaatst')
        }
    }
    const handleDelete = async () => {
        console.log('deleting quote', thisQuote);
        try {
            await deleteQuote(thisQuote.id, thisQuote);
            clearThisQuote();
            setMessage('quote is verwijderd')
        } catch (e) {
            console.error(e);
            console.log(e.response);
        }
    }
    const changeThisQuote = (quote) => {
        toUpdate.edit = true;
        setThisQuote({
            id: quote.id,
            text: quote.text,
            author: quote.author,
        })
        console.log('trying to change', quote);
        setMessage('');
    }
    return <>
        <Form type={'primary'} id='quotes'>
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
            <button type={'button'} className='link' onClick={(e) => {
                isUpdate(true)
                handleSubmit(e)
            }} >
                {isUpdate ? <GiSave className='submit-edit'/> : <FiSend className='submit-save'/>}</button>
            {
                toUpdate.edit && <button className='link' type='button' onClick={() => handleDelete()}><FiX/></button>
            }
        {
            theseQuotes.map((quote) => {
                return <p className='quote' onClick={() => changeThisQuote(quote)}>
                    {quote.id}]
                    {quote.author} ~
                    {quote.text}
                </p>
            })
        }
        </Form>
    </>
}

export default QuotesDashboard;