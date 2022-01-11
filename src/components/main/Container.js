import './styles/Container.css';

import Header from "./Header";
import MainContent from "./MainContent";
import Footer from "./Footer";

function Container(props) {
    return <div id="container">
        <Header thisPage = { props.page } />

        <MainContent
            thisPage = { props.page }
            isLoggedIn = { props.isLoggedIn }
        />

        <Footer
            isLoggedIn = { props.isLoggedIn }
            isMod = { props.isMod }
        />

    </div>;
}

export default Container;