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
import {FiChevronsRight, FiImage, FiMapPin, GiProgression, GiSave} from "react-icons/all";
import axios from "axios";
import ProfileImageForm from "../components/forms/ProfileImageForm";
import {calcProgress} from "../helpers/functions";
import ToDoList from "../components/ToDoList";

function Profile() {
    const { auth } = useContext(AuthDataContext);
    const history = useHistory();
    const [image, setImage] = useState(auth.user.image);
    const [procent, setProcent] = useState(calcProgress(auth.user.details.level.currentXP, auth.user.details.level.limit));
    if (auth.user !== null) {
        let hasDisplayName = auth.user.displayName;
        let procentBar = `${procent}%`
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
                            <span><strong>@</strong>
                                {
                                    hasDisplayName ? auth.user.displayName.toUpperCase() : auth.user.username
                                }
                            </span>
                            <span><strong>[</strong> lvl <strong>{auth.user.details.level.currentLevel} ]</strong></span>
                        </p>
                        <div className='user-card-body'>
                            <span>
                                <FiMapPin size={15}/>
                                {auth.user.details.province ? auth.user.details.province : 'ONBEKEND'}
                            </span>
                            <div className='user-progress-bar'>
                                <span className='progress' style={{width: procentBar}}>
                                    {procent}%
                                </span>
                            </div>
                            <div className='user-progress-details'>
                                <span className='progress-current'>{auth.user.details.level.currentXP} XP</span>
                                <GiProgression size={15}/>
                                <span className='progress-limit'>{auth.user.details.level.limit} XP</span>
                            </div>
                        </div>
                    </Card>

                    <ToDoList/>
                </UserDataContextProvider>
            </PageContent>
        </>
    } else {
        // auth.isAuth === null
        return <Redirect to='/404'/>
    }

}

export default Profile;