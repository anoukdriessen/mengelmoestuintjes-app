import React from 'react';

// components
import Container from "../components/Container";
import Card from "../components/Card";


// data
import {
    getAllPages
} from "../assets/data";
const pages = getAllPages();
const info = pages[1];

function Info(props) {
    return (
        <div className='background round-right'>
            <Container
                page = { info }
                date = { props.date }
                isLoggedIn = { props.isLoggedIn }
                isMod = { props.isMod }
            />
        </div>
    );
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
export default Info;