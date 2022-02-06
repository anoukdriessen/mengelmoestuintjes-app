import PageHeader from "../../components/pageitems/PageHeader";
import React, {useContext, useState} from "react";
import PageContent from "../../components/pageitems/PageContent";
import {UserDataContextProvider} from "../../context/UserDataContext";
import PostCards from "../../components/listitems/Posts/PostCards";
import {PostsDataContextProvider} from "../../context/PostsDataContext";
import {AuthDataContext} from "../../context/AuthDataContext";
import {FiX} from "react-icons/fi";
import {BasicPageContentNav} from "../../components/pageitems/PageContentNav";
import FormPost from "../../components/forms/FormPost";

function Posts() {
    const { hasUserRole } = useContext(AuthDataContext)
    const [createNew, toggleCreateNew] = useState(false);

    // console.log(hasUserRole("ROLE_MODERATOR"))
    let create = false;
    let show = null;
    let toggle = null;
    if (hasUserRole("ROLE_MODERATOR")) {
        create = true;
        show = createNew;
        toggle = toggleCreateNew;
    }

    return <>
        <PageHeader title='Berichten'/>
        <PageContent>
            <UserDataContextProvider>
                <PostsDataContextProvider>
                    <BasicPageContentNav
                        hasCreate={create}
                        showCreate={show}
                        toggleShowCreate={toggle}
                    >
                        { hasUserRole("ROLE_MODERATOR") &&
                        createNew && <>
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

                    <PostCards
                        title='Recente blogberichten'
                        type='blog'
                        num={30}
                    />
                </PostsDataContextProvider>
            </UserDataContextProvider>
        </PageContent>
        </>
}

export default Posts;