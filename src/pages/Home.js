import React from 'react';

// components
import Container from "../components/Container";

function Home(
    { current, nextPage, today, isLoggedIn}
) {

  return (
      <Container
        page = { current }
        next = { nextPage }
        today = { today }
        isLoggedIn = { isLoggedIn }
        isHomePage = { true }
      />
  );
}

export default Home;