import React from 'react';
import '../components/styles/Home.css';

// components
import Container from "../components/Container";

// data
import {
    getAllPages
} from "../assets/data";

const pages = getAllPages();
const homepage = pages[0];

function Home( props ) {
  return (
      <Container
        page = { homepage }
        date = { props.date }
        isLoggedIn = { props.isLoggedIn }
        isMod = { props.isMod }
        isHomePage = { true }
      />
  );
}

export default Home;