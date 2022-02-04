import {AuthDataContext} from "../../context/AuthDataContext";
import {useContext, useEffect, useState} from "react";
import PageHeader from "../../components/pageitems/PageHeader";
import PageContent from "../../components/pageitems/PageContent";
import GardensList from "../../components/listitems/Gardens/GardensList";
import GardensDataContext, {GardensDataContextProvider} from "../../context/GardensDataContext";
import {UserDataContextProvider} from "../../context/UserDataContext";
import {ActionLink, BasicPageContentNav} from "../../components/pageitems/PageContentNav";
import {FiEdit3, FiPlus, FiX} from "react-icons/fi";
import {FiArrowDown, FiArrowLeft, FiXCircle, GiSave} from "react-icons/all";
import Form from "../../components/forms/Form";
import {InputXAndYField, SimpleTextField} from "../../components/forms/FormItems";
import FormGarden from "../../components/forms/FormGarden";
import PlantsDataContext, {PlantsDataContextProvider} from "../../context/PlantsDataContext";
import FormPlant from "../../components/forms/FormPlant";
import PlantsList from "../../components/listitems/Plants/PlantsList";
import {useHistory, useParams} from "react-router-dom";
import {ShowAndHideSinglePlant} from "../../components/listitems/ShowAndHide";
import PlantView from "../../components/listitems/Plants/PlantView";

export function Plant() {
    const { plant, fetchPlantById } = useContext(PlantsDataContext)

    const [thisPlant, setThisPlant] = useState({
        item: {
            name: plant.name,
            description: plant.description,
        }
    })

    const params = useParams();


    useEffect(() => {
        fetchPlantById(params.id);
    }, []);

    console.log(plant, thisPlant);

    return<>
        <div id='plant-content'>
            hallo
            {/*{viewOne && <PlantView type={1}/>}*/}
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