import React from 'react';
import Container from "../components/Container";

function PlantDB(
    { prevPage, current, nextPage, today, isLoggedIn}
) {

    return (
        <Container
            page = { current }
            next = { nextPage }
            today = { today }
            isLoggedIn = { isLoggedIn }
        />
    );
}

export default PlantDB;