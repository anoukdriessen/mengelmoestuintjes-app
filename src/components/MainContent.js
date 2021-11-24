import './styles/Container.css';
import Quote from './Quote';
import Card from "./Card";

function getQOTD() {
    // quote of the day
    return ['Iedere dag heb je twee keuzes, groeien of herhalen.', '@mengelmoestuintjes'];
}

function Content( { current } ) {
    const pages = ['home', 'about-us'];

    if (current === pages[0]) {
        return <>
            <Quote
                quoteOfTheDay={getQOTD()}
            />
            <div id='missions'>
                <Card
                    isMission = {true}
                    title='Organiseren'
                    description='blablabla'
                />
                <Card
                    isMission = {true}
                    title='delen'
                    description='blablabla'
                />
                <Card
                    isMission = {true}
                    title='leren'
                    description='blablabla'
                />
            </div>
        </>;
    }

    return <>
        <p>page not found</p>
    </>
}

function MainContent( { current } ) {
    console.log(current);
     return <div className='main'>
         <Content
            current = { current }
         />
     </div>;
}

export default MainContent;