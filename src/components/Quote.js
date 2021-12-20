// styling
import './styles/Quote.css';

// icons
import {
    ImQuotesLeft as QL,
    ImQuotesRight as QR
} from "react-icons/im";
import {useState} from "react";

/*
* no quote -> return error string
* quote is an array of [ author , text ]
* quote is wrapped inside a blockquote with a specified className
* the text of quote is wrapped inside a div and quote icons
* the author is wrapped inside a strong tag
*/
function Quote( props ){
    if (!props.quote) {
        return <p className='error'>'no quote'</p>;
    }

    const author = props.quote.author;
    const text = props.quote.text;

    return (
        <blockquote className={props.styling} key={props.quote.id}>
            <div>
                <QL className = 'quote'/>
                    { text }
                <QR className = 'quote'/>
            </div>
            <strong className = 'author'>
                { author }
            </strong>
        </blockquote>
    )
}

export default Quote;