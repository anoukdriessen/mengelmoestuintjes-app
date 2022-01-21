import {Redirect, useHistory} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthDataContext} from "../context/AuthDataContext";
import PageHeader from "../components/pageitems/PageHeader";
import PageContent from "../components/pageitems/PageContent";
import PageFooter from "../components/pageitems/PageFooter";
import ProfileForm from "../components/forms/ProfileForm";

function Profile() {
    const { auth } = useContext(AuthDataContext);
    const history = useHistory();

    if (auth.user !== null) {
        return<>
            <PageHeader title={auth.user.username}/>

            <PageContent>
                <ProfileForm thisUser = {auth.user}/>
            </PageContent>
        </>
    } else {
        // auth.isAuth === null
        return <Redirect to='/404'/>
    }

}

export default Profile;