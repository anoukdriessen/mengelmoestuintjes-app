import {FiFilePlus, FiImage, FiSave, FiSettings, GiChecklist} from "react-icons/all";
import {useState} from "react";
import {FiX} from "react-icons/fi";

function PageContentNav({ changeUserDetails, toggleChangeUserDetails,
                          changeUserImage, toggleChangeUserImage,
                          showToDo, toggleShowToDo,
                          showPost, toggleShowPost,
                          showForm, toggleShowForm,}) {

    return <div id='page-content-nav'>
        <div> </div>

        <div> {
            !changeUserDetails &&
                !showPost &&
                <span className='nav-link' id='user-to-do'
                  onClick={() => {
                      toggleShowForm((prevState) => !prevState)
                      toggleShowToDo((prevState) => !prevState) }}>
                { showToDo ? <FiX size={20}/> : <FiFilePlus size={20}/> }
                { showToDo ? 'Ga terug' : 'To Do' }
            </span>
        }
            { !showForm && <>
            <span className={changeUserDetails ? 'nav-link active' : 'nav-link'} id='change-user-details'
                  onClick={() => {
                      toggleChangeUserImage(false);
                      toggleChangeUserDetails((prevState) => !prevState); }}>
                { changeUserDetails ? <FiX size={20}/> : <FiSettings size={15}/> }
                { changeUserDetails ? 'Ga terug' : 'Aanpassen' }
            </span>
                { changeUserDetails &&
                <span className={changeUserImage ? 'nav-link active' : 'nav-link'} id='change-user-image'
                      onClick={() => {
                          toggleChangeUserImage((prevState) => !prevState) }}>
                    { changeUserImage ? null : <FiImage size={15}/> }
                    { changeUserImage ? '' : 'Upload Profielfoto' }
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
                { showPost ? 'Ga terug' : 'Bericht' }
                { showPost ? <FiX size={20}/> : <FiFilePlus size={20}/> }
            </span>
            }
        </div>
    </div>
}

export default PageContentNav;