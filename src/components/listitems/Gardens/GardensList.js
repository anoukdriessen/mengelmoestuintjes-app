import {useContext, useEffect, useState} from "react";
import GardensDataContext from "../../../context/GardensDataContext";
import {getMyGate, getUniqueId} from "../../../helpers/functions";
import {
GiFarmer, GiKeyring
} from "react-icons/all";
import {useHistory} from "react-router-dom";

function GardensList() {
    const { allMyGardens } = useContext(GardensDataContext)
    const history = useHistory();

    // const [countGardens, setCountGardens] = useState(0);
    const [myGardens, setMyGardens] = useState([]);

    useEffect(() => {
        setMyGardens(allMyGardens)
    }, [allMyGardens])

    // console.log('all gardens', allGardens);
    // console.log('number of gardens', countGardens);

    const goToGarden = (gardenId) => {
        history.push(`/tuintje/${gardenId}`)
    }

    return <div id='dashboard' className='garden'>
            <span className='gardens-info'>
                <GiFarmer className='mirrored' size={75}/>
                Je bent in het bezit van [ {allMyGardens.length} ] mengelmoestuintjes sleutels
                <GiKeyring size={75}/>
            </span>

            <div className='user-gardens'>
                {   allMyGardens.map((garden) => {
                    // console.log('found ', garden)
                        return<div className={'single-garden'} key={getUniqueId()}
                            onClick={() =>goToGarden(garden.id)}
                        >
                            <h4>Mengelmoestuintje Nr. {garden.id}</h4>
                            <span>[ {garden.size} ] m<sup>2</sup></span>
                            <ul className='owners'>
                                <span>Tuintje van: </span>
                                {
                                    garden.profiles.map((owner) => {
                                        // console.log('found', owner)
                                        let display;
                                        if (owner.name !== '') {
                                            display = owner.name;
                                        } else {
                                            display = owner.username;
                                        }
                                        return <li key={getUniqueId()}>@{display}</li>
                                    })
                                }
                            </ul>

                            { getMyGate(4) }

                            <button className={'btn btn-call-to-action'} type='button'
                                onClick={() =>goToGarden(garden.id)}>
                                Open Tuintje
                            </button>
                        </div>
                    })
                }
            </div>
    </div>
}

export default GardensList;