import {
    FiDelete,
    FiFilePlus,
    FiImage, FiMonitor, FiPenTool,
    FiSave,
    FiSettings,
    GiChatBubble,
    GiChecklist,
    GiCheckMark,
    GiSeedling
} from "react-icons/all";
import {useContext, useState} from "react";
import {FiPlus, FiX} from "react-icons/fi";
import {useHistory} from "react-router-dom";
import {AuthDataContext} from "../../context/AuthDataContext";

export function ActionLink({show, toggle, title}) {
    return <span onClick={() => toggle((prevState) => !prevState) }
                 className={`link action ${show ? 'active' : ''}`}>
                {title}
    </span>
}
export function BasicPageContentNav(
    {title, hasCreate, showCreate, toggleShowCreate, children}
) {
    return <div id='page-content-nav' className={title}>
        <h4>{title}</h4>
        <div className='actions'>
            { hasCreate && <ActionLink
                                show={showCreate}
                                toggle={toggleShowCreate}
                                title={<FiPlus/>}/> }
            { children }
        </div>
    </div>
}

function PageContentNav({ changeUserDetails, toggleChangeUserDetails,
                          changeUserImage, toggleChangeUserImage,
                          showToDo, toggleShowToDo,
                          showPost, toggleShowPost,
                          showForm, toggleShowForm,}) {
    const { hasUserRole } = useContext(AuthDataContext)
    const history = useHistory();

    return <div id='page-content-nav'>
        <div> {
            !changeUserDetails &&
                !showPost &&
                <span className='nav-link' id='user-to-do'
                  onClick={() => {
                      toggleShowForm((prevState) => !prevState)
                      toggleShowToDo((prevState) => !prevState) }}>
                { showToDo ? <FiX size={20}/> : <GiCheckMark size={20}/> }
                    <span className='link-desc'>
                        { showToDo ? 'Ga terug' : 'To Do' }</span>
            </span>
        }
            {   !showForm &&
                    !changeUserDetails &&
            <span className='nav-link go-to'
                  onClick={() => {
                      history.push('/tuintjes')
                  }}>
                <GiSeedling size={30}/>
                <span className='link-desc'>
                    Mijn tuintjes</span>
            </span>
            }
            {
                hasUserRole('ROLE_MODERATOR') && <span className='nav-link go-to' onClick={() => { history.push('/dashboard')}}>
                <FiMonitor size={30}/>
                <span className='link-desc'>Dashboard</span>
            </span>
            }
            { !showForm && <>
            <span className={changeUserDetails ? 'nav-link active' : 'nav-link'} id='change-user-details'
                  onClick={() => {
                      toggleChangeUserImage(false);
                      toggleChangeUserDetails((prevState) => !prevState); }}>
                <span className='link-desc'>
                    { changeUserDetails ? 'Ga terug' : 'Instellingen' }</span>
                { changeUserDetails ? <FiX size={20}/> : <FiSettings size={15}/> }
            </span>
                { changeUserDetails &&
                <span className={changeUserImage ? 'nav-link active' : 'nav-link'} id='change-user-image'
                      onClick={() => {
                          toggleChangeUserImage((prevState) => !prevState) }}>
                    { changeUserImage ? null : <FiImage size={15}/> }
                    <span className='link-desc'>
                    { changeUserImage ? '' : 'Upload Profielfoto' }</span>
                </span>
                }
            </> }
        {
            !changeUserDetails &&
                !showToDo &&
                <span className='nav-link' id='user-post'
                  onClick={() => {
                      toggleShowForm((prevState) => !prevState)
                      toggleShowPost((prevState) => !prevState)
                  }}>
                <span className='link-desc'>
                    { showPost ? 'Ga terug' : 'Bericht' }</span>
                { showPost ? <FiX size={20}/> : <GiChatBubble className='mirrored' size={20}/> }
            </span>
            }
        </div>
    </div>
}

export default PageContentNav;