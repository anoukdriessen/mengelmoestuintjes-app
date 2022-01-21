import {Link} from "react-router-dom";
import {GiMushroomHouse} from "react-icons/gi";

function NotFound() {
    return <>
        <h1>404</h1>
        <Link to='/'>
            <GiMushroomHouse/>Ga terug naar Home
        </Link>
    </>
}

export default NotFound;