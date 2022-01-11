import React from 'react';

// components
import Container from "../components/main/Container";

function RegisterLogin(
    { prevPage, current, nextPage, today, isLoggedIn}
) {

    return (
        <Container
            prev = { prevPage }
            page = { current }
            next = { nextPage }
            today = { today }
            isLoggedIn = { isLoggedIn }
        />
    );
}

export default RegisterLogin;