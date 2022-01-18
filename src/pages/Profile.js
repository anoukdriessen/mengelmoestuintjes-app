import {Redirect, Route, Switch, useHistory, useParams} from "react-router-dom";
import {logDOM} from "@testing-library/react";
import React, {useContext, useEffect, useState} from "react";
import AuthContextProvider, {AuthDataContext} from "../context/AuthDataContext";
import PageHeader from "../components/pageitems/PageHeader";
import PageContent from "../components/pageitems/PageContent";
import SignInForm from "../components/SignInForm";
import PageFooter from "../components/pageitems/PageFooter";

function ProfileContent() {
    const {auth, logout} = useContext(AuthDataContext);
    const [user, setUser] = useState(null);

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        birthday: '',
        province: 'HIDDEN',
    })
    const [changeDetails, setChangeDetails] = useState(false);

    const {name, email, birthday, province} = formData;
    useEffect(() => {
        if (auth.user !== null) {
            setUser({
                username: auth.user.username,
            });
        }
    }, [])

    const onSubmit = () => {
        console.log('clicked submit')
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    return <>
        {user ? <h2>{user.username}</h2> : <h2>Je bent niet ingelogd</h2>}
        <div id='profile-details'>
            <span id='change-profile-details' onClick={() => {
                changeDetails && onSubmit()
                setChangeDetails((prevState) => !prevState)
            }}>
                { changeDetails ? 'Opslaan' : 'Aanpassen'}
            </span>
            <form>
                <input type='text' id='name'
                       className={!changeDetails ? 'profileName' : 'profileNameActive'}
                       disabled={!changeDetails}
                       value={name}
                       onChange={onChange}
                />
                <input type='email' id='email'
                       className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
                       disabled={!changeDetails}
                       value={email}
                       onChange={onChange}
                />
                <input type='date' id='birthday'
                       className={!changeDetails ? 'profileBirthday' : 'profileBirthdayActive'}
                       disabled={!changeDetails}
                       value={birthday}
                       onChange={onChange}
                />
            </form>
        </div>
    </>
}

function Profile() {
    const history = useHistory();
    const status = 200;

    if (status === 404) {
        history.push('/404')
    }


    // const params = useParams()
    return<AuthContextProvider>
            <PageHeader
                title='Profielpagina'
            />

            <PageContent>
                <ProfileContent/>
            </PageContent>

            <PageFooter/>
    </AuthContextProvider>
}

//         <h1>Profiel {params.id}</h1>
export default Profile;