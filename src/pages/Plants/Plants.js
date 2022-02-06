import {AuthDataContext} from "../../context/AuthDataContext";
import {useContext, useEffect, useState} from "react";
import PageHeader from "../../components/pageitems/PageHeader";
import PageContent from "../../components/pageitems/PageContent";
import GardensList from "../../components/listitems/Gardens/GardensList";
import GardensDataContext, {GardensDataContextProvider} from "../../context/GardensDataContext";
import {UserDataContextProvider} from "../../context/UserDataContext";
import {ActionLink, BasicPageContentNav} from "../../components/pageitems/PageContentNav";
import {FiEdit3, FiPlus, FiX} from "react-icons/fi";
import {
    FiArrowDown,
    FiArrowLeft,
    FiXCircle,
    GiApothecary, GiChemicalDrop, GiDroplets,
    GiFlowerPot,
    GiFruitBowl,
    GiGroundSprout,
    GiSave, GiWaterDrop
} from "react-icons/all";
import Form from "../../components/forms/Form";
import {InputXAndYField, SimpleTextField} from "../../components/forms/FormItems";
import FormGarden from "../../components/forms/FormGarden";
import PlantsDataContext, {PlantsDataContextProvider} from "../../context/PlantsDataContext";
import FormPlant from "../../components/forms/FormPlant";
import PlantsList from "../../components/listitems/Plants/PlantsList";
import {useHistory, useParams} from "react-router-dom";
import {ShowAndHideSinglePlant} from "../../components/listitems/ShowAndHide";
import PlantView from "../../components/listitems/Plants/PlantView";
import {getIconLevelAndType, getNameLevel, getNumberLevel, getPlantCategory} from "../../helpers/functions";
import NotFound from "../NotFound";

export function Detail(name, message, requirement, isLvl,  lvl1, lvl2, lvl3) {
    const [showInfo, toggleShowInfo] = useState(false);
    const levels = ['LOW', 'MEDIUM', 'HIGH'];

    return  <div className={`details ${name}`}
                            onMouseOver={() => { toggleShowInfo(true)}}
                            onMouseOut={() => { toggleShowInfo(false)}}
            >
                <span className={` ${requirement === levels[getNumberLevel(requirement)] ? 'enabled': 'disabled'} `}>{ getIconLevelAndType(requirement, name)}
                    { showInfo && <span>[ { getNameLevel(requirement) } ] {name}</span> }
                </span>
    </div>
}

export function Plant() {
    const { plant, findPlantById } = useContext(PlantsDataContext)

    const [showInfoWater, toggleShowInfoWater] = useState(false)

    const params = useParams();
    const history = useHistory();


    useEffect(() => {
        findPlantById(params.id);
    }, []);

    const details = plant.details;
    // console.log(details)
    return<>
        <span className={'link back'} onClick={() => {history.push('/planten')}}>
            <FiArrowLeft size={23}/>
        </span>
        <div id='plant-content'>
            {
                plant
                    ? <>
                        <div className={'header'}>
                            {
                                getPlantCategory(plant.category, 60)
                            }
                            <h2>{plant.name}</h2>
                            {/*{plant.details.official ? -*/}
                            {/*<span> {plant.details.official}</span> : ''}*/}
                        </div>
                        <p className={'description'}>{plant.description}</p>
                        <div className={'details'}>
                            <h4 className={'writing'}>
                                details coming soon
                            </h4>
                        </div>
                        {/*{viewOne && <PlantView type={1}/>}*/}
                    </>
                    : <NotFound />
            }
        </div>
    </>
}

function Plants() {
    const { auth, hasUserRole } = useContext(AuthDataContext);
    const [createNew, toggleCreateNew] = useState(false);

    return <>
        <PageHeader title={'De planten database'}/>
        <PageContent>
            <UserDataContextProvider>
                <PlantsDataContextProvider>
                    {
                        auth.isAuth &&
                        hasUserRole('ROLE_MODERATOR') && <BasicPageContentNav
                            hasCreate={true}
                            showCreate={createNew}
                            toggleShowCreate={toggleCreateNew}
                        >
                            {
                                createNew && <>
                            <span className={'link action'} onClick={
                                () => {
                                    toggleCreateNew(false);
                                }
                            }><FiX/></span>
                                </>}
                        </BasicPageContentNav>
                    }

                    {
                        createNew
                            ? <FormPlant/>
                            : <PlantsList/>
                    }

                </PlantsDataContextProvider>
            </UserDataContextProvider>
        </PageContent>
    </>
}

export default Plants;