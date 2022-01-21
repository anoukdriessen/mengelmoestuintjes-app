import React from "react";

function Quote({quote}) {
    return <div id='quote'>
        <span className='text'>{quote ? quote.text : ('hello world')}</span>
        <span>- {quote ? quote.author : ('every programmer at the start')}</span>
    </div>
}

export default Quote;