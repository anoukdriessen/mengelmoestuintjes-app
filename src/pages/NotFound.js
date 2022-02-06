import {Link} from "react-router-dom";
import {GiMushroomHouse} from "react-icons/gi";
import PageHeader from "../components/pageitems/PageHeader";
import React, {useContext} from "react";
import PageContent from "../components/pageitems/PageContent";
import {AuthDataContext} from "../context/AuthDataContext";

function NotFound() {
    const { auth } = useContext(AuthDataContext);

    return <>
        <PageHeader title={auth.user.username}/>
        <PageContent>
            <h1>404</h1>
            <Link to='/'>
                <GiMushroomHouse/>Ga terug naar Home
            </Link>
        </PageContent>
    </>
}

export default NotFound;