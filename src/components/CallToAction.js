import './styles/CallToAction.css';
import {Link} from "react-router-dom";

function CallToAction(props) {
    switch (props.type) {
        case 0: // link to page
            return <Link to={ props.linkTo } className='btn call-to-action'>
                <span>{ props.title }</span>
            </Link>
    }

    return <></>
}

export default CallToAction;