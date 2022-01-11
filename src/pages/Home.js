import React, {useEffect, useState} from 'react';
import '../components/styles/pages/Info.css';

import Container from "../components/main/Container";

import {
    getAllPages
} from "../assets/data";
import axios from "axios";
import Quote from "../components/Quote";
import Cards from "../components/Cards";
import CallToAction from "../components/CallToAction";

const pages = getAllPages();
const homepage = pages[0];

export function HomeContent( props ) {
    const [qotd, setQuote] = useState();
    const [error, setError] = useState();

    const randomQuote = "http://localhost:8080/quotes/random";

    useEffect(() => {
        axios(randomQuote)
            .then((response) => {
                // console.log(response.data);
                setQuote(response.data);
            })
            .catch((er) => {
                console.error("Error occurred fetching random quote: ", er);
                setError(er);
            });
    }, []);

    if (error) homepage.content.quote = false;
    homepage.content.quote = {qotd};

    homepage.content.missions = {
        organizing: {
            title: 'organiseren',
            description:
                'Mengelmoestuintjes helpt je het overzicht te houden in je (moes)tuin,' +
                ' jij bepaalt de grootte, jij bepaalt de naam, jij bepaalt wat er geplant is' +
                ' en wij houden je op de hoogte en motiveren je taken en werkzaamheden uit te' +
                ' voeren op basis van de planten die je hebt geplant of het seizoen dat het' +
                ' momenteel is. Je leert het overzicht te houden en prioriteiten te maken voor' +
                ' wat voor jou belangrijk is.',
            background: 'organized',
        },
        sharing: {
            title: 'delen',
            description:
                'Mengelmoestuintjes geeft je de ruimte te delen wat jij wilt!' +
                ' Deel je tuin, oogst of mijlpaal, stel vragen aan je medetuinierders' +
                ' of laat een notitie achter voor toekomst jij. Samen wordt het leuker!' +
                ' & daar helpen wij je graag mee ',
            background: 'sharing',
        },
        learning: {
            title: 'leren',
            description:
                'Mengelmoestuintjes begrijpt dat we allemaal (nog) geen expert zijn' +
                ' en we altijd nog wel iets kunnen leren, je kunt leren van onze' +
                ' geselecteerde experts of je kunt leren van elkaar. Voor alle leden bieden' +
                ' wij de mogelijkheid meer te leren over de basisbeginselen van het tuinieren' +
                ' en de moestuin. & samen groeien we verder',
            background: 'learning',
        },
    }

    // card content
    const missions = [
        props.content.missions.organizing,
        props.content.missions.sharing,
        props.content.missions.learning
    ]


    return <>
        <main>
            <Quote
                quote={props.content.quote.qotd}
                styling='quote'
            />

            <Cards
                items={missions}
            />

            <CallToAction
                type={0}
                title={'lees meer over onze missie'}
                linkTo={pages[1].url}
            />
        </main>
    </>
}

function Home( props ) {
  return (
      <Container
        page = { homepage }
        isLoggedIn = { props.isLoggedIn }
        isMod = { props.isMod }
      />
  );
}

export default Home;