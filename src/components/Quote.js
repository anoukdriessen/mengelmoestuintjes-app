import { ImQuotesLeft } from "react-icons/im";
import { ImQuotesRight } from "react-icons/im";

function Quote( { quoteOfTheDay } ){
    if (!quoteOfTheDay) {
        return <p>empty</p>
    }

    return (
        <blockquote id='quote-of-the-day'>
            <div>
                <ImQuotesLeft className = 'quote'/>
                    {quoteOfTheDay[0]}
                <ImQuotesRight className = 'quote'/>
            </div>
            <strong>
                {quoteOfTheDay[1]}
            </strong>

        </blockquote>
    )
}

export default Quote;