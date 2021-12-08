import './styles/Header.css';
import { getAllPages } from "../assets/data";

function PageTitle( props ) {
    const pages = getAllPages();
    const page = props.thisPage;
    const homepage = pages[0];

    if ( page === homepage ) {
        // homepage has larger title & no icon / no wrapper
        return <h1
                id='mmt'
                className='title'>
                    { page.title }
        </h1>
    }

    return <>
        <div className='title-wrapper'>
            <h1 className='title'>
                { page.title }
            </h1>
            <span className='title-icon'>{ page.icon }</span>
        </div>
        { page.subtitle && <h3 className='sub-title'> { page.subtitle } </h3> }
    </>
}

function Header(props) {
    const page = props.thisPage;

    if (page) {
        return (
            <div id="header" className={ page.className }>
                <PageTitle thisPage = { page} />
            </div>
        );
    }

    // page does not exist / is undefined
    return <div id="header" className='page-undefined'>
        <p className='error'> empty header </p>
    </div>

}

export default Header;