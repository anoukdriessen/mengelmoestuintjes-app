import React from 'react';

// components
import Container from "../components/main/Container";

function Profile( props ) {

    return (
        <Container
            page = { props.current }
            next = { props.nextPage }
            today = { props.today }
            isLoggedIn = { props.isLoggedIn }
        />
    );
}

export default Profile;