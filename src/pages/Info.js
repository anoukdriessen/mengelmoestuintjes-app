import React from 'react';
import Container from "../components/Container";

function Info(
    { prevPage, current, nextPage, today, isLoggedIn}
) {

    return (
        <div className='background round-right'>
            <Container
                prev = { prevPage }
                page = { current }
                next = { nextPage }
                today = { today }
                isLoggedIn = { isLoggedIn }
            />
        </div>
    );
}

export default Info;