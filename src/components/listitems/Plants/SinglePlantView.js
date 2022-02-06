import {useParams} from "react-router-dom";
import {useContext, useEffect} from "react";
import PlantsDataContext from "../../../context/PlantsDataContext";

function SinglePlantView({type}) {
    const { plant, findPlantById } = useContext(PlantsDataContext);

    const params = useParams();

    useEffect(() => {
        findPlantById(params.id);
    })

    console.log(plant);

    return <>
        plant
        {plant.category}
        {plant.description}
        {/*<PlantCard key={plant.name} type={'preview'} plant={plant}/>*/}
    </>
}

export default SinglePlantView;