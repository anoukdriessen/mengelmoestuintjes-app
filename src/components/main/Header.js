import './styles/Header.css';

import {
    getAllPages
} from "../../assets/data";

function PageTitle( props ) {
    const pages = getAllPages();
    const page = props.thisPage;
    const homepage = pages[0];

    let wrapper = 'title-wrapper';
    let id = '';
    let icon = 'title-icon';

    if ( page === homepage ) {
        wrapper += ' home';
        id = 'mmt';
        icon = 'no-icon';
    }

    return <>
        <div className={wrapper}>
            <h1 id={id} className='title'>
                { page.title }
            </h1>
            <span className={icon}>{ page.icon }</span>
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