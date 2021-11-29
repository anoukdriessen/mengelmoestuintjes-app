import './styles/Container.css';
import './styles/Header.css';

// components
import Button from  './Button'

// data
import {getAllPages} from "../assets/data";
import {Icon} from "./BottomNav";

function PageTitle( props ) {
    const title = props.thisPage.title;

    // homepage has larger title
    if ( props.thisPage === props.pages[0] ) {
        return <h1
                id='mmt'
                className='title'>
                    { title }
        </h1>
    }

    // all the other pages
    return <div className='title-wrapper'>
        <h1 className='title'>
            { title }
        </h1>
        <Icon
            className = 'title-icon'
            page = { props.thisPage }
        />
    </div>
}

function Header(props) {
    const pages = getAllPages();

    // check if page props exist
    if (props.thisPage) {
        return (
            <div id="header">
                <PageTitle
                    thisPage = { props.thisPage }
                    pages = { pages }
                />

                <Button
                    classStyle = 'user-action'
                    type = 'button'
                    action = 'user-login'
                    checkValue = { props.isLoggedIn }
                />
            </div>
        );
    }

    return <div className='header'>
        empty header
    </div>

}

export default Header;