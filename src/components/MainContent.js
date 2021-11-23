import Quote from './Quote';
import Card from "./Card";

// quote of the day
let quote = ['Iedere dag heb je twee keuzes, groeien of herhalen.', '@mengelmoestuintjes'];

function PageContent({pages, current}) {
    const landingPage = pages[0];

    const isLandingPage = landingPage === current;

    if (isLandingPage) {
        // console.log('dit is de landingspagina')
        return <>
            <Quote quoteOfTheDay={quote}/>
            <div id='missions'>
                <Card />
                <Card />
                <Card />
            </div>
        </>
    }
     return <p>empty</p>
}
function MainContent( { pages, number, current } ) {
    return <div className="main">
        <PageContent
            pages = {pages}
            number= {number}
            current ={current}
        />
    </div>;
}

export default MainContent;