import React, {useContext} from "react";
import {AuthDataContext} from "../context/AuthDataContext";
import PageHeader from "../components/pageitems/PageHeader";
import PageContent from "../components/pageitems/PageContent";
import SignInForm from "../components/forms/SignInForm";

function SignIn() {
    const {auth} = useContext(AuthDataContext);

    console.log('user is logged in =', auth.isAuth);
    return <>
        <PageHeader title='Log in'/>

        <PageContent>
            <SignInForm/>
        </PageContent>
    </>

}

export default SignIn;