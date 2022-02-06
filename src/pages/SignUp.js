import React, {useContext} from "react";
import {AuthDataContext} from "../context/AuthDataContext";
import PageHeader from "../components/pageitems/PageHeader";
import PageContent from "../components/pageitems/PageContent";
import SignUpForm from "../components/forms/types/SignUpForm";
import { useHistory} from "react-router-dom";

function SignUp() {
    const {auth} = useContext(AuthDataContext);
    const history = useHistory();

    if (auth.isAuth) {
        history.push(`/profiel/${auth.user.username}`);
        return null
    } else {
        return <>
            <PageHeader title='Registreren'/>

            <PageContent>
                <SignUpForm/>
            </PageContent>
        </>
    }

}

export default SignUp;