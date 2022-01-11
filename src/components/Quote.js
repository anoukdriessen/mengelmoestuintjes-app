// styling
import './styles/Quote.css';

// icons
import {
    MdOutlineFormatQuote as Q
} from "react-icons/md";

/*
* no quote -> return error string
* quote is an array of [ author , text ]
* quote is wrapped inside a blockquote with a specified className
* the text of quote is wrapped inside a div and quote icons
* the author is wrapped inside a strong tag
*/
function Quote( props ){
    if (!props.quote) {
        return  <blockquote className='quote'>
            <div>
                <Q className = 'quote-icon mirrored'/>
                <span>Je hebt iedere dag twee keuzes: Groeien of Herhalen</span>
                <Q className = 'quote-icon'/>
            </div>
            <strong className = 'author'>
                mengelmoestuintjes
            </strong>
        </blockquote>;
    }

    const author = props.quote.author;
    const text = props.quote.text;

    return (
        <blockquote className={props.styling} key={props.quote.id}>
            <div>
                <Q className = 'quote-icon mirrored'/>
                    <span>{ text }</span>
                <Q className = 'quote-icon'/>
            </div>
            <strong className = 'author'>
                { author }
            </strong>
        </blockquote>
    )
}

export default Quote;