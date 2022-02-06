import {getPlantCategory} from "../../helpers/functions";
import {useHistory} from "react-router-dom";
import {Action} from "../forms/FormItems";

export function PlantCard({type, plant}){
    const history = useHistory();

    return <Card key={plant.name}
                 className={'primary'}
                 icon={getPlantCategory(plant.category, 25)}
                 nr={plant.id}
                 title={plant.name}>
        <div className={'card-body'}>{plant.description}</div>
        <span onClick={() => {
            history.push(`plant/${plant.id}`)
        }}>meer info</span>
    </Card>
}

export function CardHeader({icon, nr, title}) {
    return <div>
        {icon} Nr. [{nr}] <span className={'retro'}>{title}</span>
    </div>
}
function Card({children, useId, className, icon, nr, title, hideCardHeader}) {

    return <div id={useId} className={`card ${className}`}>
        { hideCardHeader ? null : <CardHeader icon={icon} nr={nr} title={title}/> }
        {children}
    </div>
}

// Card.defaultProps = {
//     retro: false
// }

export default Card;