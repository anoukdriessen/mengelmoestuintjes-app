import './styles/Container.css'
import { MdCheckCircle } from 'react-icons/md';

function getIcon( { isMission } ) {
    if (isMission) {
        // icon is check
        return <MdCheckCircle />
    }
}

function Card( { isMission, title, description } ) {
    return <section className='card'>
        <div className='card-header'>
            {getIcon( { isMission } )}
            <h3>{title}</h3>
        </div>
        <p>{description}</p>
    </section>
}

export default Card;