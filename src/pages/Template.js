import React from 'react';

// components
import Container from "../components/Container";

function Template(
    { prevPage, current, nextPage, today, isLoggedIn}
) {
    /* iedere pagina bevat een Container
       - LeftSide
            param huidige pagina)
       - Header
            param isLoggedIn / huidige pagina
       - Main content
            param huidige pagina

            home / about : isLoggedIn
       - Footer
            param vorige pagina / huidige pagina / volgende pagina
            today -> huidige datum
    */
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

export default Template;