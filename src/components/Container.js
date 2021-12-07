// import styling
import './styles/Container.css';

// components
import Header from "./Header";
import MainContent from "./MainContent";
import Footer from "./Footer";

function addClassNames(className) {


    const main = document.getElementById('main');
    console.log(main);
    main.classList.add(className);

    const footer = document.getElementById('footer');
    console.log(footer);
    footer.classList.add(className);

    return '';
}

function Container(props) {
    return <div id="container">
        <Header thisPage = { props.page } />

        <MainContent
            thisPage = { props.page }
            isLoggedIn = { props.isLoggedIn }
        />

        <Footer
            page = { props.page }
            year = { props.date.getFullYear() }
            isLoggedIn = { props.isLoggedIn }
            isMod = { props.isMod }
        />

    </div>;
}

export default Container;