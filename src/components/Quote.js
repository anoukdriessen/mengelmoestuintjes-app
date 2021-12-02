import './styles/Quote.css';

import { ImQuotesLeft } from "react-icons/im";
import { ImQuotesRight } from "react-icons/im";

function Quote( { quote } ){
    // return empty if quote is not set
    if (!quote) {
        return 'no quote';
    }

    const author = quote[1];
    const text = quote[0];

    // return a blockquote with class .quote-wrapper
    // inside is a div with two quote icons with class .quote
    return (
        <blockquote className='quote-wrapper'>
            <div>
                <ImQuotesLeft className = 'quote'/>
                    { text }
                <ImQuotesRight className = 'quote'/>
            </div>
            <strong className = 'author'>
                { author }
            </strong>
        </blockquote>
    )
}

export default Quote;