import React from 'react';

// components
import Container from "../components/Container";

function Home(props) {
  return (
      <Container
        page = { props.page }
        date = { props.date }
        isLoggedIn = { props.isLoggedIn }
        isHomePage = { true }
      />
  );
}

export default Home;