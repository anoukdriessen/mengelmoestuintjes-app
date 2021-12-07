// import styling
import './styles/Header.css';

// data
import { getAllPages } from "../assets/data";
const pages = getAllPages();
const homepage = pages[0];

function PageTitle( props ) {
    const page = props.thisPage;

    // homepage has larger title & no icon
    const pageIsHomepage = page === homepage;
    if ( pageIsHomepage ) {
        return <h1
                id='mmt'
                className='title'>
                    { page.title }
        </h1>
    }

    // all the other pages
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

    // check if page exist
    if (page) {
        return (
            <div id="header" className={ page.className }>
                <PageTitle thisPage = { page} />
            </div>
        );
    }

    return <div id="header" className='page-undefined'>
        empty header
    </div>

}

export default Header;