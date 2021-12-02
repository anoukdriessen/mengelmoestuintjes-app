import React from 'react';

// components
import Container from "../components/Container";

function Profile(
    { current, nextPage, today, isLoggedIn}
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

export default Profile;