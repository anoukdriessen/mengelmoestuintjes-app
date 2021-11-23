import Menu from "./Menu";
import {Link} from "react-router-dom";

function Footer() {
    return <div className="footer">
        <Menu />
        <p>Leer <Link to="/tanden-bleken">hier</Link> meer over het bleken van tanden</p>
    </div>;
}

export default Footer;