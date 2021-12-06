// import styling
import './styles/Container.css';

// components
import Header from "./Header";
import MainContent from "./MainContent";
import Footer from "./Footer";

function Container(props) {
    return <div id="container">
        <Header
            thisPage = { props.page }
            isLoggedIn = { props.isLoggedIn }
        />

        <MainContent
            thisPage = { props.page }
            isLoggedIn = { props.isLoggedIn }
        />

        <Footer
            year = { props.date.getFullYear() }
            isHomePage = { props.isHomePage }
            isLoggedIn = { props.isLoggedIn }
            isMod = { props.isMod }
        />
    </div>;
}

export default Container;