import React, {useContext} from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/SignInForm";
import AuthContextProvider from "../context/AuthDataContext";
import PageHeader from "../components/pageitems/PageHeader";
import PageContent from "../components/pageitems/PageContent";
import PageFooter from "../components/pageitems/PageFooter";
import SignUpForm from "../components/SignUpForm";

function SignUp() {
    return <>
        <PageHeader
            title='Log in'
        />

        <PageContent>
            <AuthContextProvider>
                <SignUpForm/>
            </AuthContextProvider>
        </PageContent>

        <PageFooter/>
    </>

}

export default SignUp;