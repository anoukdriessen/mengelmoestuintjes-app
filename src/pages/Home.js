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