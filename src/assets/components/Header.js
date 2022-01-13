import {Link} from "react-router-dom";
import {FiLogIn as Login, FiUser as User} from "react-icons/fi";


function UpperLink( props ) {
    if (props.link === '/registreren-login') {
        return <Link className='top-right' to={props.link}>
            <Login/>
        </Link>
    } else {
        return <Link className='top-right' to={props.link}>
            <User/>
        </Link>
    }
}

function Navigation( props ) {
    return <>
        <UpperLink link={props.link}/>
        <h1 className='title'>{props.title}</h1>
    </>
}

function Quote( props ) {
    if (props.quote) {
        return <div id='quote'>
            <span className='text'>{props.quote.text}</span>
            <br/>
            <span>{props.quote.author}</span>
        </div>
    }
    return <div id='quote'>
        <span className='text'>hello world</span>
        <br/>
        <span>every programmer at the start</span>
    </div>
}

function Header( props ) {
    if (props.page === 'home') {
        return <>
            <Navigation
                link = {props.link}
                title = {props.title}
            />
            <Quote quote={props.quote}/>
        </>
    } else {
        return <Navigation
            link = {props.link}
            title = {props.title}
        />
    }
}

export default Header;