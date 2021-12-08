import React from "react";

// data
import {
    getAllPages,
    getCurrentSeasonImage,
    getQOTD
} from "./data";

// components
import Quote from "../components/Quote";
import Card from "../components/Card";
import Button from "../components/Button";

// all pages
const pages = getAllPages();
const homepage = pages[0];
const info = pages[1];

function handleShowAndHideCards() {
    console.log('ben er');
}

export function HomeContent( props ) {
    // content
    homepage.content.hasQuote = true;
    homepage.content.missions = {
        organizing: {
            title: 'organiseren',
            description:
                'Mengelmoestuintjes helpt je het overzicht te houden in je (moes)tuin,' +
                ' jij bepaalt de grootte, jij bepaalt de naam, jij bepaalt wat er geplant is' +
                ' en wij houden je op de hoogte en motiveren je taken en werkzaamheden uit te' +
                ' voeren op basis van de planten die je hebt geplant of het seizoen dat het' +
                ' momenteel is. Je leert het overzicht te houden en prioriteiten te maken voor' +
                ' wat voor jou belangrijk is.'
        },
        sharing: {
            title: 'delen',
            description:
                'Mengelmoestuintjes geeft je de ruimte te delen wat jij wilt!' +
                ' Deel je tuin, oogst of mijlpaal, stel vragen aan je medetuinierders' +
                ' of laat een notitie achter voor toekomst jij. Samen wordt het leuker!' +
                ' & daar helpen wij je graag mee '
        },
        learning: {
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
    const missions = [
        props.content.missions.organizing,
        props.content.missions.sharing,
        props.content.missions.learning
    ]

    return <>
        <img
            id = "seasonal-cover"
            src = { getCurrentSeasonImage() }
            alt = 'seasonal'
        />

        <main>
            <Quote
                quote = { getQOTD( props.content.hasQuote ) }
                styling = 'ribbon'
            />

            <div id='cards' className='hover-shadow'>
                { missions.map( ( item, key ) => {
                    return <Card
                        key = { key }
                        styling = { 'mission' }
                        title = { item.title }
                        description = { item.description }
                    />
                })}
            </div>

            <Button
                id = 'cta-home'
                className = 'call-to-action'
                // type = 'circle-arrow'
                linkTo = { info.url }
                text = 'Meer info'
            />
        </main>
    </>
}
export function InfoContent( props ) {
    // content
    info.content.howTo = {
        first: {
            title: 'Stap 1...',
            description: 'blablabla'
        },
        second: {
            title: 'Stap 1...',
            description: 'blablabla'
        },
        third: {
            title: 'Stap 1...',
            description: 'blablabla'
        }
    }

    // card content
    const c = info.content.howTo;
    const howTos = [c.first, c.second, c.third];

    return <>
        <main>
            <div id='how-to'>
                <Card
                    isStep ={true}
                    iconNumber = {0}
                    title = { howTos[0].title }
                    description = { howTos[0].description }
                />
                <Card
                    isStep ={true}
                    iconNumber = {0}
                    title = { howTos[1].title }
                    description = { howTos[1].description }
                />
                <Card
                    isStep ={true}
                    iconNumber = {0}
                    title = { howTos[2].title }
                    description = { howTos[2].description }
                />
            </div>
        </main>
    </>
}