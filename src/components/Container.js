import LeftSide from "./LeftSide";
import Header from "./Header";
import MainContent from "./MainContent";
import Footer from "./Footer";

function Container(
    { prev, page, next, today, isLoggedIn, isHomePage, title }
) {

    return <>
        <div id="container">
            <LeftSide
                thisPage = { page }
                thisMonth = { today.getMonth() }
            />
            <Header
                isLoggedIn = { isLoggedIn }
                isHomePage = { isHomePage }
                pageTitle = { title }
            />
            <MainContent
                current = { page }
            />
            <Footer />
        </div>
    </>;
}

export default Container;