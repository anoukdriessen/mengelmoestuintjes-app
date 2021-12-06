import React from 'react';

// components
import Container from "../components/Container";

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
        first: 'Stap 1...',
        second: 'Stap 2...',
        third: 'Stap 3...'
    }

    return <>
        <main>

        </main>
    </>
}
export default Info;