import React, {useContext,  useState} from "react";
import {AuthDataContext} from "../context/AuthDataContext";
import PageHeader from "../components/pageitems/PageHeader";
import PageContent from "../components/pageitems/PageContent";
import{UserDataContextProvider} from "../context/UserDataContext";
import Card from "../components/listitems/Card";
import { FiMapPin, GiProgression, } from "react-icons/all";
import {calcProgress, } from "../helpers/functions";
import ToDoListForm from "../components/forms/types/ToDoListForm";
import PostForm from "../components/forms/types/PostForm";
import PageContentNav from "../components/pageitems/PageContentNav";
import Calendar from "../components/Calendar";
import {TasksDataContextProvider} from "../context/TasksDataContext";
import {PostsDataContextProvider} from "../context/PostsDataContext";
import ProfileForm from "../components/forms/types/ProfileForm";

export function SmallProfileCard({image, name, username, currentLevel}) {
    return <Card useId='user' className={'small'}>
        {
            image
                ? <img id='profile-img' src={`data:image/jpeg;base64,${image}`} alt='user'/>
                : <img id='profile-img' src='https://images.unsplash.com/photo-1587334274328-64186a80aeee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3Byb3V0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60' alt='empty user' />
        }
        <p className='user-card-header'>
            <span><strong>@</strong>{ name !== '' ? name.toUpperCase() : username }
            </span>
            <span><strong>[</strong> lvl {currentLevel}<strong> ]</strong></span>
        </p>
    </Card>
}
export function SmallProfileCardWithTasks({image, name, username, tasks}) {
    return <Card useId='user' className={'small'}>
        {
            image
                ? <img id='profile-img' src={`data:image/jpeg;base64,${image}`} alt='user'/>
                : <img id='profile-img' src='https://images.unsplash.com/photo-1587334274328-64186a80aeee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3Byb3V0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60' alt='empty user' />
        }
        <p className='user-card-header'>
            <span><strong>@</strong>{ name !== '' ? name.toUpperCase() : username }
            </span>
            {/*<span><strong>[</strong> lvl {currentLevel}<strong> ]</strong></span>*/}
        </p>
        <div className='user-card-body'>
            {
                tasks.length > 0 &&
                    tasks.map((task) => {
                        return <li>{task}</li>
                    })
            }
        </div>
    </Card>
}

function Profile() {
    const { auth, hasUserRole } = useContext(AuthDataContext);
    const [image, setImage] = useState(null);
    const [procent, setProcent] = useState(calcProgress(auth.user.details.level.currentXP, auth.user.details.level.limit));
    const [changeUserDetails, toggleChangeUserDetails] = useState(false);
    const [changeUserImage, toggleChangeUserImage] = useState(false);
    const [showToDo, toggleShowToDo] = useState(false);
    const [showPost, toggleShowPost] = useState(false);
    const [showForm, toggleShowForm] = useState(false);
    let hasDisplayName = auth.user.displayName;
    let procentBar = `${procent}%`

    return<>
            <PageHeader title={auth.user.username}/>
            <PageContent>
                { !changeUserDetails && <>
                    <Card className={'profile small'} hideCardHeader={true}>
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
                            <span><strong>[</strong> lvl {auth.user.details.level.currentLevel}<strong> ]</strong></span>
                        </p>
                        <div className='user-card-body'>
                            <span>
                                <FiMapPin size={15}/>
                                <strong>{auth.user.details.province ? auth.user.details.province : 'ONBEKEND'}</strong>
                            </span>
                            <div className='user-progress-bar'>
                                <span className='progress' style={{width: procentBar}}>
                                    {isNaN(procent) ? <>0%</>
                                        : `${procent}%`}
                                </span>
                            </div>
                            <div className='user-progress-details'>
                                    <span className='progress-current'>
                                        <strong>{auth.user.details.level.currentXP}</strong> XP</span>
                                <GiProgression size={15}/>
                                <span className='progress-limit'>
                                        <strong>{auth.user.details.level.limit}</strong> XP</span>
                            </div>
                        </div>
                    </Card>
                </>

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