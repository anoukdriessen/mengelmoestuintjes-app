import './styles/Card.css'

// icons
import { MdCheckCircle as Check } from 'react-icons/md';
import { RiNumber1 as One, RiNumber2 as Two, RiNumber3 as Three, RiNumber4 as Four } from "react-icons/ri";

function getIcon( { icon } ) {
    switch (icon) {
        case 0: // icon is check
            return <Check
                className = 'check'
            />
        case 1: // icon is number one
            return <One
                className = 'step-number'
            />
        case 2: // icon is number two
            return <Two
                className = 'step-number'
            />
        case 3: // icon is number three
            return <Three
                className = 'step-number'
            />
        case 4: // icon is number Fout
            return <Four
                className = 'step-number'
            />
        default: return '';
    }
}

function Card( props ) {
    let stylingCard = 'card';
    let stylingHeader = 'card-header';

    // check if Card needs to be a step in a sequence
    if (props.isStep) {
        stylingCard += ' speech-bubble';
        stylingHeader += ' number';
    }

    // all other cards have a card-header, icon
    let icon = props.iconNumber;
    return <section
        className = { stylingCard }>
        <div className = { stylingHeader }>
            {getIcon( { icon  } )}
            <h3>{ props.title }</h3>
        </div>
        <p>{ props.description }</p>
    </section>
}

export default Card;