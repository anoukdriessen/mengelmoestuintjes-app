import React, {useContext} from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/forms/SignInForm";
import AuthContextProvider, {AuthDataContext} from "../context/AuthDataContext";
import PageHeader from "../components/pageitems/PageHeader";
import PageContent from "../components/pageitems/PageContent";
import PageFooter from "../components/pageitems/PageFooter";
import SignUpForm from "../components/forms/SignUpForm";

function SignUp() {
    const {auth} = useContext(AuthDataContext);

    console.log('user is logged in =', auth.isAuth);
    return <>
        <PageHeader title='Registreren'/>

        <PageContent>
            <SignUpForm/>
        </PageContent>
    </>

}

export default SignUp;