import React from 'react';

// components
import Container from "../components/Container";

// data
import {
    getAllPages,
    getCurrentSeasonImage,
    getQOTD
} from "../assets/data";
import Quote from "../components/Quote";
import Card from "../components/Card";
import Button from "../components/Button";

const pages = getAllPages();
const homepage = pages[0];

function Home( props ) {
  return (
      <Container
        page = { homepage }
        date = { props.date }
        isLoggedIn = { props.isLoggedIn }
        isMod = { props.isMod }
        isHomePage = { true }
      />
  );
}

export function HomeContent( props ) {
    // content
    homepage.content.hasQuote = true;
    homepage.content.missions = {
        organize: {
            title: 'organiseren',
            description:
                'Mengelmoestuintjes helpt je het overzicht te houden in je (moes)tuin,' +
                ' jij bepaalt de grootte, jij bepaalt de naam, jij bepaalt wat er geplant is' +
                ' en wij houden je op de hoogte en motiveren je taken en werkzaamheden uit te' +
                ' voeren op basis van de planten die je hebt geplant of het seizoen dat het' +
                ' momenteel is. Je leert het overzicht te houden en prioriteiten te maken voor' +
                ' wat voor jou belangrijk is.'
        },
        share: {
            title: 'delen',
            description:
                'Mengelmoestuintjes geeft je de ruimte te delen wat jij wilt!' +
                ' Deel je tuin, oogst of mijlpaal, stel vragen aan je medetuinierders' +
                ' of laat een notitie achter voor toekomst jij. Samen wordt het leuker!' +
                ' & daar helpen wij je graag mee '
        },
        learn: {
            title: 'leren',
            description:
                'Mengelmoestuintjes begrijpt dat we allemaal (nog) geen expert zijn' +
                ' en we altijd nog wel iets kunnen leren, je kunt leren van onze' +
                ' geselecteerde experts of je kunt leren van elkaar. Voor alle leden bieden' +
                ' wij de mogelijkheid meer te leren over de basisbeginselen van het tuinieren' +
                ' en de moestuin. & samen groeien we verder'
        },
    }

    // card content
    const m = props.content.missions;
    const missions = [m.organize, m.share, m.learn]

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
                id = 'cta-home'
                className = 'call-to-action'
                type = 'circle-arrow'
                linkTo = {pages[1].url}
                text = 'Meer info'
            />

        </main>
    </>
}

export default Home;