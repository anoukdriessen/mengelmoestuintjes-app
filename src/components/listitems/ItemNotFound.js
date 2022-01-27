import {FiFrown} from "react-icons/all";

function ItemNotFound({title}) {
    return <div>
        <p className='not-found'><FiFrown/><br/>Geen {title} gevonden</p>
    </div>
}

export default ItemNotFound;