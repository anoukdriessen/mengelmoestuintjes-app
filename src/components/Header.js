import {Link} from "react-router-dom";
import IconNavLink from "./IconNavLink";
import {useContext, useState} from "react";
import {FiLoader} from "react-icons/fi";
import ListDataContext, {ListDataProvider} from "../context/ListDataContext";
import QuotesList from "./listitems/Quotes/QuotesList";


function Navigation( { link, title, userId } ) {
    if (!userId) {
        userId = 'vivalanouk'
    }
    return <>
        <nav>
            <IconNavLink
                link={'/profiel/' + userId}
                size={30}/>
            <IconNavLink
                link='/login'
                size={30}/>
            <IconNavLink
                link='/terms-and-privacy'
                size={30}/>
            <IconNavLink
                link='/'
                size={30}/>
        </nav>
        <h1 className='title'>{title}</h1>
    </>
}



function Header({ title, page, isLoggedIn, user }) {
    // TODO userID
    // console.log('pageitems in header', pageitems)
    // homepage has quote in header
    if (page === 'home') {
        return <ListDataProvider>
            <Navigation
                link = {page}
                title = {title}
            />
        </ListDataProvider>
    }

    return <Navigation
        link = {page}
        title = {title}
    />
}

Header.defaultProps = {
    page: '/',
    title: 'Mengelmoestuintjes',
}

export default Header;