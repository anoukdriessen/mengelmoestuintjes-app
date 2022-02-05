import PageHeader from "../../components/pageitems/PageHeader";
import React, {useContext, useState} from "react";
import PageContent from "../../components/pageitems/PageContent";
import {UserDataContextProvider} from "../../context/UserDataContext";
import PostCards from "../../components/listitems/Posts/PostCards";
import {PostsDataContextProvider} from "../../context/PostsDataContext";
import {AuthDataContext} from "../../context/AuthDataContext";
import {FiPlus, FiX} from "react-icons/fi";
import {BasicPageContentNav} from "../../components/pageitems/PageContentNav";
import FormGarden from "../../components/forms/FormGarden";
import GardensList from "../../components/listitems/Gardens/GardensList";
import PostForm from "../../components/forms/types/PostForm";
import FormPost from "../../components/forms/FormPost";

function Posts() {
    const { auth, hasUserRole } = useContext(AuthDataContext)
    const [createNew, toggleCreateNew] = useState(false);

    // console.log(hasUserRole("ROLE_MODERATOR"))

    return <>
        <PageHeader title='Berichten'/>
        <PageContent>
            <UserDataContextProvider>
                <PostsDataContextProvider>
                    <BasicPageContentNav
                        hasCreate={true}
                        showCreate={createNew}
                        toggleShowCreate={toggleCreateNew}
                    >
                        { hasUserRole("ROLE_MODERATOR") && createNew && <>
                            <span className={'link action'} onClick={
                                () => {
                                    toggleCreateNew(false);
                                }
                            }><FiX/></span>
                        </>}
                    </BasicPageContentNav>

                    {
                        hasUserRole("ROLE_MODERATOR") &&
                            createNew &&
                                <FormPost type={'BLOG'}/>
                    }

                    <>filter berichten per provincie</>
                    <PostCards
                        title='Recente blogberichten'
                        type='blog'
                        num={20}
                    />
                </PostsDataContextProvider>
            </UserDataContextProvider>
        </PageContent>
        </>
}

export default Posts;