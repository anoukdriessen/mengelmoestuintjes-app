import Header from "./Header";
import MainContent from "./MainContent";
import Footer from "./Footer";

function Container(props) {
    return <div
            id="container"
            className="background"
    >
        <Header
            thisPage = { props.page }
        />
        <MainContent
            thisPage = { props.page }
            isLoggedIn = { props.isLoggedIn }
        />
        <Footer
            year = { props.date.getFullYear() }
            thisPage = { props.page }
        />
    </div>;
}

export default Container;