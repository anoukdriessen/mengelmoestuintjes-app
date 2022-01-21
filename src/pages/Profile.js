import {Redirect, useHistory} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthDataContext} from "../context/AuthDataContext";
import PageHeader from "../components/pageitems/PageHeader";
import PageContent from "../components/pageitems/PageContent";
import PageFooter from "../components/pageitems/PageFooter";
import ProfileForm from "../components/forms/ProfileForm";
import UserDataContext, {UserDataContextProvider} from "../context/UserDataContext";
import Card from "../components/listitems/Card";
import {InputFieldWithIcon} from "../components/forms/FormItems";
import {FiImage, GiSave} from "react-icons/all";
import axios from "axios";
import ProfileImageForm from "../components/forms/ProfileImageForm";

function Profile() {
    const { auth } = useContext(AuthDataContext);
    const history = useHistory();
    const [image, setImage] = useState(auth.user.image);
    const [selected, setSelected] = useState({});

    if (auth.user !== null) {
        let hasDisplayName = auth.user.displayName;

        return<>
            <PageHeader title={auth.user.username}/>

            <PageContent>
                <UserDataContextProvider>
                    <ProfileForm
                        thisUser = {auth.user}
                        image={image}
                    />

                    <Card>
                        {
                            image
                                ? <img id='profile-img' src={`data:image/jpeg;base64,${image}`} alt='user'/>
                                : <img id='profile-img' src='https://images.unsplash.com/photo-1587334274328-64186a80aeee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3Byb3V0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60' alt='empty user' />
                        }
                        <p className='user-card-header'>
                            <span>@
                                {
                                    hasDisplayName ? auth.user.displayName.toUpperCase() : auth.user.username
                                }
                            </span>
                            <span>[ LEVEL {auth.user.details.level.currentLevel} ]</span>
                        </p>
                        <p className='user-card-body'>
                            {auth.user.email}
                            <br/>
                            {auth.user.details.birthday}
                            <br/>
                            {auth.user.details.memberSince} //
                            {auth.user.details.lastActivity}
                            <br/>
                            {auth.user.details.level.currentXP} >>>
                            {auth.user.details.level.limit}
                            <br/>
                        </p>
                        

                    </Card>
                </UserDataContextProvider>
            </PageContent>
        </>
    } else {
        // auth.isAuth === null
        return <Redirect to='/404'/>
    }

}

export default Profile;