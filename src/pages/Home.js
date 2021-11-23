import React from 'react';
import Header from "../components/Header";
import LeftSide from "../components/LeftSide";
import Menu from "../components/Menu";
import { Link, useHistory } from "react-router-dom";
import MainContent from "../components/MainContent";
import Footer from "../components/Footer";

function Home( { thisMonth } ) {
    const history = useHistory();

    // de datum van vandaag
    const today = new Date();

    // de pagina's
    const pages = ['landingpage', 'second']

  return (
      <>
          <Header
              historyToUse={history}
              isLoggedIn={false}
              isHomePage={true}
          />

          <LeftSide
              isHomePage={true}
              thisMonth={today.getMonth()}
          />

          <MainContent
              pages = {pages}
              current = {pages[0]}
          />

          <Footer />
      </>
  );
}

export default Home;