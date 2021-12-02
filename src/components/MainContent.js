import './styles/Container.css';
import './styles/Content.css';

// components
import Quote from './Quote';
import Card from "./Card";

// data
import {getAllPages, getCurrentSeasonImage, getQOTD} from "../assets/data";
import Button from "./Button";
const pages = getAllPages();

function HomeContent( props ) {
    // card content
    const m = props.content.missions;
    const missions = [m.organize, m.share, m.learn]

    // style of card
    const checked = 0;
    const style = 'checked'

    return <>
        <img
            id = "seasonal-cover"
            src = { getCurrentSeasonImage() }
            alt = 'seasonal'
        />
        <main id='home-content'>
            <Quote
                quote = { getQOTD( props.content.hasQuote ) }
            />

            <div id='missions'>
                <Card
                    iconNumber = {0}
                    title = { missions[0].title }
                    description = { missions[0].description }
                />
                <Card
                    iconNumber = {0}
                    title = { missions[1].title }
                    description = { missions[1].description }
                />
                <Card
                    iconNumber = {0}
                    title = { missions[2].title }
                    description = { missions[2].description }
                />
            </div>
            <Button
                classStyle = 'call-to-action shadow'
                type = 'button'
                action = 'is-member'
                checkValue = { props.isLoggedIn }
            />
    </main>
    </>
}
function AboutContent( { pageContent, isLoggedIn } ) {
    const title = '';
    const step1 = pageContent.howto.step1;
    const step2 = pageContent.howto.step2;
    const step3 = pageContent.howto.step3;
    return <main>
        <div id='how-to'>
            <Card
                isStep={true}
                num = {1}
                title = { title }
                description = { step1 }
            />
            <Card
                isStep={true}
                num = {2}
                title = { title }
                description = { step2 }
            />
            <Card
                isStep={true}
                num = {3}
                title = { title }
                description = { step3 }
            />
        </div>
    </main>

}

function Content( props ) {
    if (props.thisPage) {
        const thisPage = props.thisPage;
        let content = thisPage.content

        if (thisPage === pages[0]) {
            return <HomeContent
                content = { content }
            />
        }
        if (thisPage === pages[1]) { return <AboutContent/> }
    }

    return <main>
        <p>empty main container</p>
    </main>;
}

function MainContent( props ) {
     return <div id="main">
         <Content
            thisPage = { props.thisPage }
         />
     </div>;
}

export default MainContent;