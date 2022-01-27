import {Redirect, useHistory} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthDataContext} from "../context/AuthDataContext";
import PageHeader from "../components/pageitems/PageHeader";
import PageContent from "../components/pageitems/PageContent";
import PageFooter from "../components/pageitems/PageFooter";
import ProfileForm from "../components/forms/types/ProfileForm";
import UserDataContext, {UserDataContextProvider} from "../context/UserDataContext";
import Card from "../components/listitems/Card";
import {InputFieldWithIcon} from "../components/forms/FormItems";
import {FiChevronsRight, FiImage, FiMapPin, FiSave, FiSettings, GiProgression, GiSave} from "react-icons/all";
import axios from "axios";
import ProfileImageForm from "../components/forms/types/ProfileImageForm";
import {calcProgress, refreshPage} from "../helpers/functions";
import ToDoList from "../components/forms/types/ToDoListForm";
import ToDoListForm from "../components/forms/types/ToDoListForm";
import PostForm from "../components/forms/types/PostForm";
import PageContentNav from "../components/pageitems/PageContentNav";
import ToDoTaskList from "../components/listitems/Tasks/ToDoTaskList";
import Calendar from "../components/Calendar";
import {TasksDataContextProvider} from "../context/TasksDataContext";
import {PostsDataContextProvider} from "../context/PostsDataContext";

export function ProfileCard({image, hasDisplayName, authUser, procentBar, procent}) {
    return <Card useId='user'>
        {
            image
                ? <img id='profile-img' src={`data:image/jpeg;base64,${image}`} alt='user'/>
                : <img id='profile-img' src='https://images.unsplash.com/photo-1587334274328-64186a80aeee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3Byb3V0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60' alt='empty user' />
        }
        <p className='user-card-header'>
                            <span><strong>@</strong>
                                {
                                    hasDisplayName ? authUser.displayName.toUpperCase() : authUser.username
                                }
                            </span>
            <span><strong>[</strong> lvl {authUser.details.level.currentLevel}<strong> ]</strong></span>
        </p>
        <div className='user-card-body'>
                            <span>
                                <FiMapPin size={15}/>
                                <strong>{authUser.details.province ? authUser.details.province : 'ONBEKEND'}</strong>
                            </span>
            <div className='user-progress-bar'>
                                <span className='progress' style={{width: procentBar}}>
                                    {procent}%
                                </span>
            </div>
            <div className='user-progress-details'>
                                    <span className='progress-current'>
                                        <strong>{authUser.details.level.currentXP}</strong> XP</span>
                <GiProgression size={15}/>
                <span className='progress-limit'>
                                        <strong>{authUser.details.level.limit}</strong> XP</span>
            </div>
        </div>
    </Card>
}

function Profile() {
    const {auth} = useContext(AuthDataContext);
    const [user, setUser] = useState(auth.user);
    const [image, setImage] = useState(user.image);
    const [procent, setProcent] = useState(calcProgress(user.details.level.currentXP, user.details.level.limit));
    const [changeUserDetails, toggleChangeUserDetails] = useState(false);
    const [changeUserImage, toggleChangeUserImage] = useState(false);
    const [showToDo, toggleShowToDo] = useState(false);
    const [showNote, toggleShowNote] = useState(false);
    const [showPost, toggleShowPost] = useState(false);
    const [showForm, toggleShowForm] = useState(false);
    let hasDisplayName = user.displayName;
    let procentBar = `${procent}%`
    return<>
            <PageHeader title={auth.user.username}/>

            <PageContent>
                { !changeUserDetails &&
                <ProfileCard
                    image={image}
                    hasDisplayName={hasDisplayName}
                    authUser={auth.user}
                    procentBar={procentBar}
                    procent={procent}
                />
                }
                <PageContentNav
                    changeUserDetails={changeUserDetails}
                    toggleChangeUserDetails={toggleChangeUserDetails}
                    changeUserImage={changeUserImage}
                    toggleChangeUserImage={toggleChangeUserImage}
                    showToDo={showToDo}
                    showPost={showPost}
                    toggleShowToDo={toggleShowToDo}
                    toggleShowPost={toggleShowPost}
                    showForm={showForm}
                    toggleShowForm={toggleShowForm}
                />
                <UserDataContextProvider>
                    {
                        !changeUserDetails && <div id='dashboard'>
                            <div id='sidebar'>
                                <TasksDataContextProvider>
                                {
                                    !showForm && <Calendar days={24}/>
                                }
                                {
                                    !showPost &&
                                            <ToDoListForm
                                                formActive={toggleShowForm}
                                                thisUser={auth.user}
                                                showForm={showToDo}
                                                toggleShowToDo={toggleShowToDo}
                                            />

                                }
                                </TasksDataContextProvider>
                            </div>
                            <div id='main-content'>
                                <PostsDataContextProvider>
                                {
                                    !showToDo && <PostForm
                                        formActive={toggleShowForm}
                                        thisUser = {auth.user}
                                        showForm={showPost}
                                        toggleShowPost={toggleShowPost}
                                    />
                                }
                                </PostsDataContextProvider>

                            </div>
                        </div>
                    }

                    { changeUserDetails &&
                        <ProfileCard
                            image={image}
                            hasDisplayName={hasDisplayName}
                            authUser={auth.user}
                            procentBar={procentBar}
                            procent={procent}
                        />
                    }

                    <ProfileForm
                        thisUser = {auth.user}
                        image={image}
                        changeUserDetails={changeUserDetails}
                        changeUserImage={changeUserImage}
                    />
                </UserDataContextProvider>
            </PageContent>
        </>
}

export default Profile;