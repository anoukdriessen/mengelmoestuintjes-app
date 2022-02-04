import SinglePlantView from "./SinglePlantView";

function PlantView({type}) {

    return <div id='my-plant'>
        mijn plantjes
        {
            type === 1 && <>
                <SinglePlantView/>
            </>
        }
    </div>
}

export default PlantView;