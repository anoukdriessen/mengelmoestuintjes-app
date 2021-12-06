import './styles/Button.css';
import {Link} from "react-router-dom";

function Button( props ) {

    switch (props.type) {
        case 'circle-arrow':
            return <button id={props.id} className={props.className}>
                <span className='circle' aria-hidden='true'>
                    <span className='arrow'/>
                </span>
                <Link to={props.linkTo} className='link-text'>
                    {props.text}
                </Link>
            </button>
    }

    return <button className={props.className}>
        empty button
    </button>
}

export default Button;