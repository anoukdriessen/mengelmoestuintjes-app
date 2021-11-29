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
        <MainContent />
        <Footer />
    </div>;
}

export default Container;