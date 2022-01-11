

import {
    getAllPages,
} from "./data";
import Cards from "../components/Cards";
import CallToAction from "../components/CallToAction";
import {useState} from "react";

const pages = getAllPages();
const info = pages[1];

function HowTo( { handleChange } ) {
    // content
    info.content.howTo = {
        first: {
            title: 'Stap 1. Info',
            description: 'Vul jouw email in en kies een passende gebruikersnaam. ' +
                'Verzin zelf een veilig wachtwoord OF laat het door ons genereren' +
                ' bij het aanmaken van je profiel vragen we je naam en geboortedatum in te vullen' +
                ' dit is optioneel en mag je leeg laten. ' +
                'Ook zullen wij je niet vragen onder welk gender jij jezelf vind passen, kom opdagen als jezelf dat vinden we belangrijk genoeg. ' +
                'Wij vragen je alleen noodzakelijke data in te vullen, bij optionele data geven we jou de keuze wat je wel of niet met ons deelt,' +
                ' wij beloven je data veilig te bewaren en niet te delen met derden voor welke doeleinden dan ook.'
            ,
            background: 'paper',
        },
        second: {
            title: 'Stap 2. Profiel',
            description: 'Maak je profiel compleet door een profielfoto, je kunt een van onze foto\'s kiezen als profielfoto ' +
                'maar je kunt er ook zelf een uploaden, dat is wel zo persoonlijk. Op je profiel kun je (indien je dit leuk vind)' +
                'wat meer vertellen over jou als persoon, als je hier een profiel aanmaakt kunnen we ervan uitgaan dat je van tuinieren houdt' +
                'maar wat zijn nou die dingen die jou uniek maken als persoon? Je bepaalt overigens zelf wie jou persoonlijke profiel mag bekijken.',
            background: 'paper',
        },
        third: {
            title: 'Stap 3. Tuin',
            description: 'En dan waar het eigenlijk allemaal op draait: Jouw tuintje! Kies een passende naam voor je tuin, ' +
                'zo kun je ervoor kiezen een \'voortuin\', \'achtertuin\' en \'volkstuin\' te maken maar je kunt ook gewoon alles ' +
                'samen op een plek bewaren. Het is jouw feestje. Per tuin kies je een afmeting, vul de lengte en breedte van je tuin in ' +
                'en wij berekenen de vierkante meter voor je. Het veld dat je ziet wordt opgedeeld in vakken van ieder 1 vierkante meter. ' +
                'Ieder vak kun je beplanten met een plantje uit de database of veranderen in een tegel of grasveld. ' +
                'Voor ieder mengelmoestuintje hebben we geprobeerd zo veel mogelijk opties te geven, mis je nog iets neem dan contact met ons op',
            background: 'paper',
        }
    }

    // card content
    const c = info.content.howTo;
    const howTos = [c.first, c.second, c.third];
    console.log(howTos)

    return <>
        <Cards id='how-to'
               items = { howTos }
               styling = 'steps'
        />
        <p onClick={
            () => {
                console.log('clicked')
                handleChange(2)
            }} className='btn call-to-action'>
            Lees verder
        </p>
    </>
}

function Gardening( { handleChange } ) {
    // card content
    const months = [
        {
            title: 'Januari',
            description: 'In deze maand...',
            todo: [
                '1',
                '2',
                '3',
                '4',
                '5',
                '1',
                '2',
                '3',
                '4',
                '5',
            ]
        },
        {
            title: 'Februari',
            description: 'In deze maand...',
            todo: [
                '1',
                '2',
                '3',
                '4',
                '5',
                '1',
                '2',
                '3',
                '4',
                '5',
                '1',
                '2',
                '3',
                '4',
                '5',
            ]
        },
        {
            title: 'Maart',
            description: 'In deze maand...',
            todo: [
                '1',
                '2',
                '3',
                '4',
                '5',
            ]
        },
        {
            title: 'April',
            description: 'In deze maand...',
            todo: [
                '1',
                '2',
                '3',
                '4',
                '5',
            ]
        },
        {
            title: 'Mei',
            description: 'In deze maand...',
            todo: [
                '1',
                '2',
                '3',
                '4',
                '5',
            ]
        },
        {
            title: 'Juni',
            description: 'In deze maand...',
            todo: [
                '1',
                '2',
                '3',
                '4',
                '5',
            ]
        },
        {
            title: 'Juli',
            description: 'In deze maand...',
            todo: [
                '1',
                '2',
                '3',
                '4',
                '5',
            ]
        },
        {
            title: 'Augustus',
            description: 'In deze maand...',
            todo: [
                '1',
                '2',
                '3',
                '4',
                '5',
            ]
        },
        {
            title: 'September',
            description: 'In deze maand...',
            todo: [
                '1',
                '2',
                '3',
                '4',
                '5',
            ]
        },
        {
            title: 'Oktober',
            description: 'In deze maand...',
            todo: [
                '1',
                '2',
                '3',
                '4',
                '5',
            ]
        },
        {
            title: 'November',
            description: 'In deze maand...',
            todo: [
                '1',
                '2',
                '3',
                '4',
                '5',
            ]
        },
        {
            title: 'December',
            description: 'In deze maand...',
            todo: [
                '1',
                '2',
                '3',
                '4',
                '5',
            ]
        },
    ]
    console.log(months)
    return <>
        <Cards id='gardening'
               items = { months }
               styling = 'months'
        />
        <CallToAction
            type = { 0 }
            title = 'Ik wil lid worden!'
            onClick = { () => console.log('hello')}
        />
        <CallToAction
            type = { 0 }
            title = 'Nog steeds niet overtuigd?'
            onClick = { () => handleChange(+1) }
        />
    </>
}

function Content( { step, handleChange } ) {
    switch (step) {
        case 1:
            // how to's
            return <HowTo
                handleChange = { handleChange }
            />
        case 2:
            // 12 maanden tuinieren
            return <Gardening
                handleChange = { handleChange }
            />
    }
}

export function InfoContent( props ) {
    const [ step, setStep ] = useState(1);

    return <>
        <main>
            <Content
                step = { step }
                handleChange = { setStep }
            />
        </main>
    </>
}