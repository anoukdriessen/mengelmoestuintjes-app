import React, {useContext} from "react";
import {AuthDataContext} from "../../context/AuthDataContext";
import PageHeader from "../../components/pageitems/PageHeader";
import PageContent from "../../components/pageitems/PageContent";
import SignInForm from "../../components/forms/types/SignInForm";
import {Redirect, useHistory} from "react-router-dom";

function SignIn() {
    const {auth} = useContext(AuthDataContext);
    const history = useHistory();

    console.log('user is logged in =', auth.isAuth);

    if (auth.isAuth) {
        history.push(`/profiel/${auth.user.username}`);
        return null
    } else {
        return <>
            <PageHeader title='Log in'/>

            <PageContent>
                <SignInForm/>
            </PageContent>
        </>
    }
}

export default SignIn;