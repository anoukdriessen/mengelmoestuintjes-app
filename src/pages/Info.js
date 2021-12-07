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


export default Info;