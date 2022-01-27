import {useContext} from "react";
import GardensDataContext from "../../../context/GardensDataContext";

function GardensList() {
    const {allGardens, allMyGardens} = useContext(GardensDataContext)

    const handleClick = () => {
        console.log(allMyGardens)
    }

    return <div>
        <h4>Mijn tuintjes</h4>
        <div>
            <div className='garden-preview' onClick={handleClick}>
                <p>
                    <span>TUINNAAM</span>
                    <span>[ 24m<sup>2</sup> ]</span>
                    <br/>
                    <span>[ 0 ] items op to do</span>
                </p>
            </div>
        </div>
    </div>
}

export default GardensList;