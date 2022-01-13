import {Link} from "react-router-dom";

function CallToAction(props) {
    if (props.link) {
        return <Link to={props.link}>
            {props.action}
        </Link>
    }
    return null
}

function Footer( props ) {
    return <footer className='footer'>
            <CallToAction
                link={props.link}
                action={props.callToAction}/>
        </footer>
}

export default Footer;