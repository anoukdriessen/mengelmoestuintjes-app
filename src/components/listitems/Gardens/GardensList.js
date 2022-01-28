import {useContext, useEffect, useState} from "react";
import GardensDataContext from "../../../context/GardensDataContext";
import {getKeyByValue, getMyGardenKey, getMyGate, getUniqueId} from "../../../helpers/functions";
import {
    FiCheck,
    GiDoor,
    GiDungeonGate, GiFarmer, GiGate,
    GiHeartKey, GiHeavenGate, GiHobbitDoor,
    GiHouseKeys,
    GiKeyring, GiMedievalGate, GiOpenGate,
    GiRanchGate,
    GiSkeletonKey, GiSpikedFence,
    GiStarKey, GiTreeDoor, GiTreeFace, GiWoodenDoor, GiWoodenFence
} from "react-icons/all";
import {useHistory} from "react-router-dom";

function GardensList() {
    const {allGardens, allMyGardens} = useContext(GardensDataContext)
    const history = useHistory();

    const [countGardens, setCountGardens] = useState(0);
    const [myGardenKeys, setMyGardenKeys] = useState([]);
    const [myGardenKeyHolders, setMyGardenKeyHolders] = useState([])

    useEffect(() => {
        setCountGardens(Object.keys(allMyGardens).length)
        setMyGardenKeys(Object.keys(allMyGardens))
        setMyGardenKeyHolders(Object.values(allMyGardens));
    }, [allMyGardens])

    // console.log('number of gardens', countGardens);
    // console.log('all gardens user has a key for', myGardenKeys);
    // console.log('all garden owners', myGardenKeyHolders);

    const goToGarden = (gardenId) => {
        history.push(`/tuintje/${gardenId}`)
    }

    return <div id='dashboard' className='garden'>
            <span className='gardens-info'>
                <GiFarmer className='mirrored' size={75}/>
                Je bent in het bezit van [ {countGardens} ] mengelmoestuintjes sleutels
                <GiKeyring size={75}/>
            </span>

            <div className='user-gardens'>
                {   myGardenKeys.map((gardenKey) => {
                        return<div className={'single-garden'}>
                            <h4>Mengelmoestuintje Nr. {gardenKey}</h4>

                            <ul className='owners'>
                                <span>Tuintje van: </span>
                                {
                                    myGardenKeyHolders[gardenKey -1].map((owner) => {
                                        return <li>{owner}</li>
                                    })
                                }
                            </ul>

                            { getMyGate(4) }

                            <ul className='tasks'>
                                <li><span className='retro'>[ 0 ]</span> to do items</li>
                                <li><span className='retro'>[ 0 ]</span> taken op de tuin</li>
                                <li><span className='retro'>[ 0 ]</span> bewoners</li>
                            </ul>

                            <button className={'btn btn-call-to-action'} type='button'
                                onClick={() =>goToGarden(gardenKey)}>
                                Open Tuintje
                            </button>
                        </div>
                    })
                }
            </div>
    </div>
}

export default GardensList;