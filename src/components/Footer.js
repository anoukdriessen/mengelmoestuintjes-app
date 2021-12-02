import { NavLink } from "react-router-dom";
import './styles/Container.css';
import './styles/Footer.css';

// components
import Button from "./Button";
import BottomNav from "./BottomNav";

function Footer( { year, thisPage } ) {
    return <div id="footer">
        <BottomNav
            page = { thisPage }
        />
        <span id='copyright'> © { year }, design by <a href='https://www.anoukdriessen.nl'>Anouk Driessen</a></span>
    </div>;
}

export default Footer;

/*
*         <BottomNav />
*/